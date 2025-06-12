<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for the admin area.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/admin
 * @author     Your Name <email@example.com>
 */
class MDS_Admin {

    private $plugin_name;
    private $version;

    public function __construct( $plugin_name, $version ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;

        // CPT list table customization
        add_filter( 'manage_edit-device_order_columns', array( $this, 'set_custom_edit_device_order_columns' ) );
        add_action( 'manage_device_order_posts_custom_column', array( $this, 'custom_device_order_column_content' ), 10, 2 );
        add_filter( 'manage_edit-device_order_sortable_columns', array( $this, 'set_custom_device_order_sortable_columns' ) );
        add_action( 'pre_get_posts', array( $this, 'custom_device_order_pre_get_posts' ) );
        add_action( 'restrict_manage_posts', array( $this, 'add_custom_device_order_filters' ) );
        add_action( 'pre_get_posts', array( $this, 'apply_custom_device_order_filters_query' ) );

        // Meta boxes
        add_action( 'add_meta_boxes_device_order', array( $this, 'add_order_meta_boxes' ) );
        add_action( 'save_post_device_order', array( $this, 'save_order_meta_data' ), 10, 2 );
    }

    public function enqueue_styles() {
        wp_enqueue_style( $this->plugin_name . '_admin_style', MDS_PLUGIN_URL . 'assets/css/admin-style.css', array(), $this->version, 'all' );
    }

    public function enqueue_scripts() {
        wp_enqueue_script( $this->plugin_name . '_admin_script', MDS_PLUGIN_URL . 'assets/js/admin-script.js', array( 'jquery' ), $this->version, false );
    }

    public function add_admin_menu() {
        add_menu_page(__( 'Mobile Device Sales', 'mobile-device-sales' ),__( 'Device Sales', 'mobile-device-sales' ), 'manage_options', $this->plugin_name, array( $this, 'display_dashboard_page' ), 'dashicons-smartphone', 25);
        add_submenu_page($this->plugin_name, __( 'Dashboard', 'mobile-device-sales' ), __( 'Dashboard', 'mobile-device-sales' ), 'manage_options', $this->plugin_name, array( $this, 'display_dashboard_page' ));
        add_submenu_page($this->plugin_name, __( 'Orders', 'mobile-device-sales' ), __( 'Siparişler', 'mobile-device-sales' ), 'edit_posts', 'edit.php?post_type=device_order');
        add_submenu_page($this->plugin_name, __( 'Device Types', 'mobile-device-sales' ), __( 'Cihaz Türleri', 'mobile-device-sales' ), 'manage_categories', 'edit-tags.php?taxonomy=device_type&post_type=device_order');
        add_submenu_page($this->plugin_name, __( 'Brands', 'mobile-device-sales' ), __( 'Markalar', 'mobile-device-sales' ), 'manage_categories', 'edit-tags.php?taxonomy=device_brand&post_type=device_order');
        add_submenu_page($this->plugin_name, __( 'Models', 'mobile-device-sales' ), __( 'Modeller', 'mobile-device-sales' ), 'manage_categories', 'edit-tags.php?taxonomy=device_model&post_type=device_order');
        add_submenu_page($this->plugin_name, __( 'Conditions', 'mobile-device-sales' ), __( 'Durumlar', 'mobile-device-sales' ), 'manage_categories', 'edit-tags.php?taxonomy=device_condition&post_type=device_order');
        add_submenu_page($this->plugin_name, __( 'Settings', 'mobile-device-sales' ), __( 'Ayarlar', 'mobile-device-sales' ), 'manage_options', $this->plugin_name . '-settings', array( $this, 'display_settings_page' ));
    }

    public function display_dashboard_page() { /* ... */ }
    public function display_settings_page() { /* ... */ }
    public function set_custom_edit_device_order_columns( $columns ) { /* ... as before ... */
        $new_columns = array();
        $new_columns['cb'] = $columns['cb'];
        $new_columns['title'] = __( 'Order ID / Title', 'mobile-device-sales' );
        $new_columns['mds_customer_name'] = __( 'Customer Name', 'mobile-device-sales' );
        $new_columns['mds_device_type'] = __( 'Device Type', 'mobile-device-sales' );
        $new_columns['mds_order_status'] = __( 'Order Status', 'mobile-device-sales' );
        $new_columns['date'] = $columns['date'];
        return $new_columns;
    }
    public function custom_device_order_column_content( $column, $post_id ) { /* ... as before ... */
        switch ( $column ) {
            case 'mds_customer_name':
                $customer_name = get_post_meta( $post_id, '_mds_customer_full_name', true );
                echo esc_html( $customer_name ?: 'N/A' );
                break;
            case 'mds_device_type':
                $terms = get_the_terms( $post_id, 'device_type' );
                if ( !empty( $terms ) && !is_wp_error( $terms ) ) {
                    $term_names = array_map(function($term) { return esc_html($term->name); }, $terms);
                    echo implode( ', ', $term_names );
                } else {
                    echo 'N/A';
                }
                break;
            case 'mds_order_status':
                $status_object = get_post_status_object( get_post_status( $post_id ) );
                echo esc_html( $status_object ? $status_object->label : 'N/A' );
                break;
        }
    }
    public function set_custom_device_order_sortable_columns( $columns ) { /* ... as before ... */
        $columns['mds_customer_name'] = 'mds_customer_name_sort';
        $columns['mds_order_status'] = 'post_status';
        return $columns;
    }
    public function custom_device_order_pre_get_posts( $query ) { /* ... as before ... */
        if ( ! is_admin() || ! $query->is_main_query() ) return;
        if ( $query->get('post_type') === 'device_order' ) {
            $orderby = $query->get( 'orderby' );
            if ( 'mds_customer_name_sort' === $orderby ) {
                $query->set( 'meta_key', '_mds_customer_full_name' );
                $query->set( 'orderby', 'meta_value' );
            }
        }
     }
    public function add_custom_device_order_filters( $post_type ) { /* ... as before ... */
        if ( 'device_order' === $post_type ) {
            $current_status_filter = isset( $_GET['mds_order_status_filter'] ) ? sanitize_text_field( $_GET['mds_order_status_filter'] ) : '';
            echo '<select name="mds_order_status_filter" id="mds_order_status_filter">';
            echo '<option value="">' . __( 'All Order Statuses', 'mobile-device-sales' ) . '</option>';
            $all_statuses = get_post_stati(array(), 'objects');
            $custom_statuses = MDS_Order::get_custom_statuses_array();
            foreach ( $all_statuses as $status_key => $status_obj ) {
                if ( isset($custom_statuses[$status_key]) || in_array($status_key, ['pending', 'draft', 'trash'])) {
                    if ($status_obj->show_in_admin_status_list) {
                        echo '<option value="' . esc_attr( $status_key ) . '"' . selected( $current_status_filter, $status_key, false ) . '>' . esc_html( $status_obj->label ) . '</option>';
                    }
                }
            }
            echo '</select>';
        }
    }
    public function apply_custom_device_order_filters_query( $query ) { /* ... as before ... */
        if ( ! is_admin() || ! $query->is_main_query() ) return;
        if ( $query->get('post_type') === 'device_order' && !empty($_GET['mds_order_status_filter']) ) {
            $status_filter = sanitize_text_field($_GET['mds_order_status_filter']);
            $query->set('post_status', $status_filter);
        }
    }

    public function add_order_meta_boxes() {
        add_meta_box('mds_customer_info_metabox', __( 'Customer Information', 'mobile-device-sales' ), array( $this, 'render_customer_info_metabox' ), 'device_order', 'normal', 'high');
        add_meta_box('mds_device_submitted_details_metabox', __( 'Device Submitted Details', 'mobile-device-sales' ), array( $this, 'render_device_details_metabox' ), 'device_order', 'normal', 'high');
        add_meta_box('mds_uploaded_images_metabox', __( 'Uploaded Images', 'mobile-device-sales' ), array( $this, 'render_uploaded_images_metabox' ), 'device_order', 'normal', 'default');
        add_meta_box('mds_location_pickup_metabox', __( 'Location / Pickup Details', 'mobile-device-sales' ), array( $this, 'render_location_pickup_metabox' ), 'device_order', 'normal', 'default');
        add_meta_box('mds_order_status_actions_metabox', __( 'Order Status & Actions', 'mobile-device-sales' ), array( $this, 'render_order_status_actions_metabox' ), 'device_order', 'side', 'core');
    }

    public function render_customer_info_metabox( $post ) {
        $fields = array(
            '_mds_customer_full_name' => __( 'Full Name:', 'mobile-device-sales' ),
            '_mds_customer_mobile'    => __( 'Mobile Number:', 'mobile-device-sales' ),
            '_mds_customer_email'     => __( 'Email:', 'mobile-device-sales' ),
            '_mds_customer_address'   => __( 'Address:', 'mobile-device-sales' ),
        );
        echo '<table class="form-table"><tbody>';
        foreach ( $fields as $meta_key => $label ) {
            $value = get_post_meta( $post->ID, $meta_key, true );
            echo '<tr><th><label>' . esc_html( $label ) . '</label></th><td>' . ( $meta_key === '_mds_customer_address' ? nl2br( esc_html( $value ?: 'N/A' ) ) : esc_html( $value ?: 'N/A' ) ) . '</td></tr>';
        }
        echo '</tbody></table>';
    }

    public function render_device_details_metabox( $post ) {
        $taxonomies = array(
            'device_type' => __( 'Device Type:', 'mobile-device-sales' ), 'device_brand' => __( 'Brand:', 'mobile-device-sales' ),
            'device_model' => __( 'Model:', 'mobile-device-sales' ), 'device_condition' => __( 'Condition:', 'mobile-device-sales' ),
        );
        echo '<h4>' . __( 'Device Classification', 'mobile-device-sales' ) . '</h4><table class="form-table"><tbody>';
        foreach ( $taxonomies as $tax_slug => $label ) {
            $terms = get_the_terms( $post->ID, $tax_slug );
            $term_display = 'N/A';
            if ( !empty( $terms ) && !is_wp_error( $terms ) ) {
                $term_names = array_map( function($term) { return esc_html($term->name); }, $terms );
                $term_display = implode( ', ', $term_names );
            }
            echo '<tr><th><label>' . esc_html( $label ) . '</label></th><td>' . $term_display . '</td></tr>';
        }
        echo '</tbody></table><hr><h4>' . __( 'Specifics & Description', 'mobile-device-sales' ) . '</h4>';
        $meta_fields = array(
            '_mds_device_color' => __( 'Color:', 'mobile-device-sales' ), '_mds_device_storage' => __( 'Storage:', 'mobile-device-sales' ),
            '_mds_device_ram' => __( 'RAM:', 'mobile-device-sales' ), '_mds_device_description' => __( 'Customer Description:', 'mobile-device-sales' ),
        );
        echo '<table class="form-table"><tbody>';
        foreach ( $meta_fields as $meta_key => $label ) {
            $value = get_post_meta( $post->ID, $meta_key, true );
            echo '<tr><th><label>' . esc_html( $label ) . '</label></th><td>' . ( $meta_key === '_mds_device_description' ? nl2br( esc_html( $value ?: 'N/A' ) ) : esc_html( $value ?: 'N/A' ) ) . '</td></tr>';
        }
        echo '</tbody></table>';
    }

    public function render_uploaded_images_metabox( $post ) {
        $image_urls = get_post_meta( $post->ID, '_mds_device_image_urls', true );
        if ( !empty( $image_urls ) && is_array( $image_urls ) ) {
            echo '<ul style="display:flex; flex-wrap:wrap; gap:10px; padding:0; list-style:none;">';
            foreach ( $image_urls as $url ) {
                echo '<li style="border:1px solid #ddd; padding:5px;"><img src="' . esc_url( $url ) . '" style="max-width:150px; max-height:150px; display:block;"></li>';
            }
            echo '</ul>';
        } else {
            echo '<p>' . __( 'No images were uploaded with this order.', 'mobile-device-sales' ) . '</p>';
        }
    }

    public function render_location_pickup_metabox( $post ) {
        $location_details = get_post_meta( $post->ID, '_mds_location_details', true );
        echo '<p>' . nl2br( esc_html( $location_details ?: 'N/A' ) ) . '</p>';
    }

    public function render_order_status_actions_metabox( $post ) {
        $current_status = get_post_status( $post->ID );
        $status_object = get_post_status_object( $current_status );
        $statuses = MDS_Order::get_custom_statuses_array();

        wp_nonce_field( 'mds_update_order_status_action', 'mds_order_status_nonce' );
        echo '<p><strong>' . __( 'Current Status:', 'mobile-device-sales' ) . '</strong> ' . esc_html( $status_object ? $status_object->label : $current_status ) . '</p>';
        echo '<label for="mds_order_status_dropdown">' . __( 'Change Status:', 'mobile-device-sales' ) . '</label><br>';
        echo '<select name="mds_order_status_dropdown" id="mds_order_status_dropdown" style="width:100%; margin-bottom:5px;">';
        echo '<option value="">-- ' . __('Select New Status', 'mobile-device-sales') . ' --</option>';
        foreach ( $statuses as $status_key => $label ) {
            echo '<option value="' . esc_attr( $status_key ) . '" ' . selected( $current_status, $status_key, false ) . '>' . esc_html( $label ) . '</option>';
        }
        echo '</select>';
        echo '<div style="margin-top:10px;">';
        submit_button( __( 'Update Status', 'mobile-device-sales' ), 'secondary', 'mds_update_status_button', false, array('id' => 'mds-update-status-button-id') ); // Added ID for potential JS interaction
        echo '</div>';
        echo '<p><small>' . __('Note: Status changes are saved when you click "Update Status". Other post field changes require clicking the main "Update" button for the post.', 'mobile-device-sales') . '</small></p>';
    }

    public function save_order_meta_data( $post_id, $post ) {
        if ( !isset( $_POST['mds_order_status_nonce'] ) || !wp_verify_nonce( sanitize_key($_POST['mds_order_status_nonce']), 'mds_update_order_status_action' ) ) {
            // This nonce is primarily for the status update button. If other fields were editable, they'd need their own.
            // If only status is being updated via its own button, we might only proceed if that button is clicked.
            // For now, if the nonce fails, we won't process the status update.
            // return $post_id; // Removed to allow other save_post actions to run if this is not a status update context.
        }

        if ( !current_user_can( 'edit_post', $post_id ) ) return $post_id;
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return $post_id;
        if ( $post->post_type !== 'device_order') return $post_id;


        // Check if our status update button was clicked and status is set
        // The button name is 'mds_update_status_button'
        if ( isset( $_POST['mds_update_status_button'] ) && !empty( $_POST['mds_order_status_dropdown'] ) ) {
            $new_status = sanitize_text_field( $_POST['mds_order_status_dropdown'] );
            $allowed_statuses = array_keys(MDS_Order::get_custom_statuses_array());

            if ( in_array( $new_status, $allowed_statuses ) && $new_status !== get_post_status($post_id) ) {
                remove_action( 'save_post_device_order', array( $this, 'save_order_meta_data' ), 10 );
                wp_update_post( array( 'ID' => $post_id, 'post_status' => $new_status ) );
                add_action( 'save_post_device_order', array( $this, 'save_order_meta_data' ), 10, 2 );

                // Optional: Add an admin notice for status update success
                add_action('admin_notices', function() {
                    echo '<div class="notice notice-success is-dismissible"><p>' . __('Order status updated successfully.', 'mobile-device-sales') . '</p></div>';
                });
            }
        }
        // Add saving for other editable fields here if any were added
    }
}
