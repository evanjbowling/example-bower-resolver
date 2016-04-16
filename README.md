# example-bower-resolver
Sample implementation of a bower pluggable resolver.

[![Build Status](https://travis-ci.org/evanjbowling/example-bower-resolver.svg?branch=master)](https://travis-ci.org/evanjbowling/example-bower-resolver) [![Dependencies](https://david-dm.org/evanjbowling/example-bower-resolver.svg)](https://david-dm.org/evanjbowling/example-bower-resolver) [![Dev Dependencies](https://img.shields.io/david/dev/evanjbowling/example-bower-resolver.svg)](https://img.shields.io/david/dev/evanjbowling/example-bower-resolver)


## Features
Bower resolver designed to illustrate best practices. This simple resolver only supports
the following two commands:

  * `bower install example://apple`
  * `bower install ex://apple`

## Purpose
Ok, so the example "apple" component isn't that interesting. This effort is meant
to create a concise implementation of the bower [Pluggable Resolver](http://bower.io/docs/pluggable-resolvers/)
 architecture.

## Installation
There are two steps for bower pluggable resolver installation.

First, install this package globally with:

    npm install -g example-bower-resolver

Second, configure the `.bowerrc` file to use this resolver:

    {
      "resolvers" : [
        "example-bower-resolver"
      ]
    }

## Usage
Exercise the resolver with:

    bower install ex://apple

## Development
Run the mocha tests with:

	npm test

Run the istanbul coverage analysis with:

	npm run coverage

