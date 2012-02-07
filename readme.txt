=== Plugin Name ===
Contributors: Max Chirkov
Donate link: http://www.ibsteam.net/donate
Tags: navigation, sidebar, widget, plugin, links, menu
Requires at least: 2.8
Tested up to: 3.2.1
Stable tag: 2.1.5

Easy way to create custom navigation in sidebars or other pre-defined areas. Conditional tags are included to specify pages where widgets appear. Supports horizontal/top navigation, hierarchical navigation including drop downmenus like Suckerfish.

== Description ==
This plugin adds a widget into the Widgets dashboard that allows in a simple way, without writing any PHP code on your part, to create custom navigation in any sidebar pre-defined by your WP theme.

**WARNING**
**v.2.1.x is for WordPress 2.8 and higher ONLY!**

**For WP 2.7 and older use v.2.0.9**

**When upgrading from the version that was setup on WP 2.7, all your old widgets will appear in the Inactive Widgets section. Just drag them into the sidebars where they supposed to be.**

**Features Include:**

* Flat and multi-level navigation hierarchy for existing pages and custom links.
* Very flexible conditional appearance options (greatly expanded from before 2.0 version).
* Out-of-the-box Suckerfish support.
* Option to add navigation links with custom title, url and target attribute.
* Unlimited number of navigation widgets.
* Optional setting includes blog posts into the navigation selection list (only pages are available by default).
* Support for custom drop-down menus CSS.

**Recent Updates Log:**

* 2.1.5 - Added compatibility with Advanced Text Widget PRO.
* 2.1.4 - Minor update with IE6 JS fix.
* 2.1.0 - Wordpress 2.8 Compatible and newer versions ONLY.
* 2.0.10 - Fixed active links bug.
* 2.0.9 - Fixed array unserialization, which was being broken by non-US characters (i.e. German umlauts).
* 2.0.8 - There is a floating bug between serializing from JS into PHP and back - hopefully it's fixed now.
* 2.0.7 - Fixed get_posts() 5 post limit; Added ON/OFF target attribute option to the Settings so it can be compliant with XHTML 1.0 Strict;
* 2.0.6 - Fixed an error when parsing serialized array: `Warning: array_key_exists(): on line 149`.
* 2.0.5 - Custom links with hyphens bug fixed.
* 2.0.4 - Removed unconditional suckerfish_e.js declaration.
* 2.0.3 - Changed navigation links to permalinks.
* 2.0.2 - Fixed links with apostrophes bug. (Link titles that had apostrophe in them weren't saving.)

*Conditional widget appearance is based on Daikos' Text Widget by Rune Fjellheim.*

* Author: Max Chirkov
* Author URI: [http://SimpleRealtyTheme.com](http://SimpleRealtyTheme.com "Real Estate Themes & Plugins")
* Copyright: Released under GNU GENERAL PUBLIC LICENSE


== Installation ==
**WARNING! AHTUNG! BHEMANIE! ADVERTENCIA! ALERTE!**

**The data storing conditions have been changed since 2.0 version.**

* The plugin will try to convert your existing simple sidenav widgets, but I suggest you to backup or make notes about your existing simple sidenav widgets, in case something goes wrong, so you can restore or duplicate your previous settings.

**Install like any other basic plugin:**

1. Upload `simple-sidebar-navigation` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to the Widgets dashboard, scroll to the bottom to add the desired number of widgets. Add widgets to your sidebars and edit them. The edit window should be self explanatory.

**Top Navigation Management functionality:**

* Edit your theme's header template or the correct template that contains header navigation. If you have static navigation links in your template or any other functions that generate your top navigation - paste it instead of this tag `<!--YOUR OLD NAVIGATION -->`.


**TopNav Code:** ` <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('Simple Top Nav') ) : ?> <!--YOUR OLD NAVIGATION --><?php endif; ?>`

Until the "Simple Top Nav" widget is created in the administrative widgets dashboard - your old navigation will still be functioning. The same applies when the Simple Sidebar Plugin is disabled or removed.

* Go to the administrative Widgets dashboard and select "Simple Top Nav" as your current widget. Add one of the available Simple Sidebar Navigation widgets to the sidebar and edit it.

**Suckerfish or Drop-Down Menus:**

* suckerfish.css **default stylesheet** is included. If you would like upload your own, separate from your main CSS file, drop-down menus stylsheet - you can specify its path via `Settings => Simple SideNav`.

**Notes:**

* *If you add more than one widget to the **Simple Top Nav** sidebar - it may break your theme's design or layout since only one list of links is usually expected to be there.*
* *Widget's Title in the Simple Top Nav sidebar should be blank - otherwise it will be hidden via inline CSS as display:none. I couldn't figure out how to alter the widget "on load" to remove it's title since it shouldn't be in the top navigation.*

== Video Demo ==

Check out this quick [video demonstration](http://screencast.com/t/ztSVIGmARoY "Demo Video for Simple Sidebar Navigation").

== Screenshots ==

1. Add existing pages/posts to your navigation as well as custom links, and organize them in a hierarchical manner if you wish so. Very flexible appearance conditional options: you can select pages, posts or categories by their IDs, slugs or titles where your widget **has** to appear, or **not** to appear.