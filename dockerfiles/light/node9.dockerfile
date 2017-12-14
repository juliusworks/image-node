FROM mhart/alpine-node:9.1.0

RUN apk add --no-cache bash git nano curl libintl gettext \
	&& cp /usr/bin/envsubst /usr/local/bin/envsubst \
	&& apk del gettext
