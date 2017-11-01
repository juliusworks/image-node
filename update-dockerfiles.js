const fs = require('fs')
const https = require('https')
const path = require('path')
const child_process = require('child_process')

class SemVer {
	static parse(version) {
		const pieces = version.split(/\./)

		if(pieces.length !== 3) {
			return null
		}

		const [ major, minor, patch ] = pieces

		return {
			major: Number.parseInt(major),
			minor: Number.parseInt(minor),
			patch: Number.parseInt(patch)
		}
	}

	static stringify({ major, minor, patch }) {
		return `${major}.${minor}.${patch}`
	}

	static gt(lhs, rhs) {
		if(!lhs || lhs.major < rhs.major) {
			return true
		}

		if(lhs.major > rhs.major) {
			return false
		}

		if(rhs.minor < lhs.minor) {
			return false
		}

		if(lhs.minor === rhs.minor && lhs.patch >= rhs.patch) {
			return false
		}

		return true
	}
}

async function run() {
	// Pull tags from mhart/alpine-node
	const result = await new Promise((resolve, reject) => {
		const request = https.get('https://registry.hub.docker.com/v1/repositories/mhart/alpine-node/tags', (response) => {
			if(response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error('Failed to load page, status code: ' + response.statusCode));
			}

			const body = [ ]
			response.on('data', chunk => body.push(chunk))
			response.on('end', () => resolve(body.join('')))
		})

		request.on('error', reject)
	})

	// Compile an object of the latest tag in each major version
	const versions = { }
	const json = JSON.parse(result).map(({ name }) => name).filter(name => !name.includes('base'))

	for(let version of json) {
		version = SemVer.parse(version)

		if(!version) {
			continue
		}

		if(!SemVer.gt(versions[version.major], version)) {
			continue
		}

		versions[version.major] = version
	}

	// Load our current node files
	let commits = 0

	for(const variant of [ 'full', 'light' ]) {
		const dockerfiles = path.join(__dirname, 'dockerfiles', variant)
		const files = fs.readdirSync(dockerfiles).map(file => path.join(dockerfiles, file))

		for(const file of files) {
			let content = fs.readFileSync(file).toString()
			const match = content.match(/node:([0-9.]+)/)

			if(!match) {
				continue
			}

			const version = SemVer.parse(match[1])

			if(!SemVer.gt(version, versions[version.major])) {
				continue
			}

			const newVersion = SemVer.stringify(versions[version.major])
			content = content.replace(/node:([0-9.]+)/, `node:${newVersion}`)
			fs.writeFileSync(file, content)

			child_process.execFileSync('git', [
				'commit',
				'-m', `Updated ${variant}/${path.basename(file)} from ${SemVer.stringify(version)} to ${newVersion}`,
				file
			])

			commits++
		}
	}

	if(commits === 0) {
		return
	}

	child_process.execFileSync('git', [ 'push' ])
}

run().catch(err => {
	console.error('Error updating dockerfiles', err)
	process.exit(1)
}).then(() => console.log('Done'))
