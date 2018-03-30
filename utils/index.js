const chalk = require('chalk')

module.exports = {
  log: (color, msg) => console.log(chalk[color](`## ${msg}`)),
  getFirstKey: o => {
    let first
    for (first in o) break
    return o[first]
  }
}
