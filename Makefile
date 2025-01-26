

.PHONY: setup
setup:
	npm install

.PHONY: build
build:
	grunt clean
	grunt build