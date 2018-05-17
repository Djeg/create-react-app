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

const path = require('path')
const paths = require('../config/paths.js');
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar')
const { exec } = require('child_process')

console.log(chalk.gray(`
Watch the entire src/ folder. If any changes are made, the SSR app will be
rebuild and the server relaunch.

This watcher is only made for development purpose. Do not use it in production,
use the following commands instead:

$ yarn run build-ssr && yarn run server
`))

console.log(chalk.yellow(`Starting SSR watcher on src/ directory`))

const watcher = chokidar.watch(paths.appSrc);
const command = `cd ${paths.appPath} && npm run build-ssr && npm run server`

const execBuilder = () => {
  const builder = exec(command)

  builder.stdout.on('data', data =>
    String(data)
      .split('\n')
      .filter(line => !!line)
      .map(line => line.trim())
      .map(line => console.log(chalk.gray(`> stdout: ${line}`))))

  builder.stderr.on('data', data =>
    String(data)
      .split('\n')
      .filter(line => !!line)
      .map(line => line.trim())
      .map(line => console.log(chalk.red(`> stderr: ${line}`))))

  return builder;
}

let builder = execBuilder();

// make sure to kill the sub process when this process exit:
process.on('beforeExit' () => builder.kill('SIGKILL'))

watcher.on('ready', () => {
  console.log(chalk.cyan('Watching src/ for changes'));

  watcher.on('all', () => {
    console.log(chalk.yellow('Restarting SSR server..'));

    builder.kill('SIGKILL');

    builder = execBuilder();
  })
})


