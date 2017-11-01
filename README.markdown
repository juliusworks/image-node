# image-node

Base images used at Julius, all images include the following:

* Node
* npm
* yarn
* curl
* git
* zsh (also aliased as bash)
* nano
* Build Tools + Python for node-gyp

The images are based on [mhart/alpine-node](https://github.com/mhart/alpine-node).

## Supported Versions

The following major node versions are updated regularly:

* Node 6
* Node 8
* Node 9

The `latest` tag will always point towards the latest major release of Node, regardless of LTS status.

## Usage

```bash
$ docker run -ti --rm juliusworks/node:8 node -v
```

You can find a full list of available tags at [hub.docker.com/r/juliusworks/node/tags](https://hub.docker.com/r/juliusworks/node/tags)
