# listdirs

**List Dir**ectorie**s** ***async***hronously in node.js

[![Build Status](https://travis-ci.org/ideaq/listdirs.svg)](https://travis-ci.org/ideaq/listdirs)
[![Code Climate](https://codeclimate.com/github/ideaq/listdirs/badges/gpa.svg)](https://codeclimate.com/github/ideaq/listdirs)
[![Test Coverage](https://codeclimate.com/github/ideaq/listdirs/badges/coverage.svg)](https://codeclimate.com/github/ideaq/listdirs)
[![npm version](https://badge.fury.io/js/listdirs.svg)](http://badge.fury.io/js/listdirs)
[![Node.js Version][node-version-image]][node-version-url]
[![Dependency Status](https://david-dm.org/ideaq/listdirs.svg)](https://david-dm.org/ideaq/listdirs)

## Why?

We needed an easy way of listing all the directories in a project
so we could watch them for changes.  
We reviewed *many* available options and found them lacking in
one of the following areas:

1. **Untested** (or *incomplete tests*)
2. **Patchy documentation** (*often none*)
3. **Unmaintained** or Abandoned (many open/unaddressed issues on GitHub)
4. **Unclear** code (written without [*shoshin*](http://en.wikipedia.org/wiki/Shoshin))

![too many features](http://i.imgur.com/ap0tuHe.gif)


## What?

Given an initial directory (e.g. the [Current Working Directory](http://en.wikipedia.org/wiki/Working_directory)) give me a
list of all the "child" directories.

## How? (usage)

### Install from NPM

```sh
npm install listdirs --save
```

Then in your code:

```js
var listdirs = require('listdirs');
var basedir = __dirname; // or which ever base directory you prefer
listdirs(basedir, function callback(err, list){
    if(err){
      console.log(err); // handle errors in your preferred way.
    }
    else {
      console.log(list); // use the array of directories as required.
    }
});
```


## Research

+ **nodejs-walker**: https://github.com/daaku/nodejs-walker unclear docs.
+ **dirtree**: https://www.npmjs.com/package/dirtree comes *really* close
to what we want! except it returns a tree object where we want a simple array.
+ **dirs**: https://github.com/jonschlinkert/dirs
unclear docs. uses [*async*](https://github.com/caolan/async) (=== lazy).

### Asynchronous (non-blocking) without *Async* (the module)

The [*async*](https://github.com/caolan/async) is good
(as evidenced by its popularity!)  
But *way* too many people use it as a crutch instead of *understanding*
how to write their own asynchronous code.  
We have *deliberately* avoided using *async* (the module) here,
and as a result, this module is *faster* (we benchmarked it!)
and includes *less bloat*.

We have included ***one dependency*** on
[**isdir**](https://www.npmjs.com/package/isdir)
for the sake of splitting out code into "does-only-one-thing" (micro-modules)
but **isdir** has ***zero dependencies*** so we know the stack!

[node-version-image]: https://img.shields.io/node/v/listdirs.svg?style=flat
[node-version-url]: http://nodejs.org/download/
