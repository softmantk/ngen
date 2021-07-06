#!/usr/bin/env node
const commander = require('commander');
const pkg = require('./package.json')
const uuidGenerator = require('./cli/uuid');
const program = new commander.Command()
program.version(pkg.version);

program.addCommand(uuidGenerator())

program.parse(process.argv)