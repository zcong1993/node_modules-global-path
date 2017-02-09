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
      path.join(userHome, '.config', 'yarn', 'global')
    ]
  }

  if (platform === 'darwin') {
    globalPath.push(path.join('/usr/local/lib'))
  } else if (platform === 'linux') {
    globalPath.push(path.join('/usr/lib'))
  }

  return globalPath.length === 0 ? [] : globalPath.filter(path => checkPathExists(path))
}

function checkPathExists(root) {
  return fs.existsSync(path.join(root, 'node_modules'))
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
