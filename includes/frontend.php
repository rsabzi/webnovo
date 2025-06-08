<?php
/**
 * Frontend display for Scroll CTA plugin.
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

/**
 * Enqueue scripts and styles.
 */
function scroll_cta_enqueue_scripts() {
    wp_enqueue_style(
        'scroll-cta-style',
        SCROLL_CTA_PLUGIN_URL . 'assets/css/scroll-cta.css',
        array(),
        SCROLL_CTA_VERSION
    );

    wp_enqueue_script(
        'scroll-cta-script',
        SCROLL_CTA_PLUGIN_URL . 'assets/js/scroll-cta.js',
        array(),
        SCROLL_CTA_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'scroll_cta_enqueue_scripts' );

/**
 * Display the CTA popup.
 */
function webnovo_scroll_cta_display() {
    $options = get_option( 'scroll_cta_settings' );
    // Assuming 'enable' option is '1' to display. We'll refine this later.
    $enable = isset( $options['enable'] ) ? $options['enable'] : 0;

    if ( ! $enable ) {
        // return; // Commenting out for now to ensure it shows for testing, will enable later.
    }

    ?>
    <div id="scroll-cta" class="scroll-cta" style="display: none;">
        <div class="scroll-cta__content">
            <button class="scroll-cta__close" aria-label="بستن">×</button>
            <div class="scroll-cta__badge">
                <span>پیشنهاد ویژه</span>
            </div>
            <div class="scroll-cta__header">
                <h2>🔥 طراحی وبسایت قالب و افزونه حرفه ای</h2>
                <p class="subtitle"><span class="highlight">4 نفر ظرفیت</span> باقی مانده</p>
            </div>
            <div class="scroll-cta__features">
                <ul>
                    <li><span class="icon">✅</span> <strong>۴۰٪ صرفه‌جویی</strong> در هزینه‌ها</li>
                    <li><span class="icon">🚀</span> <strong>تحویل سریع</strong> با کیفیت بالا</li>
                    <li><span class="icon">🔒</span> <strong>تضمین رضایت</strong> یا بازگشت وجه</li>
                </ul>
            </div>
            <div class="scroll-cta__process">
                <p>ما کار را برای شما خیلی راحت و سریع کردیم. کافیه روی دکمه بزنی و پروژه تان را تعریف کنید تا هوش مصنوعی اونو تحلیل کنه و برامون بیاد. بقیش با ما!</p>
            </div>
            <div class="scroll-cta__timer-compact">
                <div class="countdown">
                    <div class="countdown-item"><span id="days">00</span><span class="label">روز</span></div>
                    <div class="countdown-item"><span id="hours">00</span><span class="label">ساعت</span></div>
                    <div class="countdown-item"><span id="minutes">00</span><span class="label">دقیقه</span></div>
                    <div class="countdown-item"><span id="seconds">00</span><span class="label">ثانیه</span></div>
                </div>
            </div>
            <div class="scroll-cta__button">
                <a href="#ai-project" class="cta-button pulse">پروژه تان را با ما استارت بزنید</a>
            </div>
        </div>
    </div>
    <?php
}
add_action( 'wp_footer', 'webnovo_scroll_cta_display' );
