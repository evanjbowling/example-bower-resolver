#!/bin/bash
# FILE:    test.sh
# PURPOSE: provide an integration test that can
#          easily be run with the installed package.
#
# USAGE:   copy this file to an empty directory
#          and run with: ./test.sh
#

# check that node/npm is installed
NPM_CHECK=`which npm`
if [ $? != 0 ]; then
    echo "ERROR: npm is not installed" && exit -1
fi
# check that bower is installed
BOWER_CHECK=`which bower`
if [ $? != 0 ]; then
    echo "ERROR: bower is not installed" && exit -1
fi

# check if .bowerrc already exists
if [ -f .bowerrc ]; then
    echo "ERROR: .bowerrc file already exists" && exit -1
fi

touch .bowerrc
echo "{ \"resolvers\": [
  \"example-bower-resolver\"
  ]
}
" > .bowerrc

# run bower install test
bower install example://apples
