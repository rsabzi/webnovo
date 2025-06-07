jQuery(document).ready(function($) {
    // Global variables for chat history and UI elements
    let chatHistoryArray = ai_chatbot_ajax.initial_chat_history || [];
    let currentChatSummary = '';
    let currentFullChatHistoryText = '';
    let isOpen = false; // Tracks chat window state

    const messagesContainer = $('#ai-chatbot-messages');
    const chatbotInput = $("#ai-chatbot-input");
    const chatbotWindow = $('#ai-chatbot-window');

    // Modal related elements
    const sendToManagementBtn = $('#ai-chatbot-send-to-management');
    const contactModal = $('#ai-chatbot-contact-modal');
    const contactModalCloseBtn = contactModal.find('.chatbot-modal-close');
    const contactForm = $('#ai-chatbot-contact-form');
    const userEmailInput = $('#chatbot-user-email');
    const userPhoneInput = $('#chatbot-user-phone');
    const submissionStatusDiv = $('#chatbot-submission-status');
    const submitContactInfoBtn = $('#chatbot-submit-contact-info');

    // Helper function to add messages to the UI
    function addMessageToUI(text, sender) {
        const messageClass = sender === "user" ? "user-message" : "ai-message";
        // Handle potential HTML content for AI messages, ensure plain text for user messages
        const messageHtml = `<div class="${messageClass}">${text}</div>`;
        messagesContainer.append(messageHtml);
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    }

    // Helper function to convert HTML to plain text
    function extractTextFromHtml(htmlString) {
       return $('<div>').html(htmlString).text();
    }

    // Function to add messages to chatHistoryArray
    // This is the function referred to in the subtask
    window.addMessageToChatHistory = function(text, role) { // role: 'user' or 'model'
        if (text && role) {
            const plainText = extractTextFromHtml(text); // Ensure we store plain text
            const lastMessage = chatHistoryArray.length > 0 ? chatHistoryArray[chatHistoryArray.length - 1] : null;
            if (!lastMessage || !(lastMessage.role === role && lastMessage.parts[0].text === plainText)) {
                chatHistoryArray.push({ role: role, parts: [{ text: plainText }] });
            }
            const max_history_items = 20;
            if (chatHistoryArray.length > max_history_items) {
                chatHistoryArray = chatHistoryArray.slice(-max_history_items);
            }
        }
    };

    // Function to handle sending a message
    function sendMessage() {
        const message = chatbotInput.val().trim();
        if (!message) return;

        // Step 1: Add user message to chatHistoryArray
        addMessageToChatHistory(message, 'user');

        addMessageToUI(message, "user"); // Add user message to UI
        chatbotInput.val(""); // Clear input field

        // Display loading indicator (temporary UI message)
        const loadingIndicatorHtml = `<div class="ai-message loading"></div>`;
        messagesContainer.append(loadingIndicatorHtml);
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);

        $.ajax({
            url: ai_chatbot_ajax.ajax_url,
            type: "POST",
            data: {
                action: "ai_chatbot_message",
                message: message,
                nonce: ai_chatbot_ajax.chat_message_nonce,
                history: JSON.stringify(chatHistoryArray) // Send the updated history
            },
            success: function(response) {
                $(".ai-message.loading").remove(); // Remove loading indicator

                if (response.success) {
                    const aiResponseMessage = response.data.message;
                    addMessageToUI(aiResponseMessage, "ai"); // Add AI response to UI

                    // Step 2: Add AI response to chatHistoryArray
                    let plainAiResponse = extractTextFromHtml(aiResponseMessage);
                    addMessageToChatHistory(plainAiResponse, 'model');
                } else {
                    const errorMessage = response.data && response.data.message ? response.data.message : "متاسفانه خطایی رخ داده است. لطفا دوباره تلاش کنید.";
                    addMessageToUI(errorMessage, "ai");
                    // Optionally, add error to history if desired
                    // addMessageToChatHistory(errorMessage, 'model');
                }
            },
            error: function() {
                $(".ai-message.loading").remove(); // Remove loading indicator
                const errorText = "خطا در اتصال به سرور. لطفا دوباره تلاش کنید.";
                addMessageToUI(errorText, "ai");
                // Optionally, add error to history if desired
                // addMessageToChatHistory(errorText, 'model');
            }
        });
    }

    // Function to toggle chat window visibility
    function toggleChat() {
        if (isOpen) {
            chatbotWindow.slideUp(300);
            isOpen = false;
        } else {
            chatbotWindow.slideDown(300);
            isOpen = true;
            chatbotInput.focus();

            // Step 3: Handle Initial Greeting Message
            if (chatHistoryArray.length === 0) {
                const greetingText = $("#ai-chatbot-messages .ai-message").first().text().trim();
                if (greetingText) {
                    addMessageToChatHistory(greetingText, 'model');
                }
            }
        }
    }

    // Bind core chat events
    function bindCoreChatEvents() {
        $("#ai-chatbot-toggle").on("click", toggleChat);
        $("#ai-chatbot-close").on("click", toggleChat);
        $("#ai-chatbot-send").on("click", sendMessage);
        chatbotInput.on("keypress", function(e) {
            if (e.which === 13) {
                sendMessage();
            }
        });
    }

    // Initialize core chat functionality
    bindCoreChatEvents();

    // --- Logic from the second original $(document).ready() block ---

    // رویداد کلیک روی دکمه "ارسال نتیجه برای مدیریت"
    sendToManagementBtn.on('click', function() {
        if ($(this).is(':disabled')) return;

        // If chatHistoryArray is not up-to-date from DOM (e.g. initial load from session),
        // it's better to rely on the JS-maintained chatHistoryArray.
        // collectChatHistoryFromDOM(); // This might be redundant if addMessageToChatHistory is used consistently.

        if (chatHistoryArray.length === 0) {
            alert('تاریخچه چت برای ارسال خالی است.');
            return;
        }
        
        currentFullChatHistoryText = convertChatHistoryArrayToText(chatHistoryArray);

        setSubmissionStatus(ai_chatbot_ajax.text_summarizing, 'loading', true);
        sendToManagementBtn.prop('disabled', true);

        $.ajax({
            url: ai_chatbot_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'summarize_chat_for_submission',
                nonce: ai_chatbot_ajax.summarize_nonce,
                chat_history: JSON.stringify(chatHistoryArray)
            },
            success: function(response) {
                if (response.success && response.data.summary) {
                    currentChatSummary = response.data.summary.replace(/<br\s*\/?>/gi, "\n");
                    setSubmissionStatus('', 'clear');
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

    contactModalCloseBtn.on('click', function() {
        contactModal.fadeOut(300);
        sendToManagementBtn.prop('disabled', false);
        setSubmissionStatus('', 'clear');
    });

    $(window).on('click', function(event) {
        if (event.target == contactModal[0]) {
            contactModal.fadeOut(300);
            sendToManagementBtn.prop('disabled', false);
            setSubmissionStatus('', 'clear');
        }
    });

    contactForm.on('submit', function(e) {
        e.preventDefault();
        if (submitContactInfoBtn.is(':disabled')) return;

        const userEmail = userEmailInput.val().trim();
        const userPhone = userPhoneInput.val().trim();

        if (!userEmail || !isValidEmail(userEmail)) {
            alert('لطفا یک آدرس ایمیل معتبر وارد کنید.');
            userEmailInput.focus();
            return;
        }

        setSubmissionStatus('در حال ارسال اطلاعات...', 'loading', true, true);
        submitContactInfoBtn.prop('disabled', true);

        fetch(ai_chatbot_ajax.rest_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': ai_chatbot_ajax.rest_api_nonce
            },
            body: JSON.stringify({
                summary: currentChatSummary,
                full_chat: currentFullChatHistoryText,
                email: userEmail,
                phone: userPhone
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || `HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setSubmissionStatus(ai_chatbot_ajax.text_submission_success, 'success', true, true);
                setTimeout(() => {
                    contactModal.fadeOut(300);
                    chatHistoryArray = []; // Clear JS history
                    // Potentially clear UI messages too, or show a new greeting
                    // messagesContainer.html('<div class="ai-message">' + ai_chatbot_ajax.text_greeting_after_submission + '</div>');
                }, 3000);
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
             if (!submissionStatusDiv.hasClass('success')) { // Only re-enable if not successful
                submitContactInfoBtn.prop('disabled', false);
             }
             sendToManagementBtn.prop('disabled', false);
        });
    });

    function setSubmissionStatus(message, type, showInModal = false, persistentInModal = false) {
        const statusElement = showInModal ? submissionStatusDiv : $('<div class="status-message"></div>');
        
        if (type === 'clear') {
            if (showInModal) submissionStatusDiv.hide().html('');
            // Temporary messages in chat are removed if not persistent
            return;
        }

        statusElement.html(message).removeClass('success error loading').addClass(type);

        if (showInModal) {
            statusElement.show();
        } else {
            messagesContainer.append(statusElement);
            messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
            if (!persistentInModal && type !== 'loading') {
                 setTimeout(() => statusElement.fadeOut(500, () => statusElement.remove()), 3000);
            } else if (type === 'loading') {
                // Loading messages in chat need to be removed manually by another call to setSubmissionStatus or direct DOM manipulation
            }
        }
    }
    
    function collectChatHistoryFromDOM() { // This function might be less needed now
        chatHistoryArray = [];
        $('#ai-chatbot-messages').children().each(function() {
            const messageDiv = $(this);
            let role = '';
            let text = '';

            if (messageDiv.hasClass('user-message')) {
                role = 'user';
                text = messageDiv.text().trim();
            } else if (messageDiv.hasClass('ai-message')) {
                role = 'model'; 
                text = extractTextFromHtml(messageDiv.html()); // Use existing helper
            }

            if (role && text && !messageDiv.hasClass('loading') && !messageDiv.hasClass('status-message')) { // Avoid adding loading/status messages
                // This check is now inside addMessageToChatHistory, but an extra safety here is fine.
                const lastMessage = chatHistoryArray.length > 0 ? chatHistoryArray[chatHistoryArray.length - 1] : null;
                if (!lastMessage || !(lastMessage.role === role && lastMessage.parts[0].text === text)) {
                     chatHistoryArray.push({ role: role, parts: [{ text: text }] });
                }
            }
        });
    }

    function convertChatHistoryArrayToText(historyArray) {
        let textHistory = "";
        historyArray.forEach(entry => {
            const speaker = entry.role === 'user' ? "کاربر" : (ai_chatbot_ajax.bot_name || "چت‌بات");
            // Assuming entry.parts[0].text is always plain text due to addMessageToChatHistory
            textHistory += `${speaker}: ${entry.parts[0].text}\n\n`;
        });
        return textHistory.trim();
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Initial UI setup if history exists (e.g. from PHP session)
    if (chatHistoryArray.length > 0) {
        chatHistoryArray.forEach(item => {
            // Assuming item.parts[0].text is plain text from the server
            addMessageToUI(item.parts[0].text, item.role === 'user' ? 'user' : 'ai');
        });
    } else {
        // If no history from server, and there's a default greeting in the DOM,
        // it will be added to history when chat is opened (see toggleChat)
    }
});
