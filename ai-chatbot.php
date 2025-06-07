<?php
/**
 * Plugin Name: ربات چت نوین وب - دستیار هوش مصنوعی
 * Plugin URI: https://novinweb.com
 * Description: دستیار هوش مصنوعی اختصاصی شرکت نوین وب برای پاسخ به سوالات طراحی سایت و برنامه نویسی با قابلیت تنظیم پرامپت سفارشی و ارسال نتایج به مدیریت.
 * Version: 1.2.0
 * Author: نوین وب / شما
 * Author URI: https://yourwebsite.com
 * License: GPLv2 or later
 * Text Domain: novinweb-ai-chatbot
 * Domain Path: /languages
 */

// جلوگیری از دسترسی مستقیم
if (!defined('ABSPATH')) {
    exit;
}

// تعریف ثابت‌های افزونه
define('AI_CHATBOT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AI_CHATBOT_PLUGIN_PATH', plugin_dir_path(__FILE__));

class AI_Chatbot_Plugin {
    
    private $options; // برای نگهداری تنظیمات افزونه
    
    public function __construct() {
        // بارگذاری تنظیمات ذخیره شده افزونه
        $this->options = get_option('novin_web_chatbot_options', $this->get_default_options());
        
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        
        add_action('wp_ajax_ai_chatbot_message', array($this, 'handle_chatbot_message'));
        add_action('wp_ajax_nopriv_ai_chatbot_message', array($this, 'handle_chatbot_message'));
        
        // AJAX action for summarizing chat
        add_action('wp_ajax_summarize_chat_for_submission', array($this, 'handle_summarize_chat_for_submission'));
        add_action('wp_ajax_nopriv_summarize_chat_for_submission', array($this, 'handle_summarize_chat_for_submission'));

        add_action('wp_footer', array($this, 'add_chatbot_html'));
        
        // بخش مدیریت و تنظیمات
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_plugin_settings'));
        
        // Register Custom Post Type for Chatbot Requests
        add_action('init', array($this, 'register_chatbot_requests_cpt'));

        // Add custom columns to CPT
        add_filter('manage_chatbot_request_posts_columns', array($this, 'set_chatbot_request_columns'));
        add_action('manage_chatbot_request_posts_custom_column', array($this, 'render_chatbot_request_columns'), 10, 2);

        // Add meta box for status
        add_action('add_meta_boxes_chatbot_request', array($this, 'add_chatbot_request_status_meta_box'));
        add_action('save_post_chatbot_request', array($this, 'save_chatbot_request_status_meta'));
        
        // Register REST API Endpoint
        add_action('rest_api_init', array($this, 'register_chatbot_rest_routes'));
        
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function get_default_options() {
        return array(
            'api_key' => '', // کلید پیش‌فرض شما
            'bot_name' => 'دستیار نوین وب',
            'brand_name' => 'نوین وب',
            'company_description' => 'شرکت نوین وب، ارائه‌دهنده خدمات جامع در حوزه فناوری اطلاعات شامل طراحی و توسعه وب‌سایت، برنامه‌نویسی سفارشی، طراحی افزونه و قالب وردپرس، توسعه اپلیکیشن، سئو و بهینه‌سازی، مشاوره فنی و پشتیبانی حرفه‌ای. تیم ما با تجربه در پروژه‌های متنوع، راهکارهای فنی پیشرفته و اختصاصی را برای کسب‌وکارها ارائه می‌دهد.',
            'services_summary' => "طراحی و توسعه وب‌سایت\nبرنامه‌نویسی سفارشی\nطراحی افزونه وردپرس\nطراحی قالب اختصاصی\nتوسعه اپلیکیشن\nسئو و بهینه‌سازی\nمشاوره فنی\nپشتیبانی حرفه‌ای",
            'expertise_areas' => "طراحی و توسعه وب‌سایت\nبرنامه‌نویسی سفارشی\nطراحی افزونه وردپرس\nطراحی قالب اختصاصی\nتوسعه اپلیکیشن\nسئو و بهینه‌سازی\nمشاوره فنی\nپشتیبانی حرفه‌ای",
            'response_tone' => 'صمیمی، مؤدبانه و حرفه‌ای',
            'additional_instructions' => "1. با لحن صمیمی، مؤدبانه و حرفه‌ای صحبت کنید.\n2. در هر مرحله با پرسیدن سؤال‌های هدفمند، نیاز دقیق کاربر را کشف کنید.\n3. هیچ‌وقت مستقیم به قیمت اشاره نکنید، چون قیمت بسته به امکانات و زمان متغیر است.\n4. در عوض قیمت، ارزش خدمات را توضیح دهید (مثلاً طراحی اختصاصی، تجربه تیم، سئو، پشتیبانی و امنیت).\n5. در پایان گفتگو همیشه پیشنهاد مشاوره رایگان، تماس، یا ارسال پروپوزال دهید.\n6. از جملاتی استفاده کنید که اعتماد و اطمینان ایجاد کند.\n7. در برابر مقاومت یا تردید کاربر، راه‌حل‌های منطقی و منعطف ارائه دهید.\n8. مکالمه باید حس مشاوره واقعی، نه فروش اجباری داشته باشد.\n\n🔍 ایده‌پردازی و راهنمایی پروژه:\n1. وقتی کاربر ایده کلی بیان می‌کند، حداقل 3-5 ایده خلاقانه و کاربردی متناسب با نیاز او پیشنهاد دهید.\n2. برای پروژه‌های وب، تکنولوژی‌های مناسب را با ذکر مزایا و معایب هر کدام معرفی کنید.\n3. برای هر نوع پروژه، ویژگی‌های ضروری، مطلوب و لوکس را مشخص کنید تا کاربر بتواند بهتر تصمیم بگیرد.\n4. روش‌های پیاده‌سازی مختلف را با توجه به بودجه و زمان (ارزان/سریع، کیفیت بالا/گران) مقایسه کنید.\n5. با طرح سؤالات هدفمند، کاربر را قدم به قدم در تبدیل ایده اولیه به یک طرح عملی راهنمایی کنید.\n6. برای هر نوع پروژه، یک روندنمای ساده از مراحل پیاده‌سازی ارائه کنید تا کاربر دید واضحی از فرایند داشته باشد.\n7. منابع آموزشی و ابزارهای مفید مرتبط با موضوع پروژه را معرفی کنید تا به کاربر در درک بهتر پروژه کمک شود.\n8. به کاربر کمک کنید تا چالش‌ها و موانع احتمالی پروژه را شناسایی کند و برای آنها راه‌حل ارائه دهید.\n9. جدیدترین روندها و فناوری‌های مرتبط با پروژه کاربر را معرفی کنید و مزایای استفاده از آنها را توضیح دهید.\n10. سناریوهای مختلف توسعه پروژه در آینده را پیشنهاد کنید تا کاربر بتواند چشم‌انداز بلندمدت داشته باشد.\n\n📋 تشویق به ثبت پروژه:\n1. در مراحل میانی و پایانی گفتگو، مزایای ثبت رسمی پروژه با تیم ما را به‌طور مختصر یادآوری کنید.\n2. تأکید کنید که با ثبت پروژه، متخصصان ما آنالیز دقیق‌تری انجام داده و راهکارهای بهینه ارائه می‌دهند.\n3. از عبارت‌هایی مانند \"برای پیشرفت این ایده جالب\" یا \"برای اجرای حرفه‌ای این پروژه\" استفاده کنید.\n4. در پایان گفتگو حتماً کاربر را به ثبت اطلاعات تماس برای پیگیری پروژه دعوت کنید.\n5. به کاربر اطمینان دهید که ثبت اولیه پروژه هیچ هزینه‌ای ندارد و فقط برای مشاوره تخصصی‌تر است.\n6. مزایای همکاری با تیم متخصص ما را برجسته کنید (مانند تجربه، دانش فنی، پشتیبانی و تضمین کیفیت).\n7. به کاربران توضیح دهید که ثبت پروژه باعث می‌شود از مشاوره رایگان تخصصی بهره‌مند شوند.\n8. در مورد موفقیت پروژه‌های مشابه که تیم ما اجرا کرده است، صحبت کنید (بدون ذکر نام مشتری).\n9. تأکید کنید که با ثبت پروژه، یک برنامه‌ی زمان‌بندی و برآورد هزینه دقیق به کاربر ارائه می‌شود.\n10. به کاربر اطمینان دهید که تیم ما می‌تواند پروژه را در کوتاه‌ترین زمان ممکن و با بهترین کیفیت اجرا کند.\n\nفنون مذاکره و روانشناسی:\n- تکنیک آینه‌سازی: بخشی از گفته‌های کاربر را تکرار کنید تا حس شنیده‌شدن ایجاد شود.\n- تأخیر نرم: در برابر سؤالات حساس، مکالمه را با احترام به سمت سؤال هدایت کنید.\n- گزینه‌سازی: به جای سؤال‌های بله/خیر، چند گزینه پیشنهاد دهید.\n- ارزش‌سازی به‌جای قیمت‌گویی: به جای عدد، درباره نتیجه و کیفیت صحبت کنید.\n- تکنیک بسته‌بندی خدمات: خدمات را به صورت یک پکیج منسجم تعریف کنید.\n\nساختار گفتگو:\n1. سلام و خوش‌آمدگویی + پرسش اول درباره نوع سایت\n2. کشف هدف پروژه\n3. سوال درباره امکانات مدنظر\n4. شناخت بودجه و محدودیت بدون پرسش مستقیم\n5. پرهیز از اعلام قیمت و انتقال گفتگو به مشاوره\n6. معرفی خدمات تیم\n7. ارائه ایده‌ها و راه‌حل‌های خلاقانه\n8. پاسخ به سوالات فنی با جزئیات دقیق\n9. پایان مکالمه با دعوت به اقدام و ثبت پروژه\n\n🧩 نمونه مکالمات حرفه‌ای با ایده‌پردازی:\n\nنمونه ۱: کاربری که ایده کلی دارد\nکاربر: من می‌خوام یه اپلیکیشن برای رستوران بسازم.\nچت‌بات: ایده خیلی خوبی دارید! برای رستوران‌ها، چند نوع اپلیکیشن می‌تونیم طراحی کنیم:\n\n1. اپلیکیشن سفارش آنلاین: کاربر منو را می‌بیند و سفارش می‌دهد (مناسب برای بیرون‌بر)\n2. سیستم رزرو میز: امکان رزرو میز با انتخاب تاریخ، ساعت و تعداد مهمان\n3. اپلیکیشن وفاداری: سیستم امتیازدهی و تخفیف برای مشتریان دائمی\n4. سیستم جامع مدیریت رستوران: ترکیبی از همه موارد بالا + مدیریت موجودی و کارکنان\n\nهر کدام از این گزینه‌ها مزایای خاص خودش رو داره. تیم ما می‌تونه براساس نیاز شما، بهترین راه‌حل رو طراحی و پیاده‌سازی کنه. به نظرتون کدام یک از این گزینه‌ها بیشتر به نیاز شما نزدیکه؟\n\nنمونه ۲: کاربری که دنبال راهنمایی تکنولوژی است\nکاربر: برای ساخت فروشگاه آنلاین چه تکنولوژی پیشنهاد می‌کنید؟\nچت‌بات: برای فروشگاه آنلاین، چند راهکار عالی وجود داره که هر کدام مزایا و کاربردهای خاص خودش رو داره:\n\n1. وردپرس + ووکامرس: \n   مزایا: راه‌اندازی سریع، هزینه کمتر، پلاگین‌های متنوع\n   مناسب برای: کسب‌وکارهای کوچک تا متوسط، بودجه محدود\n\n2. مجنتو:\n   مزایا: انعطاف‌پذیری بالا، مقیاس‌پذیری عالی، SEO قوی\n   مناسب برای: فروشگاه‌های بزرگ با محصولات زیاد\n\n3. راه‌حل اختصاصی با React/Laravel:\n   مزایا: کاملاً سفارشی، عملکرد فوق‌العاده، امنیت بالا\n   مناسب برای: فروشگاه‌های با نیازمندی‌های خاص و پیچیده\n\nتیم متخصص ما تجربه زیادی در پیاده‌سازی هر سه راه‌حل داره و می‌تونه بهترین گزینه رو برای شما انتخاب و اجرا کنه. برای انتخاب بهترین راه‌حل، بفرمایید تقریباً چند محصول خواهید داشت و چه ویژگی‌هایی برایتان مهم‌تر است؟\n\nنمونه ۳: دعوت به ثبت پروژه\nکاربر: این ایده‌ها جالبه. باید بیشتر فکر کنم.\nچت‌بات: خیلی خوشحالم که ایده‌ها مورد توجه‌تون قرار گرفت! برای پیشرفت این پروژه جذاب، پیشنهاد می‌کنم اطلاعات ایده‌تون رو ثبت کنید تا تیم متخصص ما یک آنالیز دقیق‌تر انجام بده، نمونه‌کارهای مرتبط رو براتون ارسال کنه و یک مشاوره تخصصی رایگان ارائه بده.\n\nتیم ما با داشتن متخصصین باتجربه در حوزه‌های مختلف، می‌تونه به شما کمک کنه تا ایده‌تون رو با بهترین کیفیت و در کوتاه‌ترین زمان به واقعیت تبدیل کنید. ثبت اولیه پروژه کاملاً رایگانه و هیچ تعهدی ایجاد نمی‌کنه، اما به شما کمک می‌کنه دید واقع‌بینانه‌تری از هزینه‌ها، زمان‌بندی و مراحل اجرا بدست بیارید.\n\nمی‌تونم اطلاعات تماس‌تون رو دریافت کنم تا همکاران ما برای مشاوره تخصصی با شما تماس بگیرن؟\n\nمهم:\n- در هیچ مرحله‌ای قیمت عددی ندهید، مگر اینکه مدیر یا مشاور تأیید کند.\n- همیشه آماده پاسخ‌گویی به زبان انگلیسی باشید، اگر کاربر انگلیسی صحبت کرد، لحن حرفه‌ای اما دوستانه را حفظ کنید.",
            'greeting_message' => "سلام! خیلی خوش اومدی 😊 من دستیار هوشمند نوین وب هستم و می‌تونم در مورد طراحی سایت، برنامه‌نویسی و ایده‌های دیجیتال به شما کمک کنم. می‌تونم ایده‌های خلاقانه برای پروژه‌ها ارائه بدم و شما رو در مراحل پیاده‌سازی راهنمایی کنم. برای شروع بفرمایید دنبال طراحی چه نوع وب‌سایت یا اپلیکیشنی هستید؟",
            'out_of_scope_message' => 'متاسفانه تخصص من در زمینه‌های طراحی سایت، برنامه‌نویسی، ایده‌پردازی دیجیتال و سئو است. من می‌توانم در مورد ایده‌های پروژه‌های دیجیتال به شما مشاوره دهم، راهکارهای فنی پیشنهاد کنم و در پیاده‌سازی آن‌ها راهنمایی‌تان کنم. برای سوالات دیگر نمی‌توانم به خوبی کمک کنم. لطفاً سوال خود را در مورد یکی از این حوزه‌ها بپرسید یا ایده‌ای که برای پیاده‌سازی در ذهن دارید را با من در میان بگذارید.'
        );
    }
    
    public function enqueue_frontend_assets() {
        wp_enqueue_style('novin-chatbot-frontend-style', AI_CHATBOT_PLUGIN_URL . 'assets/chatbot.css', array(), '1.2.0');
        wp_enqueue_script('novin-chatbot-frontend-script', AI_CHATBOT_PLUGIN_URL . 'assets/chatbot.js', array('jquery'), '1.2.0', true);
        
        $chat_history_for_js = array();
        if (isset($_SESSION['ai_chatbot_conversation_history'])) {
             $chat_history_for_js = $_SESSION['ai_chatbot_conversation_history'];
        }

        wp_localize_script('novin-chatbot-frontend-script', 'ai_chatbot_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'summarize_nonce' => wp_create_nonce('summarize_chat_nonce'),
            'chat_message_nonce' => wp_create_nonce('ai_chatbot_message_nonce_action'),
            'rest_api_url' => esc_url_raw(rest_url('chatbot/v1/submit')),
            'rest_api_nonce' => wp_create_nonce('wp_rest'),
            'initial_chat_history' => $chat_history_for_js, // برای ارسال اولیه تاریخچه به JS
            'text_send_to_management' => __('ارسال نتیجه برای مدیریت', 'novinweb-ai-chatbot'),
            'text_submit_contact_info' => __('ارسال اطلاعات', 'novinweb-ai-chatbot'),
            'text_enter_email_phone' => __('لطفاً برای پیگیری بهتر، ایمیل یا شماره تماس‌تان را وارد کنید:', 'novinweb-ai-chatbot'),
            'text_email_label' => __('ایمیل شما:', 'novinweb-ai-chatbot'),
            'text_phone_label' => __('شماره تماس (اختیاری):', 'novinweb-ai-chatbot'),
            'text_submission_success' => __('🎉 خلاصه گفت‌وگوی شما با موفقیت برای تیم مدیریت ارسال شد. به‌زودی با شما تماس خواهیم گرفت.', 'novinweb-ai-chatbot'),
            'text_submission_error' => __('خطا در ارسال اطلاعات. لطفا دوباره تلاش کنید.', 'novinweb-ai-chatbot'),
            'text_summarizing' => __('در حال خلاصه‌سازی گفتگو...', 'novinweb-ai-chatbot'),
            'text_summary_error' => __('خطا در خلاصه‌سازی گفتگو.', 'novinweb-ai-chatbot'),
        ));
    }

    public function enqueue_admin_assets($hook) {
        // فقط در صفحه تنظیمات افزونه و صفحه لیست/ویرایش CPT درخواست‌ها بارگذاری شود
        if ($hook != 'settings_page_novinweb-ai-chatbot-settings' && 
            $hook != 'edit.php' && $hook != 'post.php' && $hook != 'post-new.php') {
            // بررسی اضافی برای اینکه آیا در صفحه CPT هستیم یا نه
            global $post_type;
            if ('chatbot_request' !== $post_type && ($hook === 'edit.php' || $hook === 'post.php' || $hook === 'post-new.php')) {
                 return;
            }
            if ($hook != 'settings_page_novinweb-ai-chatbot-settings' && 'chatbot_request' !== $post_type) {
                return;
            }
        }
        wp_enqueue_style('novin-chatbot-admin-style', AI_CHATBOT_PLUGIN_URL . 'assets/admin-style.css', array(), '1.2.0');
    }
    
    public function handle_chatbot_message() {
        if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'ai_chatbot_message_nonce_action')) {
            wp_send_json_error(array('message' => __('Invalid nonce or action.', 'novinweb-ai-chatbot')));
            return;
        }
        
        $user_message = isset($_POST['message']) ? sanitize_text_field(wp_unslash($_POST['message'])) : '';
        $chat_history_json = isset($_POST['history']) ? wp_unslash($_POST['history']) : '[]'; // تاریخچه کامل چت از JS
        
        if (empty($user_message)) {
            wp_send_json_error('پیام خالی است!');
            return;
        }
        
        if (!session_id()) {
            session_start();
        }
        
        // Decode chat history from JS
        $chat_history = json_decode($chat_history_json, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $chat_history = array(); // اگر تاریخچه نامعتبر بود، خالی در نظر بگیر
        }

        // اضافه کردن پیام فعلی کاربر به تاریخچه برای ارسال به API
        $chat_history[] = array('role' => 'user', 'parts' => array(array('text' => $user_message)));

        // محدود کردن تاریخچه برای جلوگیری از طولانی شدن بیش از حد
        // Gemini از محتوای طولانی پشتیبانی می‌کند، اما بهتر است یک حد معقول داشته باشیم
        $max_history_items = 20; // مثلا ۱۰ تبادل رفت و برگشت
        if (count($chat_history) > $max_history_items) {
            $chat_history = array_slice($chat_history, -$max_history_items);
        }
        
        // ساخت پرامپت سیستم
        $system_instructions = "شما دستیار هوش مصنوعی شرکت {$this->options['brand_name']} با نام '{$this->options['bot_name']}' هستید.\n\n";
        $system_instructions .= "🏢 درباره شرکت {$this->options['brand_name']}:\n{$this->options['company_description']}\n\n";
        $system_instructions .= "💼 خدمات اصلی شرکت {$this->options['brand_name']}:\n{$this->options['services_summary']}\n\n";
        $system_instructions .= "🎯 نحوه پاسخ‌دهی شما: با لحن {$this->options['response_tone']} پاسخ دهید.\n";
        if (!empty($this->options['additional_instructions'])) {
            $system_instructions .= "\nدستورالعمل‌های مهم دیگر:\n{$this->options['additional_instructions']}\n";
        }
        $system_instructions .= "\n⚠️ اگر سوال کاربر خارج از حوزه‌های تخصصی ('{$this->options['expertise_areas']}') بود، این پیام را نمایش دهید: \"{$this->options['out_of_scope_message']}\"\n\n";
        
        // محتوای نهایی برای ارسال به API شامل تاریخچه و دستورالعمل‌های سیستم
        $contents_for_api = array();
        $contents_for_api[] = array('role' => 'user', 'parts' => array(array('text' => $system_instructions . "\n\n--- تاریخچه مکالمه قبلی (در صورت وجود) ---"))); // دستورالعمل سیستم به عنوان پیام اول کاربر
        
        // اضافه کردن تاریخچه واقعی (بدون پیام سیستم که خودمان اضافه کردیم)
        foreach ($chat_history as $item) {
            $contents_for_api[] = $item;
        }
        
        // حذف پیام کاربر از انتهای تاریخچه برای ذخیره در session، چون پاسخ آن هنوز نیامده
        $history_to_save_in_session = $chat_history;
        array_pop($history_to_save_in_session); 

        $current_api_key = isset($this->options['api_key']) ? $this->options['api_key'] : '';
        if (empty($current_api_key) || strlen($current_api_key) < 30) {
            wp_send_json_error(array('message' => 'کلید API در تنظیمات یافت نشد یا نامعتبر است.'));
            return;
        }
        
        $response_text = $this->call_gemini_api($contents_for_api, $current_api_key); // ارسال کل تاریخچه و پیام سیستم
        
        if ($response_text && !empty(trim($response_text))) {
            if (strpos($response_text, "خطا در اتصال") !== false || 
                strpos($response_text, "خطا در دریافت پاسخ") !== false || 
                strpos($response_text, "خطا از API") !== false ||
                strpos($response_text, "خطا: کلید API نامعتبر است") !== false ) {
                wp_send_json_error(array('message' => $response_text));
            } else {
                // ذخیره پاسخ ربات در تاریخچه برای ارسال‌های بعدی
                $history_to_save_in_session[] = array('role' => 'user', 'parts' => array(array('text' => $user_message))); // پیام کاربر
                $history_to_save_in_session[] = array('role' => 'model', 'parts' => array(array('text' => $response_text))); // پاسخ مدل
                $_SESSION['ai_chatbot_conversation_history'] = $history_to_save_in_session;

                wp_send_json_success(array(
                    'message' => nl2br(esc_html($response_text)),
                    'timestamp' => current_time('mysql')
                ));
            }
        } else {
            wp_send_json_error(array('message' => 'متاسفانه نتوانستم پاسخ مناسبی تولید کنم.'));
        }
    }

    public function handle_summarize_chat_for_submission() {
        check_ajax_referer('summarize_chat_nonce', 'nonce');

        $chat_history_json = isset($_POST['chat_history']) ? wp_unslash($_POST['chat_history']) : '[]';
        $chat_history = json_decode($chat_history_json, true);

        if (empty($chat_history) || json_last_error() !== JSON_ERROR_NONE) {
            wp_send_json_error(array('summary' => 'تاریخچه چت برای خلاصه‌سازی یافت نشد.'));
            return;
        }

        // ساخت یک رشته خوانا از تاریخچه چت
        $readable_history = "";
        foreach ($chat_history as $entry) {
            $speaker = ($entry['role'] === 'user') ? "کاربر" : "چت‌بات ({$this->options['bot_name']})";
            $readable_history .= $speaker . ": " . $entry['parts'][0]['text'] . "\n\n";
        }

        $summarization_prompt = "شما یک دستیار خلاصه‌سازی هستید. لطفاً مکالمه زیر بین یک کاربر و یک چت‌بات را به صورت دقیق و مختصر (حداکثر در چند پاراگراف کوتاه) خلاصه کنید. مهم‌ترین نکات، سوالات اصلی کاربر، و پاسخ‌ها یا راه‌حل‌های ارائه شده توسط چت‌بات را استخراج کنید. خلاصه باید به زبان فارسی باشد و هدف اصلی گفتگو و نتیجه نهایی (در صورت وجود) را مشخص کند.\n\nمتن کامل گفتگو:\n" . $readable_history;
        
        $current_api_key = isset($this->options['api_key']) ? $this->options['api_key'] : '';
        if (empty($current_api_key)) {
            wp_send_json_error(array('summary' => 'کلید API برای خلاصه‌سازی یافت نشد.'));
            return;
        }

        $summary_text = $this->call_gemini_api(array(array('role' => 'user', 'parts' => array(array('text' => $summarization_prompt)))), $current_api_key);

        if ($summary_text && strpos($summary_text, "خطا") === false) {
            wp_send_json_success(array('summary' => nl2br(esc_html($summary_text))));
        } else {
            wp_send_json_error(array('summary' => 'خطا در تولید خلاصه: ' . esc_html($summary_text)));
        }
    }
    
    private function call_gemini_api($contents_payload, $api_key_to_use) {
        // $contents_payload باید آرایه‌ای از محتواها باشد، مطابق ساختار Gemini API
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $api_key_to_use;
        
        $data = array(
            'contents' => $contents_payload, // $contents_payload مستقیم استفاده شود
            'generationConfig' => array(
                'temperature' => 0.7, 
                'topK' => 1,
                'topP' => 1,
                'maxOutputTokens' => 1024, 
                'stopSequences' => array()
            ),
            'safetySettings' => array(
                array('category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'),
                array('category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'),
                array('category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE'),
                array('category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_MEDIUM_AND_ABOVE')
            )
        );
        
        $args = array(
            'body' => json_encode($data),
            'headers' => array(
                'Content-Type' => 'application/json',
                'User-Agent' => 'WordPress-NovinWeb-Chatbot/' . get_bloginfo('version') . '; ' . home_url()
            ),
            'timeout' => 60, 'sslverify' => true, 'method' => 'POST'
        );
        
        $response = wp_remote_post($url, $args);
        
        if (is_wp_error($response)) {
            error_log('NovinWeb Chatbot - Gemini API Connection Error: ' . $response->get_error_message());
            return 'خطا در اتصال به سرویس هوش مصنوعی: ' . esc_html($response->get_error_message());
        }
        
        $response_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);
        
        if ($response_code !== 200) {
            error_log('NovinWeb Chatbot - Gemini API HTTP Error: ' . $response_code . ' - Body: ' . $body);
            $decoded_error = json_decode($body, true);
            if (isset($decoded_error['error']['message'])) {
                if (strpos(strtolower($decoded_error['error']['message']), "api key not valid") !== false) {
                    return 'خطا: کلید API نامعتبر است. لطفا تنظیمات افزونه را بررسی کنید.';
                } elseif (strpos(strtolower($decoded_error['error']['message']), "quota") !== false) {
                    return 'خطا: سهمیه استفاده از API به پایان رسیده است. لطفا بعدا تلاش کنید یا با پشتیبانی تماس بگیرید.';
                }
                return 'خطا در دریافت پاسخ از سرویس (' . esc_html($response_code) . '): ' . esc_html($decoded_error['error']['message']);
            }
            return 'خطا در دریافت پاسخ از سرویس (کد: ' . esc_html($response_code) . ')';
        }
        
        $decoded = json_decode($body, true);
        
        if (isset($decoded['error'])) {
            error_log('NovinWeb Chatbot - Gemini API Response Error: ' . json_encode($decoded['error']));
            return 'خطا از API: ' . esc_html(isset($decoded['error']['message']) ? $decoded['error']['message'] : 'خطای نامشخص از سرویس Gemini');
        }
        
        if (isset($decoded['candidates'][0]['content']['parts'][0]['text'])) {
            return $decoded['candidates'][0]['content']['parts'][0]['text'];
        }
        
        if (isset($decoded['candidates'][0]['finishReason']) && $decoded['candidates'][0]['finishReason'] === 'SAFETY') {
            error_log('NovinWeb Chatbot - Gemini API Safety Block. Response: ' . $body);
            return 'متاسفانه به دلیل سیاست‌های ایمنی، نمی‌توانم به این سوال پاسخ دهم. لطفا سوال دیگری بپرسید.';
        }
        
        error_log('NovinWeb Chatbot - Gemini API Unexpected Response: ' . $body);
        return 'پاسخ غیرمنتظره از سرویس هوش مصنوعی دریافت شد. لطفا لاگ‌های سرور را بررسی کنید.';
    }
    
    public function add_chatbot_html() {
        $greeting_message = isset($this->options['greeting_message']) ? $this->options['greeting_message'] : $this->get_default_options()['greeting_message'];
        $allowed_html_greeting = array(
            'strong' => array(), 'br' => array(), 'em' => array(), 'p' => array(),
            'a' => array('href' => true, 'title' => true, 'target' => true)
        );
        $greeting_message_html = wp_kses($greeting_message, $allowed_html_greeting);
        $bot_name_header = isset($this->options['bot_name']) ? esc_html($this->options['bot_name']) : esc_html($this->get_default_options()['bot_name']);
        ?>
        <div id="ai-chatbot-container">
            <div id="ai-chatbot-toggle">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="ai3d-gradient" cx="50%" cy="50%" r="70%">
                            <stop offset="0%" stop-color="#3ed8ff"/>
                            <stop offset="100%" stop-color="#00bfae"/>
                        </radialGradient>
                        <filter id="ai3d-shadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#222" flood-opacity="0.25"/>
                        </filter>
                    </defs>
                    <ellipse cx="32" cy="30" rx="24" ry="18" fill="url(#ai3d-gradient)" filter="url(#ai3d-shadow)"/>
                    <path d="M32 48c-6 0-10-2-14-5l-4 7c0 2 2 3 4 2l8-3c2 1 4 1 6 1s4 0 6-1l8 3c2 1 4 0 4-2l-4-7c-4 3-8 5-14 5z" fill="url(#ai3d-gradient)" opacity="0.85"/>
                    <circle cx="22" cy="28" r="2.5" fill="#fff" opacity="0.9"/>
                    <circle cx="32" cy="28" r="2.5" fill="#fff" opacity="0.9"/>
                    <circle cx="42" cy="28" r="2.5" fill="#fff" opacity="0.9"/>
                    <rect x="18" y="22" width="28" height="12" rx="6" fill="#fff" opacity="0.08"/>
                    <ellipse cx="32" cy="22" rx="10" ry="4" fill="#fff" opacity="0.18"/>
                </svg>
            </div>
            <div id="ai-chatbot-window" style="display: none;">
                <div id="ai-chatbot-header">
                    <h4>💬 <?php echo $bot_name_header; ?> - مشاور و ایده‌پرداز دیجیتال</h4>
                    <button id="ai-chatbot-close">&times;</button>
                </div>
                <div id="ai-chatbot-messages">
                    <div class="ai-message"><?php echo $greeting_message_html; ?></div>
                </div>
                <div id="ai-chatbot-footer">
                    <div id="ai-chatbot-input-area">
                        <input type="text" id="ai-chatbot-input" placeholder="ایده‌ها، سوالات یا نیازهای خود را اینجا بنویسید..." dir="rtl">
                        <button id="ai-chatbot-send">ارسال</button>
                    </div>
                    <button id="ai-chatbot-send-to-management" class="send-to-management-btn">🔘 <?php _e('ثبت ایده و دریافت مشاوره تخصصی', 'novinweb-ai-chatbot'); ?></button>
                </div>
            </div>

            <!-- Modal for contact info -->
            <div id="ai-chatbot-contact-modal" style="display:none;" class="chatbot-modal">
                <div class="chatbot-modal-content">
                    <span class="chatbot-modal-close">&times;</span>
                    <p id="contact-modal-message"><?php _e('برای پیگیری پروژه و دریافت مشاوره تخصصی رایگان، لطفاً اطلاعات تماس خود را وارد کنید:', 'novinweb-ai-chatbot'); ?></p>
                    <form id="ai-chatbot-contact-form">
                        <div>
                            <label for="chatbot-user-email"><?php _e('ایمیل شما:', 'novinweb-ai-chatbot'); ?> <span style="color:red;">*</span></label>
                            <input type="email" id="chatbot-user-email" required>
                        </div>
                        <div>
                            <label for="chatbot-user-phone"><?php _e('شماره تماس (اختیاری):', 'novinweb-ai-chatbot'); ?></label>
                            <input type="tel" id="chatbot-user-phone">
                        </div>
                        <button type="submit" id="chatbot-submit-contact-info"><?php _e('ثبت پروژه و ارسال اطلاعات', 'novinweb-ai-chatbot'); ?></button>
                    </form>
                    <div id="chatbot-submission-status" style="display:none; margin-top:10px;"></div>
                </div>
            </div>
        </div>
        <?php
    }
    
    public function add_admin_menu() {
        add_options_page(
            'تنظیمات دستیار هوش مصنوعی نوین وب', 
            'دستیار نوین وب',
            'manage_options',
            'novinweb-ai-chatbot-settings',    
            array($this, 'render_admin_settings_page') 
        );

        // منوی جدید برای درخواست‌های چت‌بات
        add_menu_page(
            __('درخواست‌های چت‌بات', 'novinweb-ai-chatbot'), // عنوان صفحه
            __('درخواست‌های چت‌بات', 'novinweb-ai-chatbot'), // عنوان منو
            'manage_options',                               // سطح دسترسی
            'edit.php?post_type=chatbot_request',           // لینک slug (نمایش لیست CPT)
            '',                                             // تابع callback (نیاز نیست چون به لیست CPT می‌رود)
            'dashicons-format-chat',                        // آیکون منو
            26                                              // موقعیت منو (بعد از Comments)
        );
    }

    public function register_plugin_settings() {
        register_setting(
            'novin_web_chatbot_settings_group', 
            'novin_web_chatbot_options',        
            array($this, 'sanitize_chatbot_options') 
        );

        add_settings_section(
            'novin_web_chatbot_general_section',    
            'تنظیمات اصلی ربات',                                        
            null,                                           
            'novinweb-ai-chatbot-settings'            
        );
        add_settings_field('api_key', 'کلید API گوگل (Gemini)', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_general_section', ['type' => 'text', 'name' => 'api_key', 'desc' => 'کلید API خود را از Google AI Studio دریافت کنید. این کلید برای ارتباط با سرویس هوش مصنوعی ضروری است.']);
        add_settings_field('bot_name', 'نام ربات', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_general_section', ['type' => 'text', 'name' => 'bot_name', 'desc' => 'نامی که ربات با آن در هدر پنجره چت نمایش داده می‌شود.']);
        add_settings_field('brand_name', 'نام برند شما', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_general_section', ['type' => 'text', 'name' => 'brand_name', 'desc' => 'نام شرکت یا برند شما که ربات خود را به آن منتسب می‌کند.']);
        
        add_settings_section('novin_web_chatbot_persona_section', 'شخصیت و رفتار ربات (پرامپت سیستم)', null, 'novinweb-ai-chatbot-settings');
        add_settings_field('company_description', 'توضیحات شرکت شما', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_persona_section', ['type' => 'textarea', 'name' => 'company_description', 'rows' => 3, 'desc' => 'توضیح مختصری درباره شرکت یا برند شما که به ربات کمک می‌کند خود را بهتر معرفی کند.']);
        add_settings_field('services_summary', 'خلاصه خدمات شرکت (هر مورد در یک خط)', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_persona_section', ['type' => 'textarea', 'name' => 'services_summary', 'rows' => 4, 'desc' => 'لیستی از خدمات اصلی که شرکت شما ارائه می‌دهد.']);
        add_settings_field('expertise_areas', 'حوزه‌های تخصصی ربات (هر مورد در یک خط)', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_persona_section', ['type' => 'textarea', 'name' => 'expertise_areas', 'rows' => 5, 'desc' => 'موضوعاتی که ربات باید در آن‌ها تخصص داشته باشد و بتواند پاسخگو باشد.']);
        add_settings_field('response_tone', 'لحن پاسخ‌دهی ربات', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_persona_section', ['type' => 'text', 'name' => 'response_tone', 'desc' => 'مثال: دوستانه و حرفه‌ای, رسمی و دقیق, محاوره‌ای و صمیمی.']);
        add_settings_field('additional_instructions', 'دستورالعمل‌های اضافی برای ربات (هر دستور در یک خط)', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_persona_section', ['type' => 'textarea', 'name' => 'additional_instructions', 'rows' => 10, 'desc' => 'سایر دستورالعمل‌هایی که می‌خواهید ربات در پاسخ‌های خود رعایت کند.']);

        add_settings_section('novin_web_chatbot_messages_section', 'پیام‌های سفارشی ربات', null, 'novinweb-ai-chatbot-settings');
        add_settings_field('greeting_message', 'پیام خوشامدگویی اولیه', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_messages_section', ['type' => 'textarea', 'name' => 'greeting_message', 'rows' => 4, 'desc' => 'این پیام اولین پیامی است که کاربر پس از باز کردن چت‌بات مشاهده می‌کند. می‌توانید از HTML ساده مانند &lt;strong&gt; و &lt;br&gt; استفاده کنید.']);
        add_settings_field('out_of_scope_message', 'پیام برای سوالات خارج از تخصص', array($this, 'render_settings_field_html'), 'novinweb-ai-chatbot-settings', 'novin_web_chatbot_messages_section', ['type' => 'textarea', 'name' => 'out_of_scope_message', 'rows' => 3, 'desc' => 'پیامی که ربات در صورت پرسیدن سوالی خارج از حوزه‌های تعریف شده، به کاربر نمایش می‌دهد.']);
    }

    public function render_settings_field_html($args) {
        $option_group_name = 'novin_web_chatbot_options'; 
        $option_field_name = $args['name'];
        $value = isset($this->options[$option_field_name]) ? $this->options[$option_field_name] : '';

        switch ($args['type']) {
            case 'textarea':
                echo "<textarea id='{$option_field_name}' name='{$option_group_name}[{$option_field_name}]' rows='{$args['rows']}' class='large-text code'>" . esc_textarea($value) . "</textarea>";
                break;
            case 'text':
            default:
                echo "<input type='text' id='{$option_field_name}' name='{$option_group_name}[{$option_field_name}]' value='" . esc_attr($value) . "' class='regular-text' />";
                break;
        }
        if (isset($args['desc'])) {
            echo "<p class='description'>" . esc_html($args['desc']) . "</p>";
        }
    }

    public function sanitize_chatbot_options($input) {
        $sanitized_input = array();
        $defaults = $this->get_default_options(); 

        $text_fields = ['api_key', 'bot_name', 'brand_name', 'response_tone'];
        $textarea_fields = ['company_description', 'services_summary', 'expertise_areas', 'additional_instructions', 'greeting_message', 'out_of_scope_message'];

        foreach ($text_fields as $field) {
            $sanitized_input[$field] = isset($input[$field]) ? sanitize_text_field(trim($input[$field])) : $defaults[$field];
        }
        
        foreach ($textarea_fields as $field) {
            if (isset($input[$field])) {
                if ($field === 'greeting_message') { 
                    $allowed_html = array(
                        'strong' => array(), 'em' => array(), 'br' => array(), 'p' => array(),
                        'a' => array('href' => true, 'title' => true, 'target' => true)
                    );
                    $sanitized_input[$field] = wp_kses(trim($input[$field]), $allowed_html);
                } else {
                    $sanitized_input[$field] = sanitize_textarea_field(trim($input[$field]));
                }
            } else {
                $sanitized_input[$field] = $defaults[$field];
            }
        }
        return $sanitized_input;
    }
    
    public function render_admin_settings_page() {
        if (!current_user_can('manage_options')) {
            wp_die(__('شما مجوز دسترسی به این صفحه را ندارید.'));
        }
        
        $api_test_result_html = '';
        if (isset($_POST['novin_chatbot_action']) && $_POST['novin_chatbot_action'] === 'test_api_connection') {
            if (isset($_POST['_wpnonce_test_api']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_wpnonce_test_api'])), 'novin_chatbot_test_api_nonce')) {
                $current_api_key_for_test = isset($this->options['api_key']) ? $this->options['api_key'] : '';
                if (!empty($current_api_key_for_test)) {
                    $test_prompt_payload = array(array('role' => 'user', 'parts' => array(array('text' => 'سلام، این یک پیام تست برای بررسی اتصال به API است. لطفا فقط با عبارت "اتصال موفق" پاسخ دهید.'))));
                    $test_response = $this->call_gemini_api($test_prompt_payload, $current_api_key_for_test);
                    
                    if (strpos($test_response, "اتصال موفق") !== false && strpos($test_response, "خطا") === false) {
                        $api_test_result_html = '<div class="notice notice-success is-dismissible"><p>✅ تست اتصال به API موفق بود!</p><p><strong>پاسخ دریافتی:</strong> ' . esc_html($test_response) . '</p></div>';
                    } else {
                        $api_test_result_html = '<div class="notice notice-error is-dismissible"><p>❌ تست اتصال به API ناموفق بود.</p><p><strong>پاسخ/خطای دریافتی:</strong> ' . esc_html($test_response) . '</p><p>لطفا کلید API و تنظیمات دیگر را بررسی کرده و لاگ‌های خطای سرور را مشاهده کنید.</p></div>';
                    }
                } else {
                     $api_test_result_html = '<div class="notice notice-warning is-dismissible"><p>⚠️ برای تست اتصال، ابتدا باید کلید API را در تنظیمات وارد و ذخیره کنید.</p></div>';
                }
            } else {
                $api_test_result_html = '<div class="notice notice-error is-dismissible"><p>خطای امنیتی در ارسال درخواست تست.</p></div>';
            }
        }
        ?>
        <div class="wrap novinweb-chatbot-admin-page">
            <h1>تنظیمات دستیار هوش مصنوعی نوین وب 🚀</h1>
            <p class="description">در این صفحه می‌توانید تنظیمات مربوط به چت‌بات هوش مصنوعی وب‌سایت خود را مدیریت کنید. پس از تغییر هر یک از مقادیر، روی دکمه "ذخیره تنظیمات" کلیک کنید.</p>

            <?php settings_errors(); ?>
            <?php echo $api_test_result_html; ?>

            <div class="admin-card">
                <h2>🔧 تست اتصال API</h2>
                <p>برای اطمینان از صحت کلید API و عملکرد ربات، پس از ذخیره کلید API، اتصال را تست کنید:</p>
                <form method="post" action="">
                    <input type="hidden" name="novin_chatbot_action" value="test_api_connection">
                    <?php wp_nonce_field('novin_chatbot_test_api_nonce', '_wpnonce_test_api'); ?>
                    <input type="submit" class="button button-secondary" value="تست اتصال به Gemini API">
                </form>
            </div>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('novin_web_chatbot_settings_group'); 
                do_settings_sections('novinweb-ai-chatbot-settings');    
                submit_button('ذخیره تنظیمات');
                ?>
            </form>
            
            <div class="admin-card">
                <h2>💡 راهنمای استفاده از فیلدها</h2>
                <p><strong>پرامپت سیستم (System Prompt):</strong> پرامپت سیستم مجموعه‌ای از دستورالعمل‌هاست که به هوش مصنوعی می‌گوید چگونه رفتار کند، چه شخصیتی داشته باشد، در چه زمینه‌هایی تخصص دارد و چگونه باید به سوالات پاسخ دهد. فیلدهای بالا به شما کمک می‌کنند تا این پرامپت را به صورت ساختاریافته برای ربات خود تعریف کنید.</p>
                <ul>
                    <li><strong>نام ربات و برند:</strong> به ربات کمک می‌کند خود را به درستی معرفی کند.</li>
                    <li><strong>توضیحات و خدمات شرکت:</strong> اطلاعاتی که ربات می‌تواند برای معرفی شرکت شما استفاده کند.</li>
                    <li><strong>حوزه‌های تخصصی:</strong> مشخص می‌کند ربات در چه زمینه‌هایی باید پاسخگو باشد.</li>
                    <li><strong>لحن پاسخ‌دهی و دستورالعمل‌های اضافی:</strong> نحوه تعامل ربات با کاربران را تعیین می‌کند.</li>
                    <li><strong>پیام خوشامدگویی و پیام خارج از تخصص:</strong> پیام‌های آماده‌ای که ربات در شرایط خاص استفاده می‌کند.</li>
                </ul>
                <p>با تنظیم دقیق این موارد، می‌توانید تجربه کاربری بهتری را برای بازدیدکنندگان سایت خود فراهم کنید.</p>
            </div>
        </div>
        <?php
    }
    
    // == CPT, REST API, Admin Columns, Meta Box for Chatbot Requests ==

    public function register_chatbot_requests_cpt() {
        $labels = array(
            'name'               => _x('درخواست‌های چت‌بات', 'post type general name', 'novinweb-ai-chatbot'),
            'singular_name'      => _x('درخواست چت‌بات', 'post type singular name', 'novinweb-ai-chatbot'),
            'menu_name'          => _x('درخواست‌های چت‌بات', 'admin menu', 'novinweb-ai-chatbot'),
            'name_admin_bar'     => _x('درخواست چت‌بات', 'add new on admin bar', 'novinweb-ai-chatbot'),
            'add_new'            => _x('افزودن جدید', 'chatbot_request', 'novinweb-ai-chatbot'),
            'add_new_item'       => __('افزودن درخواست چت‌بات جدید', 'novinweb-ai-chatbot'),
            'new_item'           => __('درخواست چت‌بات جدید', 'novinweb-ai-chatbot'),
            'edit_item'          => __('ویرایش درخواست چت‌بات', 'novinweb-ai-chatbot'),
            'view_item'          => __('مشاهده درخواست چت‌بات', 'novinweb-ai-chatbot'),
            'all_items'          => __('همه درخواست‌ها', 'novinweb-ai-chatbot'),
            'search_items'       => __('جستجوی درخواست‌ها', 'novinweb-ai-chatbot'),
            'parent_item_colon'  => __('والد درخواست:', 'novinweb-ai-chatbot'),
            'not_found'          => __('هیچ درخواستی یافت نشد.', 'novinweb-ai-chatbot'),
            'not_found_in_trash' => __('هیچ درخواستی در سطل زباله یافت نشد.', 'novinweb-ai-chatbot')
        );

        $args = array(
            'labels'             => $labels,
            'public'             => false, //  قابل مشاهده عمومی نیست
            'publicly_queryable' => false,
            'show_ui'            => true,  // نمایش در پیشخوان
            'show_in_menu'       => false, // توسط add_menu_page مدیریت می‌شود
            'query_var'          => false,
            'rewrite'            => false,
            'capability_type'    => 'post',
            'has_archive'        => false,
            'hierarchical'       => false,
            'menu_position'      => null,
            'menu_icon'          => 'dashicons-format-chat',
            'supports'           => array('title', 'editor'), // 'title' for summary, 'editor' for full chat
            'capabilities' => array( // جلوگیری از ایجاد توسط کاربران عادی از طریق "افزودن جدید"
                 'create_posts' => 'manage_options', // یا یک capability سفارشی
            ),
            'map_meta_cap' => true, // برای create_posts
        );
        register_post_type('chatbot_request', $args);
    }

    public function set_chatbot_request_columns($columns) {
        unset($columns['date']); // حذف ستون پیش‌فرض تاریخ
        $new_columns = array();
        $new_columns['title'] = __('خلاصه چت', 'novinweb-ai-chatbot'); // عنوان به خلاصه تغییر می‌کند
        $new_columns['user_email'] = __('ایمیل کاربر', 'novinweb-ai-chatbot');
        $new_columns['user_phone'] = __('شماره تماس', 'novinweb-ai-chatbot');
        $new_columns['submission_status'] = __('وضعیت رسیدگی', 'novinweb-ai-chatbot');
        $new_columns['submission_date'] = __('تاریخ ارسال', 'novinweb-ai-chatbot');
        return array_merge($new_columns, $columns); // title اول می‌آید
    }

    public function render_chatbot_request_columns($column, $post_id) {
        switch ($column) {
            case 'user_email':
                echo esc_html(get_post_meta($post_id, '_user_email', true));
                break;
            case 'user_phone':
                echo esc_html(get_post_meta($post_id, '_user_phone', true));
                break;
            case 'submission_status':
                $status = get_post_meta($post_id, '_submission_status', true);
                echo $status === 'read' ? __('خوانده شده', 'novinweb-ai-chatbot') : __('خوانده نشده', 'novinweb-ai-chatbot');
                break;
            case 'submission_date':
                echo esc_html(get_the_date('Y/m/d H:i:s', $post_id));
                break;
        }
    }

    public function add_chatbot_request_status_meta_box() {
        add_meta_box(
            'chatbot_request_status',
            __('وضعیت رسیدگی به درخواست', 'novinweb-ai-chatbot'),
            array($this, 'render_chatbot_request_status_meta_box_content'),
            'chatbot_request',
            'side',
            'default'
        );
        add_meta_box(
            'chatbot_request_details',
            __('جزئیات درخواست کاربر', 'novinweb-ai-chatbot'),
            array($this, 'render_chatbot_request_details_meta_box_content'),
            'chatbot_request',
            'normal',
            'high'
        );
    }

    public function render_chatbot_request_status_meta_box_content($post) {
        wp_nonce_field('save_chatbot_request_status', 'chatbot_request_status_nonce');
        $status = get_post_meta($post->ID, '_submission_status', true);
        ?>
        <p>
            <label for="submission_status_unread">
                <input type="radio" name="submission_status" id="submission_status_unread" value="unread" <?php checked($status, 'unread'); checked(empty($status), true); ?>>
                <?php _e('خوانده نشده', 'novinweb-ai-chatbot'); ?>
            </label>
        </p>
        <p>
            <label for="submission_status_read">
                <input type="radio" name="submission_status" id="submission_status_read" value="read" <?php checked($status, 'read'); ?>>
                <?php _e('خوانده شده', 'novinweb-ai-chatbot'); ?>
            </label>
        </p>
        <?php
    }
     public function render_chatbot_request_details_meta_box_content($post) {
        $email = get_post_meta($post->ID, '_user_email', true);
        $phone = get_post_meta($post->ID, '_user_phone', true);
        // متن کامل چت در post_content ذخیره می‌شود. خلاصه در post_title.
        ?>
        <p><strong><?php _e('ایمیل کاربر:', 'novinweb-ai-chatbot'); ?></strong> <?php echo esc_html($email); ?></p>
        <p><strong><?php _e('شماره تماس کاربر:', 'novinweb-ai-chatbot'); ?></strong> <?php echo esc_html($phone ? $phone : 'وارد نشده'); ?></p>
        <hr>
        <p><strong><?php _e('خلاصه گفتگو (عنوان پست):', 'novinweb-ai-chatbot'); ?></strong></p>
        <p><em><?php echo esc_html($post->post_title); ?></em></p>
        <hr>
        <p><strong><?php _e('متن کامل گفتگو (محتوای پست):', 'novinweb-ai-chatbot'); ?></strong></p>
        <div><?php echo wpautop(esc_html($post->post_content)); // یا اگر HTML ذخیره می‌کنید wp_kses_post ?></div>
        <?php
    }


    public function save_chatbot_request_status_meta($post_id) {
        if (!isset($_POST['chatbot_request_status_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chatbot_request_status_nonce'])), 'save_chatbot_request_status')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        if (isset($_POST['submission_status'])) {
            update_post_meta($post_id, '_submission_status', sanitize_text_field(wp_unslash($_POST['submission_status'])));
        }
    }

    public function register_chatbot_rest_routes() {
        register_rest_route('chatbot/v1', '/submit', array(
            'methods' => WP_REST_Server::CREATABLE, // POST
            'callback' => array($this, 'handle_chat_submission_endpoint'),
            'permission_callback' => array($this, 'verify_chat_submission_nonce'),
             'args' => array( // تعریف پارامترهای مورد انتظار
                'summary' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ),
                'full_chat' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field', // یا wp_kses_post اگر HTML مجاز است
                ),
                'email' => array(
                    'required' => true,
                    'type' => 'string',
                    'format' => 'email',
                    'sanitize_callback' => 'sanitize_email',
                ),
                'phone' => array(
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
        ));
    }

    public function verify_chat_submission_nonce(WP_REST_Request $request) {
        $nonce = $request->get_header('X-WP-Nonce');
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_Error(
                'rest_forbidden',
                esc_html__('Nonce verification failed. Invalid or missing X-WP-Nonce header.', 'novinweb-ai-chatbot'),
                array('status' => 403)
            );
        }
        return true;
    }

    public function handle_chat_submission_endpoint(WP_REST_Request $request) {
        $params = $request->get_params();

        $summary = $params['summary'];
        $full_chat = $params['full_chat']; // این باید رشته‌ای از تاریخچه چت باشد
        $email = $params['email'];
        $phone = isset($params['phone']) ? $params['phone'] : '';

        // ایجاد پست جدید از نوع chatbot_request
        $post_id = wp_insert_post(array(
            'post_title'   => wp_strip_all_tags($summary), // خلاصه چت به عنوان عنوان
            'post_content' => $full_chat,                 // متن کامل چت
            'post_status'  => 'publish',                 // یا 'private' اگر نمی‌خواهید مستقیم منتشر شود
            'post_type'    => 'chatbot_request',
        ));

        if (is_wp_error($post_id)) {
            return new WP_REST_Response(array('success' => false, 'message' => $post_id->get_error_message()), 500);
        }

        // ذخیره اطلاعات اضافی به عنوان متا
        update_post_meta($post_id, '_user_email', $email);
        update_post_meta($post_id, '_user_phone', $phone);
        update_post_meta($post_id, '_submission_status', 'unread'); // وضعیت اولیه

        // پاک کردن سشن تاریخچه چت پس از ارسال موفق (اختیاری)
        if (session_id()) {
            unset($_SESSION['ai_chatbot_conversation_history']);
        }


        return new WP_REST_Response(array('success' => true, 'message' => 'درخواست با موفقیت ثبت شد.', 'post_id' => $post_id), 200);
    }

    public function activate() {
        if (false === get_option('novin_web_chatbot_options')) {
            add_option('novin_web_chatbot_options', $this->get_default_options());
        }
        // Register CPT on activation as well
        $this->register_chatbot_requests_cpt();
        flush_rewrite_rules();

        // Start session if not already started, for storing chat history
        if (!session_id()) {
            session_start();
        }
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
}

// راه‌اندازی افزونه
if (class_exists('AI_Chatbot_Plugin')) {
    new AI_Chatbot_Plugin();
}
?>
