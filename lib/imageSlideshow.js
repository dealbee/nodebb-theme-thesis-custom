$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url == 'topic') {
        console.log('loaded')
        $('#image-slideshow').lightSlider({
            gallery:true,
            item:1,
            thumbItem:5,
            slideMargin: 0,
            speed:500,
            auto:true,
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