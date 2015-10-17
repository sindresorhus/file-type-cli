#!/usr/bin/env node
'use strict';
const readChunk = require('read-chunk');
const meow = require('meow');
const fileType = require('file-type');

const cli = meow(`
	Usage
	  $ file-type <filename>
	  $ file-type < <filename>

	Example
	  $ file-type unicorn.png
	  png
	  image/png
`);

function init(data) {
	const type = fileType(data);

	if (!type) {
		console.error('Unrecognized file type');
		process.exit(65);
	}

	console.log(`${type.ext}\n${type.mime}`);
}

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a filename');
	process.exit(1);
}

if (input) {
	init(readChunk.sync(cli.input[0], 0, 262));
} else {
	process.stdin.once('data', init);
}
