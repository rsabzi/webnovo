<?php
/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and hooks for the public side of the site.
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/public
 * @author     Your Name <email@example.com>
 */
class MDS_Public {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * The form handler instance.
     * @since 1.0.0
     * @access private
     * @var MDS_Form_Handler $form_handler
     */
    private $form_handler;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of the plugin.
     * @param      string    $version    The version of this plugin.
     * @param      MDS_Form_Handler $form_handler Instance of the form handler.
     */
    public function __construct( $plugin_name, $version, $form_handler ) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->form_handler = $form_handler;

        // Add AJAX hooks
        add_action( 'wp_ajax_mds_form_step_handler', array( $this, 'ajax_form_step_handler' ) );
        add_action( 'wp_ajax_nopriv_mds_form_step_handler', array( $this, 'ajax_form_step_handler' ) );
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        wp_enqueue_style( $this->plugin_name . '_public_style', MDS_PLUGIN_URL . 'assets/css/public-style.css', array(), $this->version, 'all' );
        // Specific stylesheet for the form
        wp_enqueue_style( $this->plugin_name . '_form_style', MDS_PLUGIN_URL . 'assets/css/mds-form-style.css', array(), $this->version, 'all' );
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {
        wp_enqueue_script( $this->plugin_name . '_public_script', MDS_PLUGIN_URL . 'assets/js/public-script.js', array( 'jquery' ), $this->version, false );
        // Specific script for the form
        wp_enqueue_script( $this->plugin_name . '_form_script', MDS_PLUGIN_URL . 'assets/js/mds-form-script.js', array( 'jquery', 'wp-mediaelement' ), $this->version, true ); // Added wp-mediaelement
        wp_localize_script( $this->plugin_name . '_form_script', 'mds_form_ajax', array(
            'ajax_url' => admin_url( 'admin-ajax.php' ),
            'nonce'    => wp_create_nonce( 'mds_form_nonce' )
        ) );
        // Add this for translatable JS strings
        wp_localize_script( $this->plugin_name . '_form_script', 'mds_form_i18n', array(
            'previous'     => __( 'Previous', 'mobile-device-sales' ),
            'next'         => __( 'Next', 'mobile-device-sales' ),
            'submit_order' => __( 'Submit Order', 'mobile-device-sales' ),
            'select_or_upload_images' => __('Select or Upload Images', 'mobile-device-sales'),
            'use_this_image' => __('Use this image', 'mobile-device-sales'),
            'max_5_images' => __('You can only select up to 5 images.', 'mobile-device-sales')
        ));

        // Enqueue WP media scripts for the uploader
        if ( ! did_action( 'wp_enqueue_media' ) ) {
            wp_enqueue_media();
        }
    }

    /**
     * Registers the shortcode for the multi-step form.
     * Hooked into 'init'.
     *
     * @since 1.0.0
     */
    public function register_shortcodes() {
        add_shortcode( 'mobile_device_sales_form', array( $this, 'display_multi_step_form' ) );
    }

    /**
     * Callback function for the [mobile_device_sales_form] shortcode.
     * Displays the multi-step form.
     *
     * @since 1.0.0
     * @param array $atts Shortcode attributes.
     * @return string HTML output for the form.
     */
    public function display_multi_step_form( $atts ) {
        // Get current step from query param or default to 1
        $current_step = isset( \$_REQUEST['mds_step'] ) ? intval( \$_REQUEST['mds_step'] ) : 1;
        if ($current_step < 1 || $current_step > 5) {
            $current_step = 1;
        }

        ob_start();
        ?>
        <div id="mds-multi-step-form" class="mds-form-container">
            <form id="mds_device_order_form" method="post" action="<?php echo esc_url( admin_url('admin-post.php') ); ?>">
                <input type="hidden" name="action" value="submit_device_order">
                <?php wp_nonce_field( 'submit_device_order_action', 'submit_device_order_nonce' ); ?>
                <input type="hidden" name="current_step" value="<?php echo $current_step; ?>">

                <div class="mds-form-progress">
                    <?php for ( $i = 1; $i <= 5; $i++ ) : ?>
                        <div class="mds-step-indicator <?php echo ( $i == $current_step ) ? 'active' : ''; ?><?php echo ( $i < $current_step ) ? 'completed' : ''; ?>">
                            <?php printf( esc_html__( 'Step %d', 'mobile-device-sales' ), $i ); ?>
                        </div>
                    <?php endfor; ?>
                </div>

                <div class="mds-form-steps">
                    <?php // Step content will be loaded here based on $current_step ?>
                    <?php $this->display_form_step( $current_step ); ?>
                </div>

                <div class="mds-form-navigation">
                    <?php if ( $current_step > 1 ) : ?>
                        <button type="button" class="mds-prev-step" data-target_step="<?php echo $current_step - 1; ?>"><?php esc_html_e( 'Previous', 'mobile-device-sales' ); ?></button>
                    <?php endif; ?>
                    <?php if ( $current_step < 5 ) : ?>
                        <button type="button" class="mds-next-step" data-target_step="<?php echo $current_step + 1; ?>"><?php esc_html_e( 'Next', 'mobile-device-sales' ); ?></button>
                    <?php else : ?>
                        <button type="submit" class="mds-submit-form"><?php esc_html_e( 'Submit Order', 'mobile-device-sales' ); ?></button>
                    <?php endif; ?>
                </div>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Displays the content for a specific step.
     *
     * @since 1.0.0
     * @param int $step The step number to display.
     */
    public function display_form_step( $step ) {
        $form_handler = $this->form_handler; // Make it available to the partial
        switch ($step) {
            case 1:
                require_once MDS_PLUGIN_DIR . 'includes/public/partials/form-step-1.php';
                break;
            case 2:
                require_once MDS_PLUGIN_DIR . 'includes/public/partials/form-step-2.php';
                break;
            case 3:
                require_once MDS_PLUGIN_DIR . 'includes/public/partials/form-step-3.php';
                break;
            case 4:
                require_once MDS_PLUGIN_DIR . 'includes/public/partials/form-step-4.php';
                break;
            case 5:
                require_once MDS_PLUGIN_DIR . 'includes/public/partials/form-step-5.php';
                break;
            default:
                echo "<p>" . esc_html__( 'Invalid step.', 'mobile-device-sales' ) . "</p>";
        }
    }

    public function ajax_form_step_handler() {
        check_ajax_referer( 'mds_form_nonce', 'nonce' );

        $current_step = isset( $_POST['current_step'] ) ? intval( $_POST['current_step'] ) : 1;
        $target_step  = isset( $_POST['target_step'] ) ? intval( $_POST['target_step'] ) : 1;
        $direction    = isset( $_POST['direction'] ) ? sanitize_text_field( $_POST['direction'] ) : 'next';
        $form_data_array = isset( $_POST['form_data'] ) && is_array($_POST['form_data']) ? $_POST['form_data'] : array();

        $step_data_to_save = array();
        if ('next' === $direction) { // Only process form_data if moving next
            foreach ($form_data_array as $key => $value) {
                if (strpos($key, 'mds_step_' . $current_step . '_') === 0) {
                    $field_name = str_replace('mds_step_' . $current_step . '_', '', $key);
                    // Sanitize based on expected field type later if necessary
                    if (is_array($value)) {
                        $step_data_to_save[$field_name] = array_map('sanitize_text_field', $value);
                    } else {
                        $step_data_to_save[$field_name] = sanitize_text_field($value);
                    }
                }
            }

            $validation_result = $this->form_handler->validate_step( $current_step, $step_data_to_save );

            if ( is_wp_error( $validation_result ) && $validation_result->has_errors() ) {
                wp_send_json_error( array(
                    'message' => __( 'Please correct the errors below.', 'mobile-device-sales' ),
                    'errors'  => $validation_result->get_error_messages()
                ) );
                return;
            }
            $this->form_handler->save_step_data( $current_step, $step_data_to_save );
        }

        ob_start();
        // Pass $this->form_handler to display_form_step context if it's not already available
        // However, display_form_step is a method of $this, so $this->form_handler is available.
        $this->display_form_step( $target_step );
        $html_content = ob_get_clean();

        wp_send_json_success( array(
            'html'         => $html_content,
            'current_step' => $target_step,
        ) );
    }
}
