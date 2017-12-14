FROM mhart/alpine-node:8.9.1

RUN apk add --no-cache python make gcc g++ bash git nano curl libintl gettext \
	&& cp /usr/bin/envsubst /usr/local/bin/envsubst \
	&& apk del gettext
