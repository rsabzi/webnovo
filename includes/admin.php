<?php
/**
 * Admin settings for Scroll CTA plugin.
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Register the plugin's settings page.
 */
function scroll_cta_register_settings_page() {
    add_options_page(
        __( 'Scroll CTA Settings', 'scroll-cta' ),
        __( 'Scroll CTA', 'scroll-cta' ),
        'manage_options',
        'scroll-cta',
        'scroll_cta_render_settings_page'
    );
}
add_action( 'admin_menu', 'scroll_cta_register_settings_page' );

/**
 * Render the settings page.
 */
function scroll_cta_render_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e( 'Scroll CTA Settings', 'scroll-cta' ); ?></h1>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'scroll_cta_settings' );
            do_settings_sections( 'scroll-cta' );
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

/**
 * Register the plugin's settings.
 */
function scroll_cta_register_settings() {
    register_setting(
        'scroll_cta_settings',
        'scroll_cta_settings',
        'scroll_cta_sanitize_settings'
    );

    add_settings_section(
        'scroll_cta_general_section',
        __( 'General Settings', 'scroll-cta' ),
        'scroll_cta_general_section_callback',
        'scroll-cta'
    );

    add_settings_field(
        'scroll_cta_enable',
        __( 'Enable Scroll CTA', 'scroll-cta' ),
        'scroll_cta_enable_callback',
        'scroll-cta',
        'scroll_cta_general_section'
    );
}
add_action( 'admin_init', 'scroll_cta_register_settings' );

/**
 * Sanitize the plugin's settings.
 *
 * @param array $input The settings to sanitize.
 * @return array The sanitized settings.
 */
function scroll_cta_sanitize_settings( $input ) {
    $sanitized_input = array();

    if ( isset( $input['enable'] ) ) {
        $sanitized_input['enable'] = absint( $input['enable'] );
    }

    return $sanitized_input;
}

/**
 * Callback for the general settings section.
 */
function scroll_cta_general_section_callback() {
    esc_html_e( 'Configure the general settings for the Scroll CTA plugin.', 'scroll-cta' );
}

/**
 * Callback for the enable setting.
 */
function scroll_cta_enable_callback() {
    $options = get_option( 'scroll_cta_settings' );
    $enable = isset( $options['enable'] ) ? $options['enable'] : 0;
    ?>
    <label for="scroll_cta_enable">
        <input type="checkbox" id="scroll_cta_enable" name="scroll_cta_settings[enable]" value="1" <?php checked( $enable, 1 ); ?>>
        <?php esc_html_e( 'Enable the Scroll CTA functionality.', 'scroll-cta' ); ?>
    </label>
    <?php
}
