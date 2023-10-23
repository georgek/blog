;;; publish.el --- publish org-mode blog                     -*- lexical-binding: t; -*-
;;; Commentary:
;;; original influence: https://github.com/NethumL/nethuml.github.io/

;;; Code:
(defconst gpk-content-files
  '("life.org"
    "networking.org"
    "programming.org"
    "software.org"
    "technology.org"
    "thoughts.org"))

;; Install packages
(require 'package)
(package-initialize)
(unless package-archive-contents
  (add-to-list 'package-archives '("nongnu" . "https://elpa.nongnu.org/nongnu/") t)
  (add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
  (package-refresh-contents))
(dolist (pkg '(org-contrib ox-hugo))
  (package-install pkg))

(require 'url-methods)
(url-scheme-register-proxy "http")
(url-scheme-register-proxy "https")

;;; workaround a bug in either org-mode or ox-hugo causing truncation
(setq org-element--cache-self-verify t)

(require 'org)
(require 'ox-extra)
(require 'ox-hugo)
(ox-extras-activate '(ignore-headlines))

(defun gpk-publish-all ()
  "Publish all content files"
  (message "Publishing from emacs...")
  (dolist (file gpk-content-files)
    (find-file file)
    (org-hugo-export-wim-to-md t)
    (message (format "Exported from %s" file)))
  (message "Finished exporting to markdown"))

;;; publish.el ends here
