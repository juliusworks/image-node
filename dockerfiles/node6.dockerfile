FROM mhart/alpine-node:6.11.5

RUN apk add --no-cache python make gcc g++ zsh git nano curl \
	&& mkdir -p /opt \
	&& cd /opt \
	&& curl -L -s https://yarnpkg.com/latest.tar.gz > yarn.tgz \
	&& tar -xzf yarn.tgz \
	&& mv yarn-v* yarn && rm yarn.tgz \
	&& ln -s /opt/yarn/bin/yarn.js /usr/bin/yarn \
	&& ln -s /bin/zsh /bin/bash
