<?php
/**
 * Plugin Name: Scroll CTA
 * Plugin URI: https://example.com/scroll-cta
 * Description: A simple plugin that adds a call to action button when the user scrolls down a certain percentage of the page.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: scroll-cta
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

define( 'SCROLL_CTA_VERSION', '1.0.0' );
define( 'SCROLL_CTA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'SCROLL_CTA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

// Include admin settings
require_once SCROLL_CTA_PLUGIN_DIR . 'includes/admin.php';

// Include frontend display
require_once SCROLL_CTA_PLUGIN_DIR . 'includes/frontend.php';
