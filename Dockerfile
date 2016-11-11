FROM mhart/alpine-node:base-6.9

RUN apk add --no-cache python make gcc g++ bash nano curl \
	&& mkdir -p /opt \
	&& cd /opt \
	&& curl -L -s https://yarnpkg.com/latest.tar.gz > yarn.tgz \
	&& tar -xzf yarn.tgz \
	&& mv dist yarn && rm yarn.tgz \
	&& ln -s /opt/yarn/bin/yarn.js /usr/bin/yarn
