FROM mhart/alpine-node:8.5.0

RUN apk add --no-cache python make gcc g++ bash git nano curl \
	&& rm -fr /usr/local/share/yarn && mkdir -p /usr/local/share/yarn \
	&& curl -L -s https://yarnpkg.com/latest.tar.gz > yarn.tgz \
	&& tar -xzf yarn.tgz -C /usr/local/share/yarn --strip 1 \
	&& rm yarn.tgz
