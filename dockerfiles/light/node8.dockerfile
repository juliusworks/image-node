FROM mhart/alpine-node:8.9.0

RUN apk add --no-cache zsh git nano curl && ln -s /bin/zsh /bin/bash
