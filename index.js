'use strict'
const fs = require('fs')
const path = require('path')

const defaultPath = {
  win: [
    path.join(process.env.LOCALAPPDATA, 'Yarn', 'config', 'global'),
    path.join(process.env.LOCALAPPDATA, '..', 'Roaming', 'npm')
  ]
}
const platform = process.platform

function getGlobalPath() {
  let globalPath = []

  if (platform === 'win32' && process.env.LOCALAPPDATA) {
    globalPath = defaultPath.win
  }

  return globalPath.filter(path => checkPathExists(path))
}

function checkPathExists(path) {
  return fs.existsSync(path)
}

module.exports = getGlobalPath
