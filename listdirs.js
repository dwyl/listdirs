var fs    = require('fs');
var path  = require('path');
var isdir = require('isdir');
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
  var count = 1;  // count used to keep track of what we still need to walk

  function dircheck(fd) {
    isdir(fd, function(err, dir){
      if(!err) {
        if(dir) {
          list.push(fd);
          walkdir(fd);
        }
        else {
          count--;
          return done();
        }
      }
      else {
        return callback("Error: basedir param must be a valid directory.", list);
      }
    });
  }

  function walkdir(dir) {
    fs.readdir(dir, function(err, files) {
      count = count - 1 + files.length;
      if(count > 0) {
        files.map(function(file) {
          var fd = path.resolve(dir + '/' + file);
          return dircheck(fd);
        })
      }
      else {
        // console.log(dir +" is EMPTY! | count: "+count );
      }
      return done();
    });
  }

  function done() {
      if(count === 0) {
        return callback(null, list);
      }
      else {
        // return console.log("Still checking count: "+count);
      }
  }

  dircheck(basedir); // initial check that basedir is a valid directory
}; // end module.exports
