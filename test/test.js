var test  = require('tape');
var chalk = require('chalk');

var listdirs = require('../listdirs');

test(chalk.cyan('Return error when supplied invalid base directory'), function (t) {
  listdirs(__filename, function(err, dirs){
    t.equal(err, !null, chalk.green("✓ "+__filename + " is NOT a directory. no further action possible."));
    t.end();
  })
});
