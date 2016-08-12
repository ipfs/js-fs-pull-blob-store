'use strict'

const testSuite = require('interface-pull-blob-store')
const fs = require('fs')

const FsBlobStore = require('../src')

testSuite({
  setup (cb) {
    cb(null, new FsBlobStore('./tmp'))
  },
  teardown (store, cb) {
    fs.unlink('./tmp', cb)
  }
})
