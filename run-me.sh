#!/usr/bin/env bash

./elasticsearch-2.3.4/bin/elasticsearch &

#echo "ES pid $!" # last run pid

esUtl='http://localhost:9200/'
senseUrl='http://localhost:5601/app/sense'

unamestr=`uname`
if [[ "$unamestr" == 'Darwin' ]]; then # detect MacOS
    ./kibana-4.5.3-darwin-x64/bin/kibana &
    open $esUtl &
    open $senseUrl
elif [[ "$unamestr" == 'Linux' ]]; then # detect Linux
    ./kibana-4.5.3-linux-x64/bin/kibana &
    xdg-open $esUtl &
    xdg-open $senseUrl
fi

