#!/bin/bash

name=sd-method
port=3003

echo $name $port
forever stop $name
PORT=$port forever start -a --uid "$name" bin/www 
