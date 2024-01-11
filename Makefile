.PHONY: all
all: build

.PHONY: build
build:
	cd content-org && emacs --batch -Q --load ../publish.el --funcall gpk-publish-all
	tree content
	hugo --debug --logLevel debug --minify

.PHONY: clean
clean:
	rm -r content/*
	rm -r public/*

.PHONY: dev
dev:
	hugo server -D --navigateToChanged

.PHONY: images
images:
	./scripts/mkimages
