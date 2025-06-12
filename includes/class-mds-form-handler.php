<?php
/**
 * Handles processing of the multi-step device submission form.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 */

/**
 * Handles form submissions, validation, and data saving for the multi-step form.
 *
 * @since      1.0.0
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 * @author     Your Name <email@example.com>
 */
class MDS_Form_Handler {

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        // Hooks for admin-post actions are added in MDS_Main
    }

    /**
     * Validates a specific step of the form.
     *
     * @since 1.0.0
     * @param int   $step The step number to validate.
     * @param array $data The data submitted for that step.
     * @return bool|WP_Error True if valid, WP_Error otherwise.
     */
    public function validate_step( $step, $data ) {
        $errors = new WP_Error();

        if ( $step == 1 ) {
            if ( empty( $data['device_type'] ) ) {
                $errors->add( 'device_type_required', __( 'Device Type is required.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['device_brand'] ) ) {
                $errors->add( 'device_brand_required', __( 'Brand is required.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['device_model'] ) ) {
                $errors->add( 'device_model_required', __( 'Model is required.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['device_condition'] ) ) {
                $errors->add( 'device_condition_required', __( 'Condition is required.', 'mobile-device-sales' ) );
            }
        } elseif ( $step == 2 ) {
            if ( empty( $data['full_name'] ) ) {
                $errors->add( 'full_name_required', __( 'Name and Surname are required.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['full_name'] ) > 100 ) {
                $errors->add( 'full_name_toolong', __( 'Name and Surname must be less than 100 characters.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['mobile_number'] ) ) {
                $errors->add( 'mobile_number_required', __( 'Mobile Number is required.', 'mobile-device-sales' ) );
            } elseif ( ! preg_match( '/^[0-9\s\-+()]*$/', $data['mobile_number'] ) ) {
                $errors->add( 'mobile_number_invalid', __( 'Mobile Number contains invalid characters.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['mobile_number'] ) < 7 || strlen( $data['mobile_number'] ) > 20 ) {
                 $errors->add( 'mobile_number_length', __( 'Mobile Number seems to be of incorrect length.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['email'] ) ) {
                $errors->add( 'email_required', __( 'Email is required.', 'mobile-device-sales' ) );
            } elseif ( ! is_email( $data['email'] ) ) {
                $errors->add( 'email_invalid', __( 'Please enter a valid Email address.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['email'] ) > 100 ) {
                $errors->add( 'email_toolong', __( 'Email must be less than 100 characters.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['address'] ) ) {
                $errors->add( 'address_required', __( 'Full Address is required.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['address'] ) > 255 ) {
                $errors->add( 'address_toolong', __( 'Address must be less than 255 characters.', 'mobile-device-sales' ) );
            }
        } elseif ( $step == 3 ) {
            if ( empty( $data['color'] ) ) {
                $errors->add( 'color_required', __( 'Color is required.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['color'] ) > 50 ) {
                $errors->add( 'color_toolong', __( 'Color must be less than 50 characters.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['storage'] ) ) {
                $errors->add( 'storage_required', __( 'Internal Storage is required.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['storage'] ) > 50 ) {
                $errors->add( 'storage_toolong', __( 'Internal Storage must be less than 50 characters.', 'mobile-device-sales' ) );
            }
            if ( empty( $data['ram'] ) ) {
                $errors->add( 'ram_required', __( 'RAM is required.', 'mobile-device-sales' ) );
            } elseif ( strlen( $data['ram'] ) > 50 ) {
                $errors->add( 'ram_toolong', __( 'RAM must be less than 50 characters.', 'mobile-device-sales' ) );
            }
            if ( !empty( $data['description'] ) && strlen( $data['description'] ) > 500 ) {
                $errors->add( 'description_toolong', __( 'Description must be less than 500 characters.', 'mobile-device-sales' ) );
            }
            $image_data_json = isset($data['images_data']) ? stripslashes($data['images_data']) : '[]';
            $image_urls = json_decode($image_data_json, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $image_urls = array();
            }
            if (count($image_urls) > 5) {
                $errors->add('images_max_count', __('You can upload a maximum of 5 images.', 'mobile-device-sales'));
            }
        } elseif ( $step == 4 ) {
            if ( !empty( $data['address_description'] ) && strlen( $data['address_description'] ) > 500 ) {
                $errors->add( 'address_description_toolong', __( 'Location Details / Pickup Instructions must be less than 500 characters.', 'mobile-device-sales' ) );
            }
        } elseif ( $step == 5 ) {
            if ( empty( $data['terms_agree'] ) || $data['terms_agree'] !== 'yes' ) {
                $errors->add( 'terms_required', __( 'You must agree to the Terms and Conditions to proceed.', 'mobile-device-sales' ) );
            }
        }

        if ( ! empty( $errors->get_error_codes() ) ) {
            return $errors;
        }
        return true;
    }

    public function save_step_data( $step, $data ) {
        if ( session_status() == PHP_SESSION_NONE ) {
            session_start();
        }
        $_SESSION['mds_form_step_data'][$step] = $data;
    }

    public function get_step_data( $step ) {
        if ( session_status() == PHP_SESSION_NONE ) {
            session_start();
        }
        return isset( $_SESSION['mds_form_step_data'][$step] ) ? $_SESSION['mds_form_step_data'][$step] : null;
    }

    public function get_all_form_data() {
        if ( session_status() == PHP_SESSION_NONE ) {
            session_start();
        }
        return isset( $_SESSION['mds_form_step_data'] ) ? $_SESSION['mds_form_step_data'] : null;
    }

    public function clear_form_data() {
        if ( session_status() == PHP_SESSION_NONE ) {
            session_start();
        }
        unset( $_SESSION['mds_form_step_data'] );
    }

    public function process_final_submission() {
        if ( ! isset( $_POST['submit_device_order_nonce'] ) || ! wp_verify_nonce( sanitize_key($_POST['submit_device_order_nonce']), 'submit_device_order_action' ) ) {
            wp_die( __( 'Security check failed. Please try submitting the form again.', 'mobile-device-sales' ) );
            return;
        }

        $all_data = $this->get_all_form_data();
        if ( empty( $all_data ) ) {
            wp_die(__( 'Error: No form data found or session expired. Please fill out the form again.', 'mobile-device-sales' ));
            return;
        }

        if ( empty( $_POST['mds_step_5_terms_agree'] ) || $_POST['mds_step_5_terms_agree'] !== 'yes' ) {
            $redirect_url = add_query_arg( array('mds_step' => 5, 'mds_error' => 'terms_required'), wp_get_referer() ?: home_url() );
            wp_redirect( esc_url_raw( $redirect_url ) );
            exit;
        }

        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['mds_form_step_data'][5])) $_SESSION['mds_form_step_data'][5] = array();
        $_SESSION['mds_form_step_data'][5]['terms_agree'] = 'yes';
        $all_data = $this->get_all_form_data();

        $step1_data = isset($all_data[1]) ? $all_data[1] : array();
        $step2_data = isset($all_data[2]) ? $all_data[2] : array();
        $step3_data = isset($all_data[3]) ? $all_data[3] : array();
        $step4_data = isset($all_data[4]) ? $all_data[4] : array();

        $customer_name = !empty($step2_data['full_name']) ? $step2_data['full_name'] : 'Guest';
        $post_title = sprintf( 'Order - %s - %s', $customer_name, date_i18n( 'Y-m-d H:i' ) );

        $post_content = "Order Details:\n\n";
        $post_content .= "Device Type: " . (isset($step1_data['device_type']) && !empty($step1_data['device_type']) ? mds_get_term_name_by_id_static($step1_data['device_type'], 'device_type') : 'N/A') . "\n";
        $post_content .= "Brand: " . (isset($step1_data['device_brand']) && !empty($step1_data['device_brand']) ? mds_get_term_name_by_id_static($step1_data['device_brand'], 'device_brand') : 'N/A') . "\n";
        $post_content .= "Model: " . (isset($step1_data['device_model']) && !empty($step1_data['device_model']) ? mds_get_term_name_by_id_static($step1_data['device_model'], 'device_model') : 'N/A') . "\n";
        $post_content .= "\n---Contact---\n";
        $post_content .= "Name: " . $customer_name . "\n";
        $post_content .= "Email: " . (isset($step2_data['email']) ? $step2_data['email'] : 'N/A') . "\n";

        $post_author = get_current_user_id();

        $post_data = array(
            'post_type'    => MDS_Order::POST_TYPE,
            'post_title'   => sanitize_text_field( $post_title ),
            'post_content' => sanitize_textarea_field( $post_content ),
            'post_status'  => 'mds-pending-approval',
            'post_author'  => $post_author,
        );

        $order_id = wp_insert_post( $post_data, true ); // Pass true to return WP_Error on failure

        if ( is_wp_error( $order_id ) ) {
            wp_die( __( 'Error creating order: ', 'mobile-device-sales' ) . $order_id->get_error_message() );
            return;
        }

        if ( !empty($step1_data['device_type']) ) wp_set_object_terms( $order_id, intval($step1_data['device_type']), 'device_type', false );
        if ( !empty($step1_data['device_brand']) ) wp_set_object_terms( $order_id, intval($step1_data['device_brand']), 'device_brand', false );
        if ( !empty($step1_data['device_model']) ) wp_set_object_terms( $order_id, intval($step1_data['device_model']), 'device_model', false );
        if ( !empty($step1_data['device_condition']) ) wp_set_object_terms( $order_id, intval($step1_data['device_condition']), 'device_condition', false );

        $meta_fields = array(
            '_mds_customer_full_name' => isset($step2_data['full_name']) ? sanitize_text_field($step2_data['full_name']) : '',
            '_mds_customer_mobile'    => isset($step2_data['mobile_number']) ? sanitize_text_field($step2_data['mobile_number']) : '',
            '_mds_customer_email'     => isset($step2_data['email']) ? sanitize_email($step2_data['email']) : '',
            '_mds_customer_address'   => isset($step2_data['address']) ? sanitize_textarea_field($step2_data['address']) : '',
            '_mds_device_color'       => isset($step3_data['color']) ? sanitize_text_field($step3_data['color']) : '',
            '_mds_device_storage'     => isset($step3_data['storage']) ? sanitize_text_field($step3_data['storage']) : '',
            '_mds_device_ram'         => isset($step3_data['ram']) ? sanitize_text_field($step3_data['ram']) : '',
            '_mds_device_description' => isset($step3_data['description']) ? sanitize_textarea_field($step3_data['description']) : '',
            '_mds_location_details'   => isset($step4_data['address_description']) ? sanitize_textarea_field($step4_data['address_description']) : '',
            '_mds_terms_agreed'       => 'yes',
        );

        $image_urls_json = isset($step3_data['images_data']) ? stripslashes($step3_data['images_data']) : '[]';
        $image_urls = json_decode($image_urls_json, true);
        if (json_last_error() === JSON_ERROR_NONE && !empty($image_urls)) {
            $meta_fields['_mds_device_image_urls'] = array_map('esc_url_raw', $image_urls);
        }

        foreach ( $meta_fields as $key => $value ) {
            update_post_meta( $order_id, $key, $value );
        }
        update_post_meta($order_id, '_mds_order_id', $order_id);

        $this->clear_form_data();

        // Create a basic thank you page if it doesn't exist.
        $thank_you_page_slug = 'order-submitted-thank-you';
        $thank_you_page = get_page_by_path( $thank_you_page_slug, OBJECT, 'page' );
        if ( ! $thank_you_page ) {
            $page_id = wp_insert_post( array(
                'post_title'    => 'Order Submitted',
                'post_name'     => $thank_you_page_slug,
                'post_content'  => 'Thank you for your order! Your order ID is [mds_order_id]. We will contact you shortly.',
                'post_status'   => 'publish',
                'post_type'     => 'page',
            ) );
            if ($page_id && !is_wp_error($page_id)) {
                 $thank_you_page = get_post($page_id);
            }
        }
        $redirect_url = $thank_you_page ? get_permalink( $thank_you_page->ID ) : home_url('/');
        $redirect_url = add_query_arg( array('mds_order_id' => $order_id, 'mds_status' => 'success'),  esc_url_raw($redirect_url) );

        wp_redirect( $redirect_url );
        exit;
    }
}

// Helper function, if not available in the context of partials, define it here or ensure it's loaded.
if (!function_exists('mds_get_term_name_by_id_static')) {
    function mds_get_term_name_by_id_static($term_id, $taxonomy) {
        if (empty($term_id)) return __('N/A', 'mobile-device-sales');
        $term = get_term($term_id, $taxonomy);
        if (is_wp_error($term) || !$term) {
            return __('Invalid Term', 'mobile-device-sales');
        }
        return esc_html($term->name);
    }
}
