msg?=
gitcheck:
	if [[ "$(msg)" = "" ]] ; then echo "Usage: make pkg msg='commit msg'";exit 20; fi
dev:
	pnpm i
test:
	npm test
build: test
	npm run build
pkg: gitcheck build
	npm version patch --force  --git-tag-version false
	npm publish
	git commit -am "$(msg)"
	git push origin HEAD
new:
	cp package.json tsconfig.json makefile jest.config.ts .gitignore ../proj
