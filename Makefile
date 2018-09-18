install:
	npm install

start:
	npx babel-node -- 'src/bin/gendiff.js' __test__/__fixtures__/empty_file.json __test__/__fixtures__/file1.json

publish:
	npm publish

lint:
	npm run eslint ./

test:
	npm test

build:
	rm -rf dist
	npm run build
