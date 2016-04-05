# example-bower-resolver
Sample implementation of a bower pluggable resolver.

[![Dependencies](https://david-dm.org/evanjbowling/example-bower-resolver.svg)](https://david-dm.org/evanjbowling/example-bower-resolver) [![Dev Dependencies](https://img.shields.io/david/dev/evanjbowling/example-bower-resolver.svg)](https://img.shields.io/david/dev/evanjbowling/example-bower-resolver)


## Features
Simple resolver designed to illustrate best practices. This resolver contains
2 simple example files that can be installed using: `bower install example://file`.

## Installation
There are two steps for bower pluggable resolver installation.

First, install this package globally with [npm]():

    npm install -g example-bower-resolver

Second, configure the `.bowerrc` file to use this resolver:
