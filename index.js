const fs = require('fs')
const path = require('path')
let userHome = require('user-home')

const platform = process.platform

if (platform === 'linux' && isRootUser(getUid())) {
  userHome = path.resolve('/usr/local/share')
}

function getGlobalPath() {
  let globalPath = []

  if (platform === 'win32' && process.env.LOCALAPPDATA) {
    globalPath = [
      path.join(process.env.LOCALAPPDATA, 'Yarn', 'config', 'global'),
      path.join(process.env.LOCALAPPDATA, '..', 'Roaming', 'npm')
    ]
  } else {
    globalPath = [
      path.join(userHome, '.config', 'yarn', 'global'),
      path.join('/usr/local/lib')
    ]
  }

  return globalPath.length === 0 ? [] : globalPath.filter(path => checkPathExists(path))
}

function checkPathExists(path) {
  return fs.existsSync(path)
}

function getUid() {
  if (process.platform !== 'win32' && process.getuid) {
    return process.getuid()
  }
  return null
}

function isRootUser(uid) {
  return uid === 0
}

module.exports = getGlobalPath
