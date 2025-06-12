<?php
/**
 * Handles order management functionalities.
 *
 * @link       https://example.com
 * @since      1.0.0
 *
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 */

/**
 * Manages orders, statuses, and related data.
 *
 * @since      1.0.0
 * @package    Mobile_Device_Sales
 * @subpackage Mobile_Device_Sales/includes
 * @author     Your Name <email@example.com>
 */
class MDS_Order {

    /**
     * Order Post Type.
     * @since 1.0.0
     * @var string
     */
    const POST_TYPE = 'device_order';

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {
        // Hooks related to order display, meta boxes, status changes etc. will go here.
    }

    /**
     * Get an array of custom order statuses with their labels.
     * @since 1.0.0
     * @return array
     */
    public static function get_custom_statuses_array() {
        return array(
            'mds-pending-approval' => _x( 'Pending Approval', 'post status', 'mobile-device-sales' ),
            'mds-quote-offered'    => _x( 'Quote Offered', 'post status', 'mobile-device-sales' ),
            'mds-completed'        => _x( 'Completed', 'post status', 'mobile-device-sales' ),
            'mds-cancelled'        => _x( 'Cancelled', 'post status', 'mobile-device-sales' ),
        );
    }

    /**
     * Define custom order statuses.
     * This should be hooked into 'init'.
     * @since 1.0.0
     */
    public static function register_order_statuses() {
        $statuses = self::get_custom_statuses_array();
        foreach ($statuses as $status_key => $label) {
            register_post_status($status_key, array(
                'label'                     => $label,
                'public'                    => true, // Allows viewing on front-end if query vars are set.
                'internal'                  => false, // If true, only for admin use.
                'exclude_from_search'       => true, // Exclude from front-end search results.
                'show_in_admin_all_list'    => true, // Show in "All Items" list.
                'show_in_admin_status_list' => true, // Show in the dropdown filters and status counts.
                'label_count'               => _n_noop( "$label <span class="count">(%s)</span>", "$label <span class="count">(%s)</span>", 'mobile-device-sales' ),
            ));
        }
    }

    /**
     * Example: Get order details.
     * (To be expanded later)
     *
     * @since 1.0.0
     * @param int $order_id The ID of the order.
     * @return array|null Order data or null if not found.
     */
    public function get_order_details( $order_id ) {
        if ( get_post_type( $order_id ) !== self::POST_TYPE ) {
            return null;
        }
        // Fetch post meta and other relevant data
        return array( 'id' => $order_id );
    }
}
