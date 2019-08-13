import $ from 'jquery';

$(document).ready(function () {
    $('.make-active').on('click', function () {
        $('.make-active').find('div').removeClass("active-link");
        $(this).find('div').addClass('active-link');
    })
})