#!/usr/bin/env node
'use strict';
const meow = require('meow');
const FileType = require('file-type');

const cli = meow(`
	Usage
	  $ file-type <filename>
	  $ file-type < <filename>

	Example
	  $ file-type unicorn.png
	  png
	  image/png
`);

function printResult(type) {
	if (!type) {
		console.error('Unrecognized file type');
		process.exit(65);
	}

	console.log(`${type.ext}\n${type.mime}`);
}

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

(async () => {
	if (input) {
		printResult(await FileType.fromFile(input));
	} else {
		printResult(await FileType.fromStream(process.stdin));
	}
})();
