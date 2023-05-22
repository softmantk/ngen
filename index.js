#!/usr/bin/env node
const commander = require('commander');
const pkg = require('./package.json')
const uuidGenerator = require('./cli/uuid');
const randomCharacters = require('./cli/random');
const loremIpsumGenerator = require('./cli/lorem');
const program = new commander.Command()
program.version(pkg.version);

program.addCommand(uuidGenerator())
program.addCommand(randomCharacters())
program.addCommand(loremIpsumGenerator())

program.parse(process.argv)
