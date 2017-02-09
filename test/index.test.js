const path = require('path')
const userHome = require('user-home')
const getPaths = require('../')

describe.skip('main', () => {
  test('main test', () => {
    const paths = getPaths()

    if (!process.platform === 'win32') {
      expect(paths).toEqual([
        path.join(userHome, 'AppData', 'Local', 'Yarn', 'config', 'global'),
        path.join(userHome, 'AppData', 'Roaming', 'npm')
      ])
    }
  })
})
