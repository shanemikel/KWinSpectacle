## KWinSpectacle
A simple KDE KWin plugin for emulating the functionality of
[Spectacle](spectacleapp.com) for MacOS.

It moves the currently active application window to the `Right` or
`Left` side of the screen, cycling between half-screen size,
one-third, and two-thirds with multiple presses of the corresponding
directional key-binding.  I plan to add `Top`, and `Bottom` positions,
as well as cornering.

### Default Key-bindings
* Cycle Left = `Ctrl-Meta-Left`
* Cycle Right = `Ctrl-Meta-Right`

### Installation and Usage
Build the plugin with `make spectacle.kwinscript`.  Install with the
KWin script-management GUI.

The default key-bindings can be changed from the `Global Shortcuts`
menu of the keyboard configuration interface in the KDE settings menu.
All keybindings are prefixed with `Spectacle: `.
