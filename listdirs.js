var fs    = require('fs');
var path  = require('path');
var isdir = require('isdir');
var chalk = require('chalk');
var red = chalk.red, green = chalk.green.bold, cyan =chalk.cyan.bold;
/**
 * listdirs returns a List of Directories given an initial base directory
 * by walking the directory tree and finding all child directories.
 * accepts two parameters:
 * @param {string} basedir - file descriptor e.g: /dir/child/etc/
 * @param {function} callback - is called once we have the list of directories
 * (or if an error occurs). Your callback should have two arguments:
 *   @param {string} error - an error message or null if no errors.
 *   @param {array} list - a list of directories in the order we found them.
 */
module.exports = function listdirs(basedir, callback) {
  var list  = []; // the list of dirs we will return
  var count = 1;

  function dircheck(fd) {
    console.log(cyan(count) + " | checking: "+fd);
    isdir(fd, function(err, dir){
      if(!err) {
        count--;
        if(dir) {
          list.push(fd);
          return walkdir(fd);
        }
        else {
          return done();
        }
      }
      else {
        console.log(red(">>>>>>>>>>>>>    ERROR: "+fd +" <<<<<<<<<<<<<< "));
        return callback("Error: basedir param must be a valid directory.", list);
      }
    });
  }
  console.log(' '); // blank line for readability
  console.log(">>> basedir: "+basedir);
  dircheck(basedir); // initial check for basedir is valid directory

  function walkdir(dir) {
    fs.readdir(dir, function(err, files) {
      var filecount = files.length;
      console.log(cyan(filecount), files);
      count = count + filecount;
      if(filecount === 0) {
        return done();
      }
      else {
        for(var i = filecount; i > 0; i--) {
          var fd = path.resolve(dir + '/' + files[i-1]);
          dircheck(fd);
        }
      }
    });
  }

  function done() {
    if(count === 0) {
      console.log(green("done! count: "+count));
      return callback(null, list);
    }
    else {
      return console.log(red("count: "+count));
    }
  }

}; // end module.exports

/*
fs.readdir(dir, function(err,files){
  var filecount = files.length;
  // console.log("FileCount: "+filecount);
  if(filecount === 0){
    done--;
    return callback();
  }
  if(filecount === 1){
    var file = path.resolve(dir + '/' + files[0]);
    checkisdir(file, 0, callback);
  }
  else {
    for(var i = files.length-1; i >= 0; i--) {
      var file = path.resolve(dir + '/' + files[i]);
       checkisdir(file, i, callback);
    }
  }
});
*/
