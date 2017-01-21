$(function () {
    $('.ins-toggle').click(function () {
        $('.ins-toggle').not(this).next('.instruction').slideUp();
        $(".ins-toggle").not(this).children('i').addClass('fa-plus');
        $(".ins-toggle").not(this).children('i').removeClass('fa-minus');
        $(this).next('.instruction').slideToggle();
        if ($(this).children('i').hasClass('fa-plus')) {
            $(this).children('i').addClass('fa-minus');
            $(this).children('i').removeClass('fa-plus');
        } else {
            $(this).children('i').removeClass('fa-minus');
            $(this).children('i').addClass('fa-plus');
        }
    });
    $('#confirmation').fadeOut();
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });
    $('.payment-options > ul > li a').click(function (e) {
        //get selected href
        var href = $(this).attr('href');

        //set all nav tabs to inactive
        $('.payment-options > ul > li').removeClass('active');

        //get all nav tabs matching the href and set to active
        $('.payment-options > ul > li a[href="' + href + '"]').closest('li').addClass('active');

        //active tab
        $('.tab-pane').removeClass('active');
        $('.tab-pane' + href).addClass('active');

    });

    var toggleIcons = function () {
        if ($(this).hasClass('active')) {
            $(this).find('.toggle-icons i.fa').addClass('fa-minus');
            $(this).find('.toggle-icons i.fa').removeClass('fa-plus');
            $('.payment-options .list-group-item').not(this).find('.toggle-icons i.fa').addClass('fa-plus');
            $('.payment-options .list-group-item').not(this).find('.toggle-icons i.fa').removeClass('fa-minus');
        }
        else if (!$(this).hasClass("active")) {
            $(this).find('.toggle-icons i.fa').removeClass('fa-minus');
            $(this).find('.toggle-icons i.fa').addClass('fa-plus');
            $('.payment-options .list-group-item').not(this).find('.toggle-icons i.fa').removeClass('fa-plus');
            $('.payment-options .list-group-item').not(this).find('.toggle-icons i.fa').addClass('fa-minus');
        }
    }

    $('.payment-options .list-group-item').each(toggleIcons);
    $('.payment-options .list-group-item').click(toggleIcons);
});
