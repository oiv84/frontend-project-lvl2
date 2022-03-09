install: install-deps
	npx simple-git-hooks

start:
	bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

link:
	npm link

unlink:
	npm unlink

publish:
	npm publish --access public
