$(document).ready(function() {
    // Initialize for all inputs with placeholder class
    $('.placeholder').each(function() {
        const $input = $(this);
        const placeholder = $input.attr('placeholder');
        
        if (placeholder) {
            // Create floating label
            const $label = $('<span class="floating-label"></span>')
                .text(placeholder)
                .insertAfter($input);
            
            // Check initial value
            if ($input.val().trim() !== '') {
                $input.addClass('floating');
                $label.addClass('active');
            }
        }
    });

    // Focus event
    $('.placeholder').on('focus', function() {
        const $input = $(this);
        const $label = $input.siblings('.floating-label');
        
        $input.addClass('floating');
        $label.addClass('active');
    });

    // Blur event
    $('.placeholder').on('blur', function() {
        const $input = $(this);
        const $label = $input.siblings('.floating-label');
        
        if ($input.val().trim() === '') {
            $input.removeClass('floating');
            $label.removeClass('active');
        }
    });

    // Input change event
    $('.placeholder').on('input', function() {
        const $input = $(this);
        const $label = $input.siblings('.floating-label');
        
        if ($input.val().trim() !== '') {
            $input.addClass('floating');
            $label.addClass('active');
        } else {
            $input.removeClass('floating');
            $label.removeClass('active');
        }
    });
});