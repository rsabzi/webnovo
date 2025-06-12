<?php
/**
 * Partial for Step 1 of the Mobile Device Sales form.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public/partials
 * @since      1.0.0
 */

// Ensure this file is loaded within WordPress context
if ( ! defined( 'WPINC' ) ) {
    die;
}

// Assume $this is an instance of MDS_Public and $form_handler is available
// $form_handler = $this->form_handler; // This line would be in the calling method if $this context is an issue

$step_data = $this->form_handler->get_step_data(1);
$selected_device_type = isset($step_data['mds_step_1_device_type']) ? $step_data['mds_step_1_device_type'] : '';
$selected_device_brand = isset($step_data['mds_step_1_device_brand']) ? $step_data['mds_step_1_device_brand'] : '';
$selected_device_model = isset($step_data['mds_step_1_device_model']) ? $step_data['mds_step_1_device_model'] : '';
$selected_device_condition = isset($step_data['mds_step_1_device_condition']) ? $step_data['mds_step_1_device_condition'] : '';

// Get taxonomy terms
$device_types = get_terms( array( 'taxonomy' => 'device_type', 'hide_empty' => false ) );
$device_brands = get_terms( array( 'taxonomy' => 'device_brand', 'hide_empty' => false ) );
$device_models = get_terms( array( 'taxonomy' => 'device_model', 'hide_empty' => false ) );
$device_conditions = get_terms( array( 'taxonomy' => 'device_condition', 'hide_empty' => false ) );

?>
<h4><?php esc_html_e( 'Step 1: Select Device', 'mobile-device-sales' ); ?></h4>

<div class="mds-form-field">
    <label for="mds_device_type"><?php esc_html_e( 'Device Type', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <select name="mds_step_1_device_type" id="mds_device_type" required>
        <option value=""><?php esc_html_e( '-- Select Device Type --', 'mobile-device-sales' ); ?></option>
        <?php if ( ! is_wp_error( $device_types ) && ! empty( $device_types ) ) : ?>
            <?php foreach ( $device_types as $term ) : ?>
                <option value="<?php echo esc_attr( $term->term_id ); ?>" <?php selected( $selected_device_type, $term->term_id ); ?>>
                    <?php echo esc_html( $term->name ); ?>
                </option>
            <?php endforeach; ?>
        <?php endif; ?>
    </select>
</div>

<div class="mds-form-field">
    <label for="mds_device_brand"><?php esc_html_e( 'Brand', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <select name="mds_step_1_device_brand" id="mds_device_brand" required>
        <option value=""><?php esc_html_e( '-- Select Brand --', 'mobile-device-sales' ); ?></option>
        <?php if ( ! is_wp_error( $device_brands ) && ! empty( $device_brands ) ) : ?>
            <?php foreach ( $device_brands as $term ) : ?>
                <option value="<?php echo esc_attr( $term->term_id ); ?>" <?php selected( $selected_device_brand, $term->term_id ); ?>>
                    <?php echo esc_html( $term->name ); ?>
                </option>
            <?php endforeach; ?>
        <?php endif; ?>
    </select>
    <!-- TODO: Implement dependent dropdown logic if needed (e.g., load brands based on device type) -->
</div>

<div class="mds-form-field">
    <label for="mds_device_model"><?php esc_html_e( 'Model', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <select name="mds_step_1_device_model" id="mds_device_model" required>
        <option value=""><?php esc_html_e( '-- Select Model --', 'mobile-device-sales' ); ?></option>
        <?php if ( ! is_wp_error( $device_models ) && ! empty( $device_models ) ) : ?>
            <?php foreach ( $device_models as $term ) : ?>
                <option value="<?php echo esc_attr( $term->term_id ); ?>" <?php selected( $selected_device_model, $term->term_id ); ?>>
                    <?php echo esc_html( $term->name ); ?>
                </option>
            <?php endforeach; ?>
        <?php endif; ?>
    </select>
    <!-- TODO: Implement dependent dropdown logic if needed (e.g., load models based on brand) -->
</div>

<div class="mds-form-field">
    <label for="mds_device_condition"><?php esc_html_e( 'Condition', 'mobile-device-sales' ); ?> <span class="required">*</span></label>
    <select name="mds_step_1_device_condition" id="mds_device_condition" required>
        <option value=""><?php esc_html_e( '-- Select Condition --', 'mobile-device-sales' ); ?></option>
        <?php if ( ! is_wp_error( $device_conditions ) && ! empty( $device_conditions ) ) : ?>
            <?php foreach ( $device_conditions as $term ) : ?>
                <option value="<?php echo esc_attr( $term->term_id ); ?>" <?php selected( $selected_device_condition, $term->term_id ); ?>>
                    <?php echo esc_html( $term->name ); ?>
                </option>
            <?php endforeach; ?>
        <?php endif; ?>
    </select>
</div>
