#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
    npm run serve 
else
    npm run dev
fi