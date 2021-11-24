#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import {fileTypeFromFile, fileTypeFromStream} from 'file-type';

const cli = meow(`
	Usage
	  $ file-type <filename>
	  $ file-type < <filename>

	Example
	  $ file-type unicorn.png
	  png
	  image/png
`, {
	importMeta: import.meta,
});

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
		printResult(await fileTypeFromFile(input));
	} else {
		printResult(await fileTypeFromStream(process.stdin));
	}
})();
