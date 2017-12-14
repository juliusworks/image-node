FROM mhart/alpine-node:9.3.0

RUN apk add --no-cache python make gcc g++ bash git nano curl libintl gettext \
	&& cp /usr/bin/envsubst /usr/local/bin/envsubst \
	&& apk del gettext
