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
    try {
      const { format } = options;
      console.log(genDiff(firstConfig, secondConfig, format));
    } catch (e) {
      console.log(e.message);
    }
  })
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.help();
}
