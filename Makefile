.PHONY: all
all: build

.PHONY: build
build:
	cd content-org && emacs --batch -Q --load ../publish.el --funcall gpk-publish-all
	tree content
	hugo --minify
	tree public

.PHONY: clean
clean:
	rm -r content/*

.PHONY: dev
dev:
	hugo server -D --navigateToChanged
