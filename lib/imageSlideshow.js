require(['lightslider'], function (lightslider) {
    $(window).on('action:ajaxify.end', function (event, data) {
        if (data.tpl_url == 'topic') {
            $('#image-slideshow').lightSlider({
                gallery:true,
                item:1,
                thumbItem:10,
                slideMargin: 0,
                auto:false,
                loop:true,
                onSliderLoad: function() {
                    $('#image-slideshow').removeClass('cS-hidden');
                }
            });
            $('#image-slideshow').parent().height($('#image-slideshow').parent().width())
            $(window).resize(function () {
                $('#image-slideshow').parent().height($('#image-slideshow').parent().width())
            })
        }

    })
})