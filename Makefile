.PHONY: all
all: build

.PHONY: build
build:
	cd content-org && emacs -L ../ox-hugo --batch -Q --load ../publish.el --funcall gpk-publish-all
	tree -h content
	hugo --debug --logLevel debug --minify
	tree -h public

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
