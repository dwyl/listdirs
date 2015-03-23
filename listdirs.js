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
  var walking = 1;

  function dircheck(fd) {
    isdir(fd, function(err, dir){
      if(!err) {
        if(dir) {
          console.log(cyan(fd)+" directory found! walkdir - - - - - - - - - - - - - - -")
          list.push(fd);
          count++;
          walkdir(fd);
        }
        else {
          console.log(red("Dead end. "+fd +" not a directory ") + cyan("count: "+count));
          done();
        }
        // return count--;
      }
      else {
        console.log(red(">>>>>>>>>>>>>    ERROR: "+fd +" <<<<<<<<<<<<<< "));
        return callback("Error: basedir param must be a valid directory.", list);
      }
      count--;
      return console.log(cyan(count) + " | checking: "+fd);
    });
  }
  console.log(">>> basedir: "+basedir);
  dircheck(basedir); // initial check for basedir is valid directory

  function walkdir(dir) {
    walking++;
    fs.readdir(dir, function(err, files) {
      var filecount = files.length;
      count = count - 1 + filecount;
      console.log(cyan(filecount), "| ", red(count), files);
      if(filecount > 0) {
        files.map(function(file) {
          var fd = path.resolve(dir + '/' + file);
          return dircheck(fd);
        })
        // for(var i = filecount; i > 0; i--) {
        //
        // }
      }
      else {
        console.log(red("Dead end. "+dir +" is empty ") + cyan("count: "+count));
      }
      return done();
    });
  }

  function done() {
    if(count === 0) {
      console.log(green("count: "+count + " > Done"));
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
