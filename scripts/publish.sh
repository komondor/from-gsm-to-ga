#!/bin/bash

COMMIT_MESSAGE=$1
TAG_MESSAGE=$2
TAG_VERSION=$3

git add .
git commit -m "${1}"
git tag -a -m "${2}" "v${3}"
git push --follow-tags
