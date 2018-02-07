MAIN_JS = $(PWD)/main.js

.PHONY:
default:
	$(error No suitable canditate for default target)

.PHONY:
run:
	./run_kwin_script.sh $(MAIN_JS)

.PHONY:
reset_kwin:
	./reset_kwin.sh
