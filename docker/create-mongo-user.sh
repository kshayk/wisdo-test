#!/bin/bash

# Wait for MongoDB to be ready
until mongo --eval "db.adminCommand({ ping: 1 })" &> /dev/null; do
    sleep 1
done

# Create a user with a username and password
mongo admin --eval "db.createUser({ user: 'wisdo', pwd: 'wisdo12345', roles: ['readWrite', 'dbAdmin'] })"
