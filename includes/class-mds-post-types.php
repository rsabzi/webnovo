<?php
/**
 * The file that defines the custom post types and taxonomies.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 */

/**
 * Defines custom post types and taxonomies for the plugin.
 *
 * @since      1.0.0
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 * @author     Your Name <email@example.com>
 */
class MDS_Post_Types {

    /**
     * Register custom post types.
     *
     * @since    1.0.0
     */
    public function register_post_types() {
        $labels = array(
            'name'                  => _x( 'Device Orders', 'Post Type General Name', 'mobile-device-sales' ),
            'singular_name'         => _x( 'Device Order', 'Post Type Singular Name', 'mobile-device-sales' ),
            'menu_name'             => __( 'Device Orders', 'mobile-device-sales' ),
            'name_admin_bar'        => __( 'Device Order', 'mobile-device-sales' ),
            'archives'              => __( 'Order Archives', 'mobile-device-sales' ),
            'attributes'            => __( 'Order Attributes', 'mobile-device-sales' ),
            'parent_item_colon'     => __( 'Parent Order:', 'mobile-device-sales' ),
            'all_items'             => __( 'All Orders', 'mobile-device-sales' ),
            'add_new_item'          => __( 'Add New Order', 'mobile-device-sales' ),
            'add_new'               => __( 'Add New', 'mobile-device-sales' ),
            'new_item'              => __( 'New Order', 'mobile-device-sales' ),
            'edit_item'             => __( 'Edit Order', 'mobile-device-sales' ),
            'update_item'           => __( 'Update Order', 'mobile-device-sales' ),
            'view_item'             => __( 'View Order', 'mobile-device-sales' ),
            'view_items'            => __( 'View Orders', 'mobile-device-sales' ),
            'search_items'          => __( 'Search Order', 'mobile-device-sales' ),
            'not_found'             => __( 'Not found', 'mobile-device-sales' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'mobile-device-sales' ),
            'featured_image'        => __( 'Featured Image', 'mobile-device-sales' ),
            'set_featured_image'    => __( 'Set featured image', 'mobile-device-sales' ),
            'remove_featured_image' => __( 'Remove featured image', 'mobile-device-sales' ),
            'use_featured_image'    => __( 'Use as featured image', 'mobile-device-sales' ),
            'insert_into_item'      => __( 'Insert into order', 'mobile-device-sales' ),
            'uploaded_to_this_item' => __( 'Uploaded to this order', 'mobile-device-sales' ),
            'items_list'            => __( 'Orders list', 'mobile-device-sales' ),
            'items_list_navigation' => __( 'Orders list navigation', 'mobile-device-sales' ),
            'filter_items_list'     => __( 'Filter orders list', 'mobile-device-sales' ),
        );
        $args = array(
            'label'                 => __( 'Device Order', 'mobile-device-sales' ),
            'description'           => __( 'Post type for device sales orders.', 'mobile-device-sales' ),
            'labels'                => $labels,
            'supports'              => array( 'title', 'editor', 'author', 'thumbnail', 'custom-fields', 'page-attributes', 'comments' ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true, // This will be handled by the admin menu class later
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-cart',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'rewrite'               => array( 'slug' => 'device-orders' ),
            'show_in_rest'          => true, // Enable Gutenberg editor support
        );
        register_post_type( 'device_order', $args );
    }

    /**
     * Register custom taxonomies.
     *
     * @since    1.0.0
     */
    public function register_taxonomies() {
        // Device Type Taxonomy
        $this->register_taxonomy(
            'device_type',
            'device_order',
            _x( 'Device Types', 'Taxonomy General Name', 'mobile-device-sales' ),
            _x( 'Device Type', 'Taxonomy Singular Name', 'mobile-device-sales' ),
            'device-types'
        );

        // Device Brand Taxonomy
        $this->register_taxonomy(
            'device_brand',
            'device_order',
            _x( 'Brands', 'Taxonomy General Name', 'mobile-device-sales' ),
            _x( 'Brand', 'Taxonomy Singular Name', 'mobile-device-sales' ),
            'device-brands'
        );

        // Device Model Taxonomy
        $this->register_taxonomy(
            'device_model',
            'device_order',
            _x( 'Models', 'Taxonomy General Name', 'mobile-device-sales' ),
            _x( 'Model', 'Taxonomy Singular Name', 'mobile-device-sales' ),
            'device-models'
        );

        // Device Condition Taxonomy
        $this->register_taxonomy(
            'device_condition',
            'device_order',
            _x( 'Conditions', 'Taxonomy General Name', 'mobile-device-sales' ),
            _x( 'Condition', 'Taxonomy Singular Name', 'mobile-device-sales' ),
            'device-conditions'
        );
    }

    /**
     * Helper function to register a taxonomy.
     *
     * @since    1.0.0
     * @param    string        $taxonomy_slug      The slug for the taxonomy.
     * @param    string|array  $post_type        The post type(s) to associate with.
     * @param    string        $plural_name      The plural name for the taxonomy.
     * @param    string        $singular_name    The singular name for the taxonomy.
     * @param    string        $rewrite_slug     The rewrite slug for the taxonomy.
     * @param    bool          $hierarchical     Whether the taxonomy is hierarchical. Default true.
     */
    private function register_taxonomy( $taxonomy_slug, $post_type, $plural_name, $singular_name, $rewrite_slug, $hierarchical = true ) {
        $labels = array(
            'name'                       => $plural_name,
            'singular_name'              => $singular_name,
            'menu_name'                  => $plural_name,
            'all_items'                  => sprintf( __( 'All %s', 'mobile-device-sales' ), $plural_name ),
            'parent_item'                => sprintf( __( 'Parent %s', 'mobile-device-sales' ), $singular_name ),
            'parent_item_colon'          => sprintf( __( 'Parent %s:', 'mobile-device-sales' ), $singular_name ),
            'new_item_name'              => sprintf( __( 'New %s Name', 'mobile-device-sales' ), $singular_name ),
            'add_new_item'               => sprintf( __( 'Add New %s', 'mobile-device-sales' ), $singular_name ),
            'edit_item'                  => sprintf( __( 'Edit %s', 'mobile-device-sales' ), $singular_name ),
            'update_item'                => sprintf( __( 'Update %s', 'mobile-device-sales' ), $singular_name ),
            'view_item'                  => sprintf( __( 'View %s', 'mobile-device-sales' ), $singular_name ),
            'separate_items_with_commas' => sprintf( __( 'Separate %s with commas', 'mobile-device-sales' ), strtolower( $plural_name ) ),
            'add_or_remove_items'        => sprintf( __( 'Add or remove %s', 'mobile-device-sales' ), strtolower( $plural_name ) ),
            'choose_from_most_used'      => sprintf( __( 'Choose from the most used %s', 'mobile-device-sales' ), strtolower( $plural_name ) ),
            'popular_items'              => sprintf( __( 'Popular %s', 'mobile-device-sales' ), $plural_name ),
            'search_items'               => sprintf( __( 'Search %s', 'mobile-device-sales' ), $plural_name ),
            'not_found'                  => sprintf( __( 'No %s found.', 'mobile-device-sales' ), strtolower( $plural_name ) ),
            'no_terms'                   => sprintf( __( 'No %s', 'mobile-device-sales' ), strtolower( $plural_name ) ),
            'items_list'                 => sprintf( __( '%s list', 'mobile-device-sales' ), $plural_name ),
            'items_list_navigation'      => sprintf( __( '%s list navigation', 'mobile-device-sales' ), $plural_name ),
        );
        $args = array(
            'labels'            => $labels,
            'hierarchical'      => $hierarchical,
            'public'            => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'show_in_nav_menus' => true,
            'show_tagcloud'     => true,
            'rewrite'           => array( 'slug' => $rewrite_slug ),
            'show_in_rest'      => true, // Enable Gutenberg editor support
        );
        register_taxonomy( $taxonomy_slug, $post_type, $args );
    }
}
