# RageMP-NativeUI
NativeUI for RageMP written in Javascript

### Compilation instructions:

1. gulp must be installed globally (`npm install`).
2. `gulp build` to compile nativeui typescript files.

### Not in any particular order:

* You can now change the title scale of a menu. `Menu.TitleScale` getter, setter.
* Added `closeChildren: boolean = false` parameter to `menu.Close()`. An optional parameter specifiing whether or not you want to close all children with the menu.
* Added `UIMenuDynamicListItem`.
* Descriptions are no longer cut off at 99 characters, but now support 99 * 3.
* Descriptions now support wrapping with font colour names, i.e `~HUD_COLOUR_FREEROAM~` will now wrap correctly.
* `UIMenuListItem` and `UIMenuSliderItem` can now store extra data.
* Improved description line wrapping.
* Description caption is now only updated when necessary.
* Description background is now only updated (recalculated) when necessary.
* Bettered the position of the left arrow for list items.
* Added new badges (Sale, Arrows and Voice Icons).
* Added `Menu.RemoveItem(item: UIMenuItem)`.
* When binding an item to a menu, automatically add that item if it isn't in the menu items list already.
* Added `MenuOpen` event when `menu.Visible` is changed.
* When hovering over the currently selected ListItem's title text, the cursor will be MiddleFinger, just like in the original * menus.
* `GoLeft` and `GoRight` now correctly handles disabled items.
* Added experimental automated menu pool system (It's a bit effy right now).
* MENUS ARE NO LONGER SHOWN BY DEFAULT.

### NOTE BRIEFLY:

* The description and optimization updates for me saved over 20-30 FPS while a menu is open.
* You might want to be careful with menu pools right now. I haven't went deep into it but for simple menu pools it works GREAT.
* `MenuClose` event is NOT emitted when Visible is set to false. This is to allow users to reopen menus at it's same state, for e.g searching through a store.