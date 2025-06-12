<?php
/**
 * Partial for Step 5 of the Mobile Device Sales form: Final Confirmation.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public/partials
 * @since      1.0.0
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

// Assume $form_handler is passed from MDS_Public::display_form_step()
$all_data = $form_handler->get_all_form_data();

$step1_data = isset($all_data[1]) ? $all_data[1] : array();
$step2_data = isset($all_data[2]) ? $all_data[2] : array();
$step3_data = isset($all_data[3]) ? $all_data[3] : array();
$step4_data = isset($all_data[4]) ? $all_data[4] : array();
$step5_data = $form_handler->get_step_data(5); // For terms checkbox state

$terms_agreed = isset($step5_data['terms_agree']) ? $step5_data['terms_agree'] : '';

// Helper function to display term name from ID
if (!function_exists('mds_get_term_name_by_id')) {
    function mds_get_term_name_by_id($term_id, $taxonomy) {
        if (empty($term_id)) return __('N/A', 'mobile-device-sales');
        $term = get_term($term_id, $taxonomy);
        if (is_wp_error($term) || !$term) {
            return __('Invalid Term', 'mobile-device-sales');
        }
        return esc_html($term->name);
    }
}


?>
<h4><?php esc_html_e( 'Step 5: Final Confirmation', 'mobile-device-sales' ); ?></h4>

<div class="mds-confirmation-summary">
    <h5><?php esc_html_e( 'Device Selection (Step 1)', 'mobile-device-sales' ); ?></h5>
    <p><strong><?php esc_html_e( 'Device Type:', 'mobile-device-sales' ); ?></strong> <?php echo mds_get_term_name_by_id(isset($step1_data['device_type']) ? $step1_data['device_type'] : '', 'device_type'); ?></p>
    <p><strong><?php esc_html_e( 'Brand:', 'mobile-device-sales' ); ?></strong> <?php echo mds_get_term_name_by_id(isset($step1_data['device_brand']) ? $step1_data['device_brand'] : '', 'device_brand'); ?></p>
    <p><strong><?php esc_html_e( 'Model:', 'mobile-device-sales' ); ?></strong> <?php echo mds_get_term_name_by_id(isset($step1_data['device_model']) ? $step1_data['device_model'] : '', 'device_model'); ?></p>
    <p><strong><?php esc_html_e( 'Condition:', 'mobile-device-sales' ); ?></strong> <?php echo mds_get_term_name_by_id(isset($step1_data['device_condition']) ? $step1_data['device_condition'] : '', 'device_condition'); ?></p>

    <h5><?php esc_html_e( 'Contact Information (Step 2)', 'mobile-device-sales' ); ?></h5>
    <p><strong><?php esc_html_e( 'Full Name:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step2_data['full_name']) ? $step2_data['full_name'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'Mobile Number:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step2_data['mobile_number']) ? $step2_data['mobile_number'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'Email:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step2_data['email']) ? $step2_data['email'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'Address:', 'mobile-device-sales' ); ?></strong> <?php echo nl2br(esc_html(isset($step2_data['address']) ? $step2_data['address'] : 'N/A')); ?></p>

    <h5><?php esc_html_e( 'Device Details (Step 3)', 'mobile-device-sales' ); ?></h5>
    <p><strong><?php esc_html_e( 'Color:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step3_data['color']) ? $step3_data['color'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'Internal Storage:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step3_data['storage']) ? $step3_data['storage'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'RAM:', 'mobile-device-sales' ); ?></strong> <?php echo esc_html(isset($step3_data['ram']) ? $step3_data['ram'] : 'N/A'); ?></p>
    <p><strong><?php esc_html_e( 'Description:', 'mobile-device-sales' ); ?></strong> <?php echo nl2br(esc_html(isset($step3_data['description']) ? $step3_data['description'] : 'N/A')); ?></p>
    <div><strong><?php esc_html_e( 'Uploaded Images:', 'mobile-device-sales' ); ?></strong>
        <ul class="mds-summary-image-list" style="list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 10px;">
            <?php
            $image_urls_json = isset($step3_data['images_data']) ? stripslashes($step3_data['images_data']) : '[]';
            $image_urls = json_decode($image_urls_json, true);
            if (!empty($image_urls) && json_last_error() === JSON_ERROR_NONE) {
                foreach ($image_urls as $url) {
                    echo '<li style="border: 1px solid #eee; padding: 5px;"><img src="' . esc_url($url) . '" width="80" height="80" style="object-fit: cover;" alt="' . esc_attr__('Uploaded image preview', 'mobile-device-sales') . '"></li>';
                }
            } else {
                echo '<li>' . esc_html__('No images uploaded.', 'mobile-device-sales') . '</li>';
            }
            ?>
        </ul>
    </div>

    <h5><?php esc_html_e( 'Location Information (Step 4)', 'mobile-device-sales' ); ?></h5>
    <p><strong><?php esc_html_e( 'Additional Details/Pickup Instructions:', 'mobile-device-sales' ); ?></strong> <?php echo nl2br(esc_html(isset($step4_data['address_description']) ? $step4_data['address_description'] : 'N/A')); ?></p>
</div>

<div class="mds-form-field">
    <label for="mds_step_5_terms_agree">
        <input type="checkbox" name="mds_step_5_terms_agree" id="mds_step_5_terms_agree" value="yes" <?php checked( $terms_agreed, 'yes' ); ?> required>
        <?php
        $terms_page_id = get_option('wp_page_for_privacy_policy'); // Default example
        // In a real plugin, you'd have a setting for the Terms & Conditions page ID
        // $terms_page_id = get_option('mds_terms_and_conditions_page_id');
        $terms_link = $terms_page_id ? get_permalink($terms_page_id) : '#';
        printf( wp_kses_post( __( 'I have read and agree to the <a href="%s" target="_blank">Terms and Conditions</a>.', 'mobile-device-sales' ) ), esc_url( $terms_link ) );
        ?>
         <span class="required">*</span>
    </label>
</div>
