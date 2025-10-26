.PHONY: all
all: build

.PHONY: build
build:
	cd content-org && emacs -L ../ox-hugo --batch -Q --load ../publish.el --funcall gpk-publish-all
	tree -h content
	hugo --logLevel debug --minify --buildFuture
	tree -h public

.PHONY: clean
clean:
	rm -r content/*
	rm -r public/*

.PHONY: dev
dev:
	hugo server -D --navigateToChanged

SRC_IMAGE_DIR := src-images
DST_IMAGE_DIR := static/web-images
SRC_IMAGES := $(shell find "$(SRC_IMAGE_DIR)" -type f -iregex .*jpe?g$)

DST_IMAGES_LG := $(patsubst $(SRC_IMAGE_DIR)/%,$(DST_IMAGE_DIR)/%,$(SRC_IMAGES))
DST_IMAGES_SM := $(patsubst $(SRC_IMAGE_DIR)/%,$(DST_IMAGE_DIR)/%-sm.jpeg,$(SRC_IMAGES))

images: $(DST_IMAGES_LG) $(DST_IMAGES_SM)

$(DST_IMAGE_DIR)/%: $(SRC_IMAGE_DIR)/%
	@mkdir -p $(dir $@)
	magick "$<" -auto-orient -resize 1920x1080 -strip -quality 86 "$@"

$(DST_IMAGE_DIR)/%-sm.jpeg: $(SRC_IMAGE_DIR)/%
	@mkdir -p $(dir $@)
	magick "$<" -auto-orient -resize 500x500 -strip -quality 78 "$@"
