<?php
/**
 * Plugin Name: Mobile Device Sales
 * Plugin URI: https://example.com/mobile-device-sales
 * Description: A plugin to manage sales of electronic devices.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: mobile-device-sales
 * Domain Path: /languages
 * Requires at least: 5.0
 * Requires PHP: 7.4
 * RTL: True
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Define constants
 */
define( 'MDS_VERSION', '1.0.0' );
define( 'MDS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MDS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'MDS_PLUGIN_FILE', __FILE__ );

/**
 * The code that runs during plugin activation.
 */
function activate_mobile_device_sales() {
    require_once MDS_PLUGIN_DIR . 'includes/class-mds-activator.php';
    MDS_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_mobile_device_sales() {
    require_once MDS_PLUGIN_DIR . 'includes/class-mds-deactivator.php';
    MDS_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_mobile_device_sales' );
register_deactivation_hook( __FILE__, 'deactivate_mobile_device_sales' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require MDS_PLUGIN_DIR . 'includes/class-mds-main.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_mobile_device_sales() {

    $plugin = new MDS_Main();
    $plugin->run();

}
run_mobile_device_sales();
