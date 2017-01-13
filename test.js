import fs from 'fs';
import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.7z']);
	t.is(stdout, '7z\napplication/x-7z-compressed');
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {
		input: fs.readFileSync('fixture.7z')
	});
	t.is(stdout, '7z\napplication/x-7z-compressed');
});
