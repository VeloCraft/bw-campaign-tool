#!/bin/bash

if [ $# -eq 0 ]
then
  echo "No keywords supplied for search"
  exit 1
fi

cd $(dirname "$0")/..
# Find all files in the project with the given keyword
# excluding the ./pages/api/help/index.json file

find ./app ./components ./hooks ./helpers ./stories \
 -type f \
 -exec grep --color -H -r "$1" {} \;
cd $(dirname "$0")

exit 0
