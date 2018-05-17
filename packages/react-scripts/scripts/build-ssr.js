// @remove-on-eject-begin
'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

// @remove-on-eject-end
const config = require('../config/webpack-ssr.config.prod');
const webpack = require('webpack');
const chalk = require('chalk');

console.log(chalk.yellow('Compiling SSR application ...'));

webpack(config).run(function (err, stats) {
  if (err && err.message) {
    console.log(chalk.red('Compilation has fail:'));
    console.log(chalk.red(err.message));
    console.log('\n');
    console.log(chalk.yellow(`
You can find more information by taking a look on the webpack
stats:
    `))
    console.log(chalk.cyan('=== STATS ==='));
    console.log('\n')
    console.log(stats);

    return process.exit(1);
  }

  console.log(chalk.green(`Compilation finished :-°.`));
  console.log(chalk.gray(`
You can now run an http server for the SSR rendering by running:

$ yarn run server
  `))
})

