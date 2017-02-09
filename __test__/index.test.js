const path = require('path')
let userHome = require('user-home')
const nodeModulesGlobalPath = require('../')
const {isRootUser} = require('../libs/utils')

if (process.platform === 'linux' && isRootUser()) {
  userHome = path.resolve('/usr/local/share')
}

test('main test', () => {
  const paths = nodeModulesGlobalPath()

  if (process.platform === 'win32') {
    expect(paths).toEqual([
      path.join(userHome, 'AppData', 'Local', 'Yarn', 'config', 'global'),
      path.join(userHome, 'AppData', 'Roaming', 'npm')
    ])
  } else if (process.platform === 'linux') {
    expect(paths).toEqual([
      path.join(userHome, '.config', 'yarn', 'global'),
      '/usr/lib'
    ])
  } else {
    expect(paths).toEqual([
      path.join(userHome, '.config', 'yarn', 'global'),
      '/usr/local/lib'
    ])
  }
})
