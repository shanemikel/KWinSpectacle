#!/bin/bash -ex

KWIN_API="qdbus org.kde.KWin"
MAIN_JS=$1

id=$($KWIN_API /Scripting loadScript $MAIN_JS)
$KWIN_API /$id run
# $KWIN_API /$id stop
