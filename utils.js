const chalk = require('chalk')
module.exports = {
  log: (color, msg) => console.log(chalk[color](`## ${msg}`))
}
