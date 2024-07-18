#!/bin/sh

set -e
echo "Running migration and seeding data"
yarn migration:up
exec "$@"