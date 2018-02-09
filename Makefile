SRC_DIR = spectacle
METADATA_DESKTOP = metadata.desktop
MAIN_JS = contents/code/main.js

SRC_FILES = $(METADATA_DESKTOP) $(MAIN_JS)
REL_SRC_FILES = $(addprefix $(SRC_DIR)/,$(SRC_FILES))

spectacle.kwinscript: $(REL_SRC_FILES)
	./make_package.sh $@ $(SRC_DIR) $(SRC_FILES)

.PHONY:
run:
	./run_kwin_script.sh $(PWD)/$(SRC_DIR)/$(MAIN_JS)

.PHONY:
reset_kwin:
	./reset_kwin.sh
