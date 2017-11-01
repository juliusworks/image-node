FROM mhart/alpine-node:9.0.0

RUN apk add --no-cache zsh git nano curl && ln -s /bin/zsh /bin/bash
