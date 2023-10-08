.PHONY: all
all: build

.PHONY: build
build:
	cd content-org && emacs --batch -Q --load ../publish.el --funcall gpk-publish-all
	hugo --minify

.PHONY: clean
clean:
	rm content/posts/*.md

.PHONY: dev
dev:
	hugo server -D --navigateToChanged
