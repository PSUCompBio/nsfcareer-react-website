import $ from 'jquery';

$(document).ready(function () {
    $('.menu-toggler').on('click', function () {
        $('.mobile-menu').show().animate({ left: '40%' }, 500);
        $('body').css({"overflow": "hidden"})
    }); 
    $(document).on('click','.close-btn', function () {
        $('.mobile-menu').animate({ left: '100%' }, 500)
        setTimeout(() => {
            $('.mobile-menu').hide();
            $('body').css({"overflow": "auto"})
        }, 500);
    }) 
    $('.nav-item').on('click', function () {
        $('.mobile-menu').animate({ left: '100%' }, 500);
        $('.mobile-menu').animate({ left: '100%' }, 500)
        setTimeout(() => {
            $('.mobile-menu').hide();
        }, 500);
    })
});
