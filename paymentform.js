function validform() {
    $('#payment').fadeOut(function () {
        window.scrollTo(0, 0);
        $('#confirmation').show().addClass('animated slideInUp');
    })
}

jQuery(function ($) {
    $('[data-numeric]').payment('restrictNumeric');
    $('.cc-number').payment('formatCardNumber');
    $('.cc-exp').payment('formatCardExpiry');
    $('.cc-cvc').payment('formatCardCVC');
    $.fn.toggleInputError = function (erred) {
        this.parent().closest('.form-group').toggleClass('has-error', erred);
        return this;
    };

    $('.card-inputs').keyup(function () {
        var cardindex = $(this).index();
        if (this.value.length == this.maxLength) {
            $('.card-inputs')[cardindex + 1].focus();
        }
    });

    $('.cc-number').keyup(function () {
        var cardType = $.payment.cardType($('.cc-number').val());
        $(this).toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
        var icon
        switch (cardType) {
            case 'visa':
                icon = "<i class='fa fa-cc-visa' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Visa Card'></i>";
                break;
            case 'mastercard':
                icon = "<i class='fa fa-cc-mastercard' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Master Card'></i>";
                break;
            case 'amex':
                icon = "<i class='fa fa-cc-amex' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Amex'></i>";
                break;
            case 'diners':
                icon = "<i class='fa fa-cc-diners' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Diners'></i>";
                break;
            case 'discover':
                icon = "<i class='fa fa-cc-discover' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Discover'></i>";
                break;
            case 'unionpay':
                icon = "<i class='fa fa-cc-unionpay' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Union Pay'></i>";
                break;
            case 'jcb':
                icon = "<i class='fa fa-cc-jcb' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='JCB'></i>";
                break;
            case 'maestro':
                icon = "<i class='fa fa-cc-maestro' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Maestro'></i>";
                break;
            case 'forbrugsforeningen':
                icon = "<i class='fa fa-cc-forbrugsforeningen' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='forbrugsforeningen'></i>";
                break;
            case 'dankort':
                icon = "<i class='fa fa-cc-dankort' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='Dankort'></i>";
                break;

        }
        $('.cc-brand').html(icon);
    });



    $('.cc-exp').keyup(function () {
        $(this).toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
    });

    $('.cc-cvc').keyup(function () {
        var cardType = $.payment.cardType($('.cc-number').val());
        $(this).toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
    });


    $('form').submit(function (e) {
        e.preventDefault();
        var cardType = $.payment.cardType($('.cc-number').val());
        $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
        $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
        $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
        $('.validation').removeClass('text-danger text-success');
        $('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');
        var cardnoValid = $.payment.validateCardNumber($('.cc-number').val());
        var cardexpValid = $.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal'));
        var cardCvcValid = $.payment.validateCardCVC($('.cc-cvc').val(), cardType);
        var valid = cardnoValid && cardexpValid && cardCvcValid;
        if (valid) {
            validform()
            $('.cardpaymentform').removeClass('animated shake');
        } else {
            $(".cardpaymentform").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                $(this).removeClass("animated shake");
            }).addClass("animated shake");
        }
    });
});