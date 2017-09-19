#!/bin/bash

GENXML="genxml M"

if [ "$REQUEST_METHOD" = "POST" ]; then
  read QUERY_STRING
  REQUEST_METHOD=GET
  export REQUEST_METHOD
  export QUERY_STRING
fi

QUERY_STRING=$(echo $QUERY_STRING | sed 's/%7[c,C]/ /g' | sed 's/|/ /g' )

$GENXML $QUERY_STRING

