FROM mhart/alpine-node:7.10.1

RUN apk add --no-cache python make gcc g++ bash git nano curl \
	&& mkdir -p /opt \
	&& cd /opt \
	&& curl -L -s https://yarnpkg.com/latest.tar.gz > yarn.tgz \
	&& tar -xzf yarn.tgz \
	&& mv yarn-v* yarn && rm yarn.tgz \
	&& ln -s /opt/yarn/bin/yarn.js /usr/bin/yarn
