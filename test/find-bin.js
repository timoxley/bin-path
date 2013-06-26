"use strict"

var test = require('tape')
var binPath = require('../')(require)
var normalize = require('path').normalize

test('sync finding object bins for a package', function(t) {
  t.plan(1)
  t.deepEqual(binPath('tape'), {
    "tape": normalize(__dirname + "/../node_modules/tape/bin/tape")
  })
})

test('sync finding string bins for a package', function(t) {
  t.plan(1)
  // rimraf an example of a module with string bin
  t.deepEqual(binPath.sync('rimraf'), {
    "rimraf": normalize(__dirname + "/../node_modules/rimraf/bin.js")
  })
})


test('async finding object bins for a package', function(t) {
  t.plan(2)
  binPath('tape', function(err, bin) {
    t.ifError(err)
    t.deepEqual(bin, {"tape": normalize(__dirname + "/../node_modules/tape/bin/tape")})
  })
})

test('async finding string bins for a package', function(t) {
  t.plan(2)
  // rimraf an example of a module with string bin
  binPath('rimraf', function(err, bin) {
    t.ifError(err)
    t.deepEqual(bin, {"rimraf": normalize(__dirname + "/../node_modules/rimraf/bin.js")})
  })
})
