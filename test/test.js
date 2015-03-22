var test  = require('tape');
var chalk = require('chalk');

var dirlist = require('../');

test(chalk.cyan('sync method with valid dir'), function (t) {
  var dir = isdir(__dirname)
  t.equal(dir, true, chalk.green("✓ "+__dirname + " is a directory (sync)"));
  t.end();
});
