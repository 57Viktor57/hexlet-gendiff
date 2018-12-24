install:
	npm install

start:
	npx babel-node -- 'src/bin/gendiff.js' -f json __tests__/__fixtures__/tree1.json __tests__/__fixtures__/tree2.json
publish:
	npm publish

lint:
	npm run eslint ./

test:
	npm test

build:
	rm -rf dist
	npm run build
