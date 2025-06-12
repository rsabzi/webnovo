<?php
/**
 * Partial for Step 3 of the Mobile Device Sales form: Device Details.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public/partials
 * @since      1.0.0
 */

if ( ! defined( 'WPINC' ) ) {
    die;
}

// Assume $form_handler is passed from MDS_Public::display_form_step()
$step_data = $form_handler->get_step_data(3);

$color = isset($step_data['color']) ? $step_data['color'] : '';
$storage = isset($step_data['storage']) ? $step_data['storage'] : '';
$ram = isset($step_data['ram']) ? $step_data['ram'] : '';
$description = isset($step_data['description']) ? $step_data['description'] : '';
// Image data will be handled differently, likely stored as an array of attachment IDs or URLs
$uploaded_images_json = isset($step_data['images_data']) ? stripslashes($step_data['images_data']) : '[]';
$uploaded_images = json_decode($uploaded_images_json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    $uploaded_images = array(); // Default to empty if JSON is invalid
}

?>
<h4><?php esc_html_e( 'Step 3: Device Details', 'mobile-device-sales' ); ?></h4>

<div class="mds-form-field">
    <label for="mds_step_3_color"><?php esc_html_e( 'Color', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="text" name="mds_step_3_color" id="mds_step_3_color" value="<?php echo esc_attr( $color ); ?>" required maxlength="50">
</div>

<div class="mds-form-field">
    <label for="mds_step_3_storage"><?php esc_html_e( 'Internal Storage (e.g., 128GB, 256GB)', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="text" name="mds_step_3_storage" id="mds_step_3_storage" value="<?php echo esc_attr( $storage ); ?>" required maxlength="50" placeholder="<?php esc_attr_e('e.g., 256GB', 'mobile-device-sales'); ?>">
</div>

<div class="mds-form-field">
    <label for="mds_step_3_ram"><?php esc_html_e( 'RAM (e.g., 8GB, 16GB)', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <input type="text" name="mds_step_3_ram" id="mds_step_3_ram" value="<?php echo esc_attr( $ram ); ?>" required maxlength="50" placeholder="<?php esc_attr_e('e.g., 8GB', 'mobile-device-sales'); ?>">
</div>

<div class="mds-form-field">
    <label for="mds_step_3_description"><?php esc_html_e( 'Additional Description', 'mobile-device-sales' ); ?></label>
    <textarea name="mds_step_3_description" id="mds_step_3_description" rows="4" maxlength="500"><?php echo esc_textarea( $description ); ?></textarea>
</div>

<div class="mds-form-field mds-image-upload-field">
    <label><?php esc_html_e( 'Upload Images (Max 5)', 'mobile-device-sales' ); ?></label>
    <div id="mds-image-upload-container">
        <button type="button" id="mds-upload-image-button" class="button"><?php esc_html_e( 'Select Images', 'mobile-device-sales' ); ?></button>
        <ul id="mds-image-preview-list">
            <?php
            if (!empty($uploaded_images)) {
                foreach($uploaded_images as $image_url) { // Assuming URLs are stored
                    echo '<li><img src="' . esc_url($image_url) . '" width="100" /> <button type="button" class="mds-remove-image" data-imageurl="'.esc_attr($image_url).'">Remove</button></li>';
                }
            }
            ?>
        </ul>
         <input type="hidden" name="mds_step_3_images_data" id="mds_step_3_images_data" value="<?php echo esc_attr(json_encode($uploaded_images)); ?>">
    </div>
    <p class="description"><?php esc_html_e( 'You can upload up to 5 images. Allowed file types: JPG, PNG, GIF. Max file size: 2MB.', 'mobile-device-sales' ); ?></p>
</div>
