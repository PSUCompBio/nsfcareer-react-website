import $ from 'jquery';

$(document).ready(function () {
    $('.menu-toggler').on('click', function () {
        $('.mobile-menu').css({ "display": "block" }).animate({ left: '40%' }, 500);
       
    }); 
    $('.close-btn').on('click', function () {
        $('.mobile-menu').css({ "display": "none!important" }).animate({ left: '100%' }, 500, hideMenu);
        $('mobile-menu').css({ "display": "none!important" });
    }) 
    $('.nav-item').on('click', function () {
        $('.mobile-menu').animate({ left: '100%' },500,hideMenu);
    })
    function hideMenu() {
        $('mobile-menu').css({ "display": "none" });
    }
});
