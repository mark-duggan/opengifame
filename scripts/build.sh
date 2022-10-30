#!/usr/bin/env bash
docker --context default \
    build -t ghcr.io/fergalmoran/opengifame \
    -f ./hosting/Dockerfile \
    --pull \
    .
