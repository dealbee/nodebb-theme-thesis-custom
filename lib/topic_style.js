$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url === 'topic') {
        let height = $('#optionalData-priceContainer').parent().height()
        $('#optional-data').css({'margin-top': $(window).width() <= 970 ? 0 : height*-1});
        $(window).on('resize', function () {
            let height = $('#optionalData-priceContainer').parent().height()
            $('#optional-data').css({'margin-top': $(window).width() <= 970 ? 0 : height*-1})
        })
    }
})