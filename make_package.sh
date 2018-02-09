#!/bin/bash

ZIP_FILE=../$1
SRC_DIR=$2
shift 2

cd $SRC_DIR
zip $ZIP_FILE $@
