#!/usr/bin/env bash
find out/ -name \*.md -exec perl -pi -e 's#/content/images/\d\d\d\d/\d\d/##g' {} \;
