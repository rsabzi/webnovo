jQuery(document).ready(function($) {
    const chatbot = {
        isOpen: false,
        
        init: function() {
            this.bindEvents();
        },
        
        bindEvents: function() {
            $("#ai-chatbot-toggle").on("click", this.toggleChat);
            $("#ai-chatbot-close").on("click", this.toggleChat);
            $("#ai-chatbot-send").on("click", this.sendMessage);
            $("#ai-chatbot-input").on("keypress", function(e) {
                if (e.which === 13) {
                    chatbot.sendMessage();
                }
            });
        },
        
        toggleChat: function() {
            const window = $("#ai-chatbot-window");
            
            if (chatbot.isOpen) {
                window.slideUp(300);
                chatbot.isOpen = false;
            } else {
                window.slideDown(300);
                chatbot.isOpen = true;
                $("#ai-chatbot-input").focus();
            }
        },
        
        sendMessage: function() {
            const input = $("#ai-chatbot-input");
            const message = input.val().trim();
            
            if (!message) return;
            
            // اضافه کردن پیام کاربر
            chatbot.addMessage(message, "user");
            input.val("");
            
            // نمایش لودینگ
            chatbot.addMessage(`<div class="loading"></div>`, "ai", true);
            
            // ارسال درخواست AJAX
            $.ajax({
                url: ai_chatbot_ajax.ajax_url,
                type: "POST",
                data: {
                    action: "ai_chatbot_message",
                    message: message,
                    nonce: ai_chatbot_ajax.nonce
                },
                success: function(response) {
                    // حذف پیام لودینگ
                    $(".ai-message").last().remove();
                    
                    if (response.success) {
                        chatbot.addMessage(response.data.message, "ai");
                    } else {
                        chatbot.addMessage("متاسفانه خطایی رخ داده است. لطفا دوباره تلاش کنید.", "ai");
                    }
                },
                error: function() {
                    // حذف پیام لودینگ
                    $(".ai-message").last().remove();
                    chatbot.addMessage("خطا در اتصال به سرور. لطفا دوباره تلاش کنید.", "ai");
                }
            });
        },
        
        addMessage: function(text, sender, isLoading = false) {
            const messagesContainer = $("#ai-chatbot-messages");
            const messageClass = sender === "user" ? "user-message" : "ai-message";
            
            const messageHtml = `<div class="${messageClass}">${text}</div>`;
            messagesContainer.append(messageHtml);
            
            // اسکرول به پایین
            messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
        }
    };
    
    chatbot.init();
});
// chatbot.js
jQuery(document).ready(function($) {
    // ... (کدهای قبلی شما برای ارسال پیام و غیره) ...

    const chatbotWindow = $('#ai-chatbot-window');
    const messagesContainer = $('#ai-chatbot-messages');
    const sendToManagementBtn = $('#ai-chatbot-send-to-management');
    const contactModal = $('#ai-chatbot-contact-modal');
    const contactModalCloseBtn = contactModal.find('.chatbot-modal-close');
    const contactForm = $('#ai-chatbot-contact-form');
    const userEmailInput = $('#chatbot-user-email');
    const userPhoneInput = $('#chatbot-user-phone');
    const submissionStatusDiv = $('#chatbot-submission-status');
    const submitContactInfoBtn = $('#chatbot-submit-contact-info');

    // متغیر برای نگهداری خلاصه چت
    let currentChatSummary = '';
    // متغیر برای نگهداری تاریخچه کامل چت به صورت رشته
    let currentFullChatHistoryText = '';
    // تاریخچه چت به صورت آرایه برای ارسال به API و خلاصه‌سازی
    let chatHistoryArray = ai_chatbot_ajax.initial_chat_history || []; 

    // به‌روزرسانی تاریخچه چت با هر پیام کاربر و ربات
    // (شما باید این بخش را در تابع ارسال پیام خود ادغام کنید)
    // مثال:
    // function appendMessage(message, type) {
    //     ...
    //     if (type === 'user') {
    //         chatHistoryArray.push({ role: 'user', parts: [{ text: message }] });
    //     } else if (type === 'ai') { // یا 'model' بسته به اینکه چگونه در PHP ذخیره می‌کنید
    //         chatHistoryArray.push({ role: 'model', parts: [{ text: message }] });
    //     }
    //     ...
    // }
    // همچنین تابع addMessageToChat که در کد اصلی شما برای اضافه کردن پیام به UI استفاده می‌شود:
    // باید مطمئن شوید که پیام‌ها به chatHistoryArray هم اضافه می‌شوند.
    // اگر پیام اولیه از PHP می‌آید:
    // if (ai_chatbot_ajax.initial_chat_history && ai_chatbot_ajax.initial_chat_history.length > 0) {
    //     ai_chatbot_ajax.initial_chat_history.forEach(item => {
    //         // addMessageToChat(item.parts[0].text, item.role === 'user' ? 'user-message' : 'ai-message');
    //     });
    // }


    // رویداد کلیک روی دکمه "ارسال نتیجه برای مدیریت"
    sendToManagementBtn.on('click', function() {
        if ($(this).is(':disabled')) return;

        // 1. جمع‌آوری تاریخچه چت
        // اگر chatHistoryArray را به‌روز نگه داشته‌اید، اینجا مستقیم از آن استفاده کنید
        // در غیر این صورت، باید از DOM بخوانید:
        collectChatHistoryFromDOM(); // این تابع باید پیاده‌سازی شود یا از chatHistoryArray استفاده شود

        if (chatHistoryArray.length === 0) {
            alert('تاریخچه چت برای ارسال خالی است.');
            return;
        }
        
        currentFullChatHistoryText = convertChatHistoryArrayToText(chatHistoryArray);

        setSubmissionStatus(ai_chatbot_ajax.text_summarizing, 'loading', true); // نمایش پیام در حال خلاصه‌سازی
        sendToManagementBtn.prop('disabled', true);

        // 2. ارسال برای خلاصه‌سازی
        $.ajax({
            url: ai_chatbot_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'summarize_chat_for_submission',
                nonce: ai_chatbot_ajax.summarize_nonce,
                chat_history: JSON.stringify(chatHistoryArray) // ارسال آرایه تاریخچه
            },
            success: function(response) {
                if (response.success && response.data.summary) {
                    currentChatSummary = response.data.summary.replace(/<br\s*\/?>/gi, "\n"); // تبدیل <br> به newline برای textarea
                    setSubmissionStatus('', 'clear'); // پاک کردن پیام خلاصه‌سازی
                    // 3. نمایش مودال فرم تماس
                    contactModal.fadeIn(300);
                } else {
                    const errorMsg = response.data && response.data.summary ? response.data.summary : ai_chatbot_ajax.text_summary_error;
                    setSubmissionStatus(errorMsg, 'error');
                    sendToManagementBtn.prop('disabled', false);
                }
            },
            error: function() {
                setSubmissionStatus(ai_chatbot_ajax.text_summary_error, 'error');
                sendToManagementBtn.prop('disabled', false);
            }
        });
    });

    // بستن مودال تماس
    contactModalCloseBtn.on('click', function() {
        contactModal.fadeOut(300);
        sendToManagementBtn.prop('disabled', false); // فعال کردن مجدد دکمه اصلی
        setSubmissionStatus('', 'clear'); // پاک کردن هرگونه پیام وضعیت قبلی
    });

    // بستن مودال با کلیک بیرون از آن
    $(window).on('click', function(event) {
        if (event.target == contactModal[0]) { // بررسی اینکه کلیک روی خود مودال (پس‌زمینه) بوده
            contactModal.fadeOut(300);
            sendToManagementBtn.prop('disabled', false);
            setSubmissionStatus('', 'clear');
        }
    });

    // ارسال فرم اطلاعات تماس
    contactForm.on('submit', function(e) {
        e.preventDefault();
        if (submitContactInfoBtn.is(':disabled')) return;

        const userEmail = userEmailInput.val().trim();
        const userPhone = userPhoneInput.val().trim();

        if (!userEmail) {
            alert('لطفا ایمیل خود را وارد کنید.');
            userEmailInput.focus();
            return;
        }
        // اعتبار سنجی ساده ایمیل
        if (!isValidEmail(userEmail)) {
            alert('لطفا یک آدرس ایمیل معتبر وارد کنید.');
            userEmailInput.focus();
            return;
        }


        setSubmissionStatus('در حال ارسال اطلاعات...', 'loading', true, true); // نمایش پیام در مودال
        submitContactInfoBtn.prop('disabled', true);

        // 4. ارسال به REST API
        fetch(ai_chatbot_ajax.rest_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': ai_chatbot_ajax.rest_api_nonce
            },
            body: JSON.stringify({
                summary: currentChatSummary,
                full_chat: currentFullChatHistoryText, // ارسال متن کامل چت
                email: userEmail,
                phone: userPhone
            })
        })
        .then(response => {
            if (!response.ok) {
                // اگر سرور کد وضعیت خطا برگرداند (مثلا 400, 500)
                return response.json().then(errData => {
                    throw new Error(errData.message || `HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setSubmissionStatus(ai_chatbot_ajax.text_submission_success, 'success', true, true);
                // 5. نمایش پیام موفقیت به کاربر
                // می‌توانید پنجره چت را هم ببندید یا تاریخچه را پاک کنید
                setTimeout(() => {
                    contactModal.fadeOut(300);
                    // chatbotWindow.hide(); // یا هر عملیات دیگری
                    // messagesContainer.html('<div class="ai-message">' + ai_chatbot_ajax.initial_greeting_message_after_submission_or_similar + '</div>'); // پاک کردن تاریخچه UI
                    chatHistoryArray = []; // پاک کردن تاریخچه در JS
                }, 3000); // نمایش پیام برای ۳ ثانیه
            } else {
                const errorMsg = data.message || ai_chatbot_ajax.text_submission_error;
                setSubmissionStatus(errorMsg, 'error', true, true);
            }
        })
        .catch(error => {
            console.error('Error submitting chat to management:', error);
            setSubmissionStatus(error.message || ai_chatbot_ajax.text_submission_error, 'error', true, true);
        })
        .finally(() => {
            // دکمه ارسال فرم تماس را فقط در صورت خطا دوباره فعال کنید
            // در صورت موفقیت، مودال بسته می‌شود و نیازی به فعال‌سازی مجدد نیست.
             if (!submissionStatusDiv.hasClass('success')) {
                submitContactInfoBtn.prop('disabled', false);
             }
             sendToManagementBtn.prop('disabled', false); // دکمه اصلی همیشه باید فعال شود
        });
    });

    // تابع برای نمایش پیام وضعیت
    function setSubmissionStatus(message, type, showInModal = false, persistentInModal = false) {
        const statusElement = showInModal ? submissionStatusDiv : $('#ai-chatbot-messages'); // اگر در مودال نیست، در پنجره چت نمایش بده (یا یک المنت جدید بسازید)
        
        if (type === 'clear') {
            statusElement.hide().html('');
            return;
        }

        if (showInModal) {
            submissionStatusDiv.html(message).removeClass('success error loading').addClass(type).show();
        } else {
            // برای نمایش در پنجره چت اصلی، می‌توانید یک div موقت اضافه کنید
            // یا پیام را به messagesContainer اضافه کنید.
            // برای سادگی، اینجا فقط در کنسول لاگ می‌زنیم اگر قرار نیست در مودال باشد و persistent نباشد.
            if (!persistentInModal) { // اگر قرار نیست در مودال پایدار بماند (مثلا پیام "در حال خلاصه سازی")
                 const tempStatusDiv = $('<div class="status-message"></div>').addClass(type).html(message);
                 messagesContainer.append(tempStatusDiv);
                 messagesContainer.scrollTop(messagesContainer[0].scrollHeight); // اسکرول به پایین
                 if (type !== 'loading') { // پیام‌های غیر لودینگ بعد از مدتی محو شوند
                     setTimeout(() => tempStatusDiv.fadeOut(500, () => tempStatusDiv.remove()), 3000);
                 } else {
                     // اگر لودینگ است، با setSubmissionStatus('', 'clear') باید حذف شود
                 }
            }
        }
    }
    
    // تابع برای جمع‌آوری تاریخچه از DOM (اگر chatHistoryArray به‌روز نیست)
    function collectChatHistoryFromDOM() {
        chatHistoryArray = []; // اول خالی کنید
        $('#ai-chatbot-messages').children().each(function() {
            const messageDiv = $(this);
            let role = '';
            let text = '';

            if (messageDiv.hasClass('user-message')) {
                role = 'user';
                text = messageDiv.text().trim(); // یا .html() اگر HTML داخلی مهم است
            } else if (messageDiv.hasClass('ai-message')) {
                role = 'model'; 
                // باید دقت کنید که پیام اولیه و پیام‌های هوش مصنوعی ممکن است HTML داشته باشند
                // بهتر است متن خالص را استخراج کنید.
                text = messageDiv.html().replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, '').trim();
            }

            if (role && text) {
                chatHistoryArray.push({ role: role, parts: [{ text: text }] });
            }
        });
    }

    // تابع برای تبدیل آرایه تاریخچه به یک رشته متنی خوانا (برای ارسال به عنوان full_chat)
    function convertChatHistoryArrayToText(historyArray) {
        let textHistory = "";
        historyArray.forEach(entry => {
            const speaker = entry.role === 'user' ? "کاربر" : (ai_chatbot_ajax.bot_name || "چت‌بات");
            textHistory += `${speaker}: ${entry.parts[0].text}\n\n`;
        });
        return textHistory.trim();
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // تابع کمکی برای اضافه کردن پیام‌ها به chatHistoryArray
    // این تابع باید در محلی که پیام‌ها به UI اضافه می‌شوند (addMessageToChat) فراخوانی شود
    window.addMessageToChatHistory = function(text, role) { // 'user' or 'model'
        if (text && role) {
             // قبل از اضافه کردن، بررسی کنید که پیام تکراری نباشد (مثلا اگر هم از DOM می‌خوانید هم اینجا اضافه می‌کنید)
            const lastMessage = chatHistoryArray.length > 0 ? chatHistoryArray[chatHistoryArray.length - 1] : null;
            if (!lastMessage || !(lastMessage.role === role && lastMessage.parts[0].text === text)) {
                 chatHistoryArray.push({ role: role, parts: [{ text: text }] });
            }
            // محدود کردن طول تاریخچه
            const max_history_items = 20; 
            if (chatHistoryArray.length > max_history_items) {
                chatHistoryArray = chatHistoryArray.slice(-max_history_items);
            }
        }
    };
    
    // در تابع اصلی ارسال پیام به ربات (handleSendMessage یا مشابه آن)
    // قبل از ارسال AJAX به handle_chatbot_message در PHP، تاریخچه را به صورت JSON ارسال کنید:
    // data: {
    //     action: 'ai_chatbot_message',
    //     nonce: ai_chatbot_ajax.nonce, // مطمئن شوید nonce اصلی چت ارسال می‌شود
    //     message: userMessage,
    //     history: JSON.stringify(chatHistoryArray) // ارسال تاریخچه
    // },

    // در پاسخ موفق از handle_chatbot_message:
    // success: function(response) {
    //     if (response.success) {
    //         // ... اضافه کردن پیام ربات به UI ...
    //         addMessageToChatHistory(extractTextFromHtml(response.data.message), 'model'); // یا 'ai'
    //     } else {
    //        // ...
    //     }
    // }
    // function extractTextFromHtml(htmlString) {
    //    return $('<div>').html(htmlString).text();
    // }


});
