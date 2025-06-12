<?php
/**
 * Fired during plugin activation
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 * @author     Your Name <email@example.com>
 */
class MDS_Activator {

    /**
     * Short Description. (use period)
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function activate() {
        // Add activation code here.
        // For example, set default options, create custom tables, flush rewrite rules.
        flush_rewrite_rules();
    }

}
