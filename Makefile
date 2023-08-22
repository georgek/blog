.PHONY: all
all: build

build:
	hugo

dev:
	hugo server -D --navigateToChanged
