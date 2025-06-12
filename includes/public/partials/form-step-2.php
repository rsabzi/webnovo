<?php
/**
 * Partial for Step 2 of the Mobile Device Sales form: Contact Information.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public/partials
 * @since      1.0.0
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

// Assume $form_handler is passed from MDS_Public::display_form_step()
$step_data = $form_handler->get_step_data(2);

$full_name = isset($step_data['full_name']) ? $step_data['full_name'] : '';
$mobile_number = isset($step_data['mobile_number']) ? $step_data['mobile_number'] : '';
$email = isset($step_data['email']) ? $step_data['email'] : '';
$address = isset($step_data['address']) ? $step_data['address'] : '';

?>
<h4><?php esc_html_e( 'Step 2: Contact Information', 'mobile-device-sales' ); ?></h4>

<div class="mds-form-field">
    <label for="mds_step_2_full_name"><?php esc_html_e( 'Name and Surname', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="text" name="mds_step_2_full_name" id="mds_step_2_full_name" value="<?php echo esc_attr( $full_name ); ?>" required maxlength="100">
</div>

<div class="mds-form-field">
    <label for="mds_step_2_mobile_number"><?php esc_html_e( 'Mobile Number', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="tel" name="mds_step_2_mobile_number" id="mds_step_2_mobile_number" value="<?php echo esc_attr( $mobile_number ); ?>" required pattern="[0-9\s\-+()]*" title="<?php esc_attr_e('Enter a valid phone number.', 'mobile-device-sales'); ?>">
</div>

<div class="mds-form-field">
    <label for="mds_step_2_email"><?php esc_html_e( 'Email', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="email" name="mds_step_2_email" id="mds_step_2_email" value="<?php echo esc_attr( $email ); ?>" required maxlength="100">
</div>

<div class="mds-form-field">
    <label for="mds_step_2_address"><?php esc_html_e( 'Full Address', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <textarea name="mds_step_2_address" id="mds_step_2_address" rows="4" required maxlength="255"><?php echo esc_textarea( $address ); ?></textarea>
</div>
