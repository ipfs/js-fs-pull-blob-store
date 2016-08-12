'use strict'

const path = require('path')
const write = require('pull-write-file')
const read = require('pull-file')
const fs = require('fs')
const mkdirp = require('mkdirp')
const defer = require('pull-defer/sink')

module.exports = class FsBlobStore {
  constructor (dirname) {
    this.path = dirname
  }

  write (key, cb) {
    cb = cb || (() => {})

    const deferred = defer()
    const filename = join(this.path, key)
    mkdirp(path.dirname(filename), (err) => {
      if (err) {
        deferred.abort(err)
        return cb(err)
      }

      deferred.resolve(write(filename, cb))
    })

    return deferred
  }

  read (key) {
    return read(join(this.path, key))
  }

  exists (key, cb) {
    cb = cb || (() => {})

    fs.stat(join(this.path, key), (err, stat) => {
      if (err && err.code !== 'ENOENT') {
        return cb(err)
      }
      cb(null, Boolean(stat))
    })
  }

  remove (key, cb) {
    cb = cb || (() => {})
    fs.unlink(join(this.path, key), (err) => {
      if (err && err.code !== 'ENOENT') {
        return cb(err)
      }
      cb()
    })
  }
}

function join (root, dir) {
  return path.join(
    root,
    path.resolve('/', dir).replace(/^[a-zA-Z]:/, '')
  )
}
