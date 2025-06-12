jQuery(document).ready(function($) {
    'use strict';

    var form = $('#mds_device_order_form');
    var formContainer = $('#mds-multi-step-form');

    var mds_form_i18n = window.mds_form_i18n || {
        previous: 'Previous',
        next: 'Next',
        submit_order: 'Submit Order',
        select_or_upload_images: 'Select or Upload Images',
        use_this_image: 'Use this image',
        max_5_images: 'You can only select up to 5 images.'
    };

    formContainer.on('click', '.mds-next-step, .mds-prev-step', function(e) {
        e.preventDefault();
        var button = $(this);
        var targetStep = parseInt(button.data('target_step'));
        var currentStep = parseInt(form.find('input[name="current_step"]').val());
        var direction = button.hasClass('mds-next-step') ? 'next' : 'prev';

        var stepData = {};
        if (direction === 'next') {
            form.find('[name^="mds_step_' + currentStep + '_"]').each(function() {
                stepData[this.name] = $(this).val();
            });
        }
        stepData['current_step_for_validation'] = currentStep;

        formContainer.addClass('mds-loading');
        button.prop('disabled', true);
        formContainer.find('.mds-form-navigation button').not(button).prop('disabled', true);
        formContainer.find('.mds-form-errors').remove();

        $.ajax({
            url: mds_form_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'mds_form_step_handler',
                nonce: mds_form_ajax.nonce,
                current_step: currentStep,
                target_step: targetStep,
                direction: direction,
                form_data: stepData
            },
            success: function(response) {
                if (response.success) {
                    $('.mds-form-steps').html(response.data.html);
                    form.find('input[name="current_step"]').val(response.data.current_step);
                    updateStepIndicators(response.data.current_step);
                    // updateNavigationButtons is called in complete()
                } else {
                    var errorHtml = '<div class="mds-form-errors"><p>' + response.data.message + '</p>';
                    if (response.data.errors && !$.isEmptyObject(response.data.errors)) {
                        errorHtml += '<ul>';
                        $.each(response.data.errors, function(key, value) {
                            errorHtml += '<li>' + value + '</li>';
                        });
                        errorHtml += '</ul>';
                    }
                    errorHtml += '</div>';
                    formContainer.find('.mds-form-steps').prepend(errorHtml);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var errorMsg = 'An AJAX error occurred: ' + textStatus + ' - ' + errorThrown;
                if (jqXHR.responseText) {
                     errorMsg += '<br><pre>' + jqXHR.responseText.substring(0, 500) + '...</pre>';
                }
                var errorHtml = '<div class="mds-form-errors"><p>' + errorMsg + '</p></div>';
                formContainer.find('.mds-form-steps').prepend(errorHtml);
            },
            complete: function() {
                formContainer.removeClass('mds-loading');
                // Update buttons based on the new current step, regardless of success/error
                updateNavigationButtons(parseInt(form.find('input[name="current_step"]').val()), 5);
            }
        });
    });

    function updateStepIndicators(currentStep) {
        $('.mds-step-indicator').removeClass('active completed');
        $('.mds-step-indicator').each(function(index) {
            var step = index + 1;
            if (step < currentStep) {
                $(this).addClass('completed');
            } else if (step === currentStep) {
                $(this).addClass('active');
            }
        });
    }

    function updateNavigationButtons(currentStep, totalSteps) {
        var navContainer = $('.mds-form-navigation');
        navContainer.empty();

        if (currentStep > 1) {
            navContainer.append('<button type="button" class="mds-prev-step" data-target_step="' + (currentStep - 1) + '">' + mds_form_i18n.previous + '</button>');
        }

        if (currentStep < totalSteps) {
            navContainer.append('<button type="button" class="mds-next-step" data-target_step="' + (currentStep + 1) + '">' + mds_form_i18n.next + '</button>');
        } else {
            navContainer.append('<button type="submit" name="mds_form_submit" class="mds-submit-form">' + mds_form_i18n.submit_order + '</button>');
        }
    }

    var initialStep = parseInt(form.find('input[name="current_step"]').val());
    updateStepIndicators(initialStep);
    updateNavigationButtons(initialStep, 5);


    // Image Uploader Logic
    var frame; // Keep frame variable outside the click handler to reuse it
    formContainer.on('click', '#mds-upload-image-button', function(e) {
        e.preventDefault();
        var imageList = $('#mds-image-preview-list');
        var imageInput = $('#mds_step_3_images_data');

        if (frame) {
            frame.open();
            return;
        }

        frame = wp.media({
            title: mds_form_i18n.select_or_upload_images,
            button: {
                text: mds_form_i18n.use_this_image
            },
            multiple: 'add'
        });

        frame.on('select', function() {
            var selection = frame.state().get('selection');
            var currentImages = [];
            try {
                // Ensure that imageInput.val() is valid JSON or default to an empty array string
                var currentJson = imageInput.val();
                if (typeof currentJson === 'string' && currentJson.trim() !== "" && currentJson.trim() !== "null") {
                     currentImages = JSON.parse(currentJson);
                     if (!Array.isArray(currentImages)) currentImages = []; // Ensure it's an array
                } else {
                    currentImages = [];
                }
            } catch (e) {
                console.error("Error parsing images_data JSON:", e, imageInput.val());
                currentImages = []; // Fallback to empty array on error
            }

            var newImageCount = currentImages.length;

            selection.each(function(attachment) {
                if (newImageCount < 5) {
                    var attachmentUrl = attachment.attributes.url;
                    // Prefer thumbnail for preview if available
                    if (attachment.attributes.sizes && attachment.attributes.sizes.thumbnail) {
                        attachmentUrl = attachment.attributes.sizes.thumbnail.url;
                    }

                    // Check if image already added (simple URL check)
                    if (currentImages.indexOf(attachmentUrl) === -1) {
                        currentImages.push(attachmentUrl);
                        imageList.append('<li><img src="' + esc_url(attachmentUrl) + '" width="100" /> <button type="button" class="mds-remove-image" data-imageurl="'+esc_attr(attachmentUrl)+'">Remove</button></li>');
                        newImageCount++;
                    }
                } else {
                     alert(mds_form_i18n.max_5_images);
                     return false;
                }
            });
            imageInput.val(JSON.stringify(currentImages));
        });
        frame.open();
    });

    formContainer.on('click', '.mds-remove-image', function(e){
        e.preventDefault();
        var imageUrlToRemove = $(this).data('imageurl');
        var imageInput = $('#mds_step_3_images_data');
        var currentImages = [];
         try {
            var currentJson = imageInput.val();
            if (typeof currentJson === 'string' && currentJson.trim() !== "" && currentJson.trim() !== "null") {
                 currentImages = JSON.parse(currentJson);
                 if (!Array.isArray(currentImages)) currentImages = [];
            } else {
                currentImages = [];
            }
        } catch (e) {
            console.error("Error parsing images_data JSON for removal:", e, imageInput.val());
            currentImages = [];
        }

        currentImages = currentImages.filter(function(url) {
            return url !== imageUrlToRemove;
        });

        imageInput.val(JSON.stringify(currentImages));
        $(this).closest('li').remove();
    });

    function esc_url(url) {
        if (typeof url !== 'string') return '';
        return url.replace(/[<>"']/g, function(match) {
            switch (match) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;'; // Note: &#039; is HTML entity for single quote
                default: return match;
            }
        });
    }
    function esc_attr(attr) {
        if (typeof attr !== 'string') attr = String(attr);
        return attr.replace(/[<>"'&]/g, function(match) {
            switch (match) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
                case '&': return '&amp;';
                default: return match;
            }
        });
    }
});
