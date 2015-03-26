var test    = require('tape');
var chalk   = require('chalk');
var red     = chalk.red, green = chalk.green, cyan = chalk.cyan;
var path    = require('path');
var ignored = require('ignored')('./.gitignore'); // get the list of entries in .gitignore
var listdirs = require('../');
ignored.push('.git'); // ignore the .git dir
// console.log(ignored);
var basedir = path.resolve(__dirname +'/../')

test(cyan('List: ' +basedir+' supplying IGNORED list (.gitignore file)'), function (t) {
  listdirs(basedir, function(err, list) {
    console.log(red(err));
    console.log(cyan(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - '))
    console.log(list);
    console.log("List: "+red(list.length));
    t.equal(list.length, 9, green("✓ List contains Only 9 dirs ignored list supplied."));
    t.end();
  }, ignored);
});

test(cyan('List: ' +basedir+' without supplying ignored list (.gitignore file)'), function (t) {
  listdirs(basedir, function(err, list) {
    // console.log(red(err));
    // console.log(cyan(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - '))
    // console.log(list);
    console.log("List: "+red(list.length));
    t.true(list.length > 500, green("✓ List contains " + list.length + "dirs when NO IGNORED LIST Supplied."));
    t.end();
  });
});
