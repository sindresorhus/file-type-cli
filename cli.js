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

async function initFromStream(stream) {
	const type = await FileType.fromStream(stream);

	printResult(type);
}

async function initFromFilePath(filePath) {
	const type = await FileType.fromFile(filePath);

	printResult(type);
}

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a file path');
	process.exit(1);
}

if (input) {
	initFromFilePath(input);
} else {
	initFromStream(process.stdin);
}
