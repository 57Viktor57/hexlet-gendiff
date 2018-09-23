#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

commander
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const { format } = options;
    console.log(genDiff(firstConfig, secondConfig, format));
  })
  .parse(process.argv);
