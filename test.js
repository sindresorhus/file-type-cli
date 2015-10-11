import childProcess from 'child_process';
import test from 'ava';
import pify from 'pify';

test('main', async t => {
	const stdout = await pify(childProcess.execFile)('./cli.js', ['fixture.7z'], {cwd: __dirname});
	t.is(stdout.trim(), '7z\napplication/x-7z-compressed');
});

test('stdin', async t => {
	const stdout = await pify(childProcess.exec)('./cli.js < fixture.7z', {cwd: __dirname});
	t.is(stdout.trim(), '7z\napplication/x-7z-compressed');
});
