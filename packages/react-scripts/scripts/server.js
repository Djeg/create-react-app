// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const paths = require('../config/paths.js');
const fs = require('fs');
const chalk = require('chalk');

if (!fs.existsSync(paths.serverScriptPath)) {
  console.log(chalk.red(`
The file ${paths.serverScriptPath} does no exists.

Are your sure that you have compiled your SSR application first ?

$ yarn run build-ssr
    `));

  return process.exit(1);
}

console.log(chalk.yellow('Running SSR http server...'));
console.log("\n");

try {
  const main = require(paths.serverScriptPath);

  if ('function' === main) {
    main();
  }
} catch (error) {
  console.log(chalk.red('An error happens during the SSR Http Server:'));
  console.log("\n");
  console.log(chalk.red(error.message));
  console.log("\n");
  console.log(chalk.cyan('=== STACK TRACE ==='));
  console.log("\n");
  console.log(chalk.gray(error.stack));

  return process.exit(1);
}
