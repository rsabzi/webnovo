<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 * @author     Your Name <email@example.com>
 */
class MDS_Main {

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      MDS_Loader    $loader    Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $plugin_name    The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * The form handler instance.
     * @since 1.0.0
     * @access protected
     * @var MDS_Form_Handler $form_handler
     */
    protected $form_handler;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct() {
        if ( defined( 'MDS_VERSION' ) ) {
            $this->version = MDS_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'mobile-device-sales';

        $this->load_dependencies();
        $this->form_handler = new MDS_Form_Handler();
        // $this->order_handler = new MDS_Order(); // Not needed if only static methods or hooks on Form_Handler
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
        $this->define_post_related_hooks(); // New method for CPT/Taxonomy/Order hooks

    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - MDS_Loader. Orchestrates the hooks of the plugin.
     * - MDS_i18n. Defines internationalization functionality.
     * - MDS_Admin. Defines all hooks for the admin area.
     * - MDS_Public. Defines all hooks for the public side of the site.
     * - MDS_Form_Handler. Handles multi-step form logic.
     * - MDS_Order. Handles order specific logic and CPT status.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies() {

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once MDS_PLUGIN_DIR . 'includes/class-mds-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once MDS_PLUGIN_DIR . 'includes/class-mds-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once MDS_PLUGIN_DIR . 'includes/admin/class-mds-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once MDS_PLUGIN_DIR . 'includes/public/class-mds-public.php';

        /**
         * The class responsible for defining all custom post types and taxonomies.
         */
        require_once MDS_PLUGIN_DIR . 'includes/class-mds-post-types.php';

        /**
         * The class responsible for handling multi-step form logic.
         */
        require_once MDS_PLUGIN_DIR . 'includes/class-mds-form-handler.php';

        /**
         * The class responsible for order CPT statuses and related logic.
         */
        require_once MDS_PLUGIN_DIR . 'includes/class-mds-order.php';


        $this->loader = new MDS_Loader();

    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the MDS_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale() {

        $plugin_i18n = new MDS_i18n();

        $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks() {

        $plugin_admin = new MDS_Admin( $this->get_plugin_name(), $this->get_version() );

        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
        $this->loader->add_action( 'admin_menu', $plugin_admin, 'add_admin_menu' );

    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks() {

        $plugin_public = new MDS_Public( $this->get_plugin_name(), $this->get_version(), $this->form_handler );

        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
        $this->loader->add_action( 'init', $plugin_public, 'register_shortcodes' ); // Add this line for shortcode registration

    }

    /**
     * Register all of the hooks related to custom post types and taxonomies.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_post_related_hooks() {
        $post_types_taxonomies = new MDS_Post_Types();
        $this->loader->add_action( 'init', $post_types_taxonomies, 'register_post_types' );
        $this->loader->add_action( 'init', $post_types_taxonomies, 'register_taxonomies' );

        // Hook for registering custom order statuses
        $this->loader->add_action( 'init', 'MDS_Order', 'register_order_statuses' );

        // Hooks for final form submission
        $this->loader->add_action( 'admin_post_submit_device_order', array( $this->form_handler, 'process_final_submission' ) );
        $this->loader->add_action( 'admin_post_nopriv_submit_device_order', array( $this->form_handler, 'process_final_submission' ) );
    }


    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run() {
        // All hooks are now defined in constructor calls to define_*_hooks methods
        // $this->define_post_related_hooks(); // This is now called in constructor
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name() {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     * @return    MDS_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader() {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     * @return    string    The version number of the plugin.
     */
    public function get_version() {
        return $this->version;
    }

}
