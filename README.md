# listdirs

**List Dir**ectorie**s** ***async***hronously in node.js

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

## How?

```js
listdirs(dir, callback(list));
```


## Research

+ **nodejs-walker**: https://github.com/daaku/nodejs-walker unclear docs.
+ **dirtree**: https://www.npmjs.com/package/dirtree comes *really* close
to what we want! except it returns a tree object where we want a simple array.
+ **dirs**: https://github.com/jonschlinkert/dirs unclear docs. not *used* by anyone.
