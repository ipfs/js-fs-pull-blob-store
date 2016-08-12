'use strict'

const testSuite = require('interface-pull-blob-store')
const path = require('path')
const os = require('os')
const rimraf = require('rimraf')

const FsBlobStore = require('../src')

testSuite({
  setup (cb) {
    const p = path.join(os.tmpdir(), String(process.pid))
    cb(null, new FsBlobStore(p))
  },
  teardown (store, cb) {
    rimraf(store.path, cb)
  }
})
