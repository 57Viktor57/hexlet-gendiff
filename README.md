# gendiff

[![Build Status](https://travis-ci.org/57Viktor57/project-lvl2-s329.svg?branch=master)](https://travis-ci.org/57Viktor57/project-lvl2-s329)
[![Maintainability](https://api.codeclimate.com/v1/badges/213c97e4dbe65dabc2e8/maintainability)](https://codeclimate.com/github/57Viktor57/project-lvl2-s329/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/213c97e4dbe65dabc2e8/test_coverage)](https://codeclimate.com/github/57Viktor57/project-lvl2-s329/test_coverage)
[![NPM Version](http://img.shields.io/npm/v/second_v_k_project.svg?style=flat)](https://www.npmjs.org/package/second_v_k_project)

## Setup

clone git and make installation
```sh
$ make install
```
or install binaries from npm
```sh
$ npm install -g second_v_k_project
```

## Usage

* program supports four input file types: `.yml` `.yaml` `.ini` `.json`
* `$ gendiff before.json after.json` get diff with default output
* `$ gendiff before.yml after.yml --format json` get full diff tree with JSON output
* `-f | --format [type]` formating output to tree, json or plain, default is tree
* `-h | --help` help page
* `-V | --version` program version

### Tree output
`$ gendiff before.json after.json`
```
{
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```
### Plain output
`$ gendiff before.json after.json -f plain`
```
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From complex value to 'str'
Property 'group2' was removed
Property 'group3' was added with complex value
```
### JSON output
`$ gendiff before.json after.json -f json`
```json
[
  {
    "key": "group1",
    "type": "nest",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  {
    "key": "group2",
    "type": "deleted",
    "value": {
      "abc": "12345"
    }
  },
  {
    "key": "group3",
    "type": "added",
    "value": {
      "fee": "100500"
    }
  }
]
```

[![asciicast](https://asciinema.org/a/xwHqNIeWtQhN6YzFTDtKSTHLT.png)](https://asciinema.org/a/xwHqNIeWtQhN6YzFTDtKSTHLT)
