<?php
/**
 * Partial for Step 4 of the Mobile Device Sales form: Location.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public/partials
 * @since      1.0.0
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

// Assume $form_handler is passed from MDS_Public::display_form_step()
$step_data = $form_handler->get_step_data(4);

$address_description = isset($step_data['address_description']) ? $step_data['address_description'] : '';
// Coordinates would be stored here if map/geolocation was active
// $latitude = isset($step_data['latitude']) ? $step_data['latitude'] : '';
// $longitude = isset($step_data['longitude']) ? $step_data['longitude'] : '';
?>
<h4><?php esc_html_e( 'Step 4: Location Information', 'mobile-device-sales' ); ?></h4>

<div class="mds-form-field mds-map-placeholder">
    <label><?php esc_html_e( 'Select Location on Map', 'mobile-device-sales' ); ?></label>
    <div id="mds-map-integration-placeholder" style="height: 200px; background-color: #f0f0f0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
        <em><?php esc_html_e( 'Map integration will be available here soon.', 'mobile-device-sales' ); ?></em>
    </div>
    <button type="button" id="mds-get-current-location" class="button" style="margin-top: 10px;"><?php esc_html_e( 'Get Current Location (Future Feature)', 'mobile-device-sales' ); ?></button>
    <!-- Hidden fields for latitude and longitude if needed later -->
    <!-- <input type="hidden" name="mds_step_4_latitude" id="mds_step_4_latitude" value="<?php echo esc_attr($latitude); ?>"> -->
    <!-- <input type="hidden" name="mds_step_4_longitude" id="mds_step_4_longitude" value="<?php echo esc_attr($longitude); ?>"> -->
</div>

<div class="mds-form-field">
    <label for="mds_step_4_address_description"><?php esc_html_e( 'Additional Location Details / Pickup Instructions', 'mobile-device-sales' ); ?></label>
    <textarea name="mds_step_4_address_description" id="mds_step_4_address_description" rows="4" maxlength="500" placeholder="<?php esc_attr_e('e.g., Ring the bell twice, specify pickup window, etc.', 'mobile-device-sales'); ?>"><?php echo esc_textarea( $address_description ); ?></textarea>
    <p class="description"><?php esc_html_e( 'Provide any specific details about your location or preferred pickup arrangements.', 'mobile-device-sales' ); ?></p>
</div>
