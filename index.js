"use strict"

var fs = require('fs')
var path = require('path')
var join = path.join

module.exports = function(pkg, fn) {
  if (!fn) return module.exports.sync(pkg)
  var dir = path.dirname(require.resolve(pkg))
  fs.readFile(join(dir, 'package.json'), {encoding: 'utf8'} , function(err, pkgContent) {
    if (err) return fn(err)
    return fn(null, parseBin(dir, pkgContent.toString()))
  })
}

module.exports.sync = function(pkg) {
  var dir = path.dirname(require.resolve(pkg))
  var pkgContent = fs.readFileSync(join(dir, 'package.json'))
  return parseBin(dir, pkgContent.toString())
}

function parseBin(dir, pkgContent) {
  try {
    var pkgData = JSON.parse(pkgContent)
  } catch(e) {
    return fn(e)
  }
  var bin = pkgData.bin
  if (typeof bin === 'string') {
    var result = {}
    result[pkgData.name] = path.normalize(join(dir, bin[key]))
    return result
  }
  else if (typeof bin === 'object') {
    for (var key in bin) {
      bin[key] = path.normalize(join(dir, bin[key]))
    }
    return bin
  }
  else return {}
}
