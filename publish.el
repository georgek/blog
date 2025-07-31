;;; publish.el --- publish org-mode blog                     -*- lexical-binding: t; -*-
;;; Commentary:
;;; original influence: https://github.com/NethumL/nethuml.github.io/

;;; Code:
(defconst gpk-content-files
  '("travel.org"
    "life.org"
    "networking.org"
    "programming.org"
    "software.org"
    "technology.org"
    "thoughts.org"
    "misc.org"))

;; Install packages
(require 'package)
(package-initialize)
(unless package-archive-contents
  (add-to-list 'package-archives '("nongnu" . "https://elpa.nongnu.org/nongnu/") t)
  (add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
  (package-refresh-contents))
(setq package-install-upgrade-built-in t)
(dolist (pkg '(org org-contrib tomelr))
  (package-install pkg))

(require 'url-methods)
(url-scheme-register-proxy "http")
(url-scheme-register-proxy "https")

(require 'org)
(require 'ox-extra)
(require 'ox-hugo)                      ; my patched version of ox-hugo is used
(ox-extras-activate '(ignore-headlines))

;;; Assume published timestamps etc. are in local time. A better solution would be to
;;; include time zone with org timestamps, but I don't know how to do that.
(set-time-zone-rule "Europe/London")

(defun gpk-publish-all ()
  "Publish all content files"
  (message "Publishing from emacs...")
  (dolist (file gpk-content-files)
    (find-file file)
    (org-hugo-export-wim-to-md t)
    (message (format "Exported from %s" file)))
  (message "Finished exporting to markdown"))

;;; publish.el ends here
