$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url === 'topic') {
        let countDownDate = parseInt($('#optionalData-expiredAt').data('expiredtime'))
        let myfunc = setInterval(function () {
            let now = new Date().getTime();
            if (countDownDate >= now) {
                let timeleft = countDownDate - now;
                let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
                if (hours < 10) {
                    hours = '0' + hours
                }
                if (minutes < 10) {
                    minutes = '0' + minutes
                }
                if (seconds < 10) {
                    seconds = '0' + seconds
                }
                $('#optionalData-expiredAt .display-time .display-days').text(days)
                $('#optionalData-expiredAt .display-time .display-hours').text(hours)
                $('#optionalData-expiredAt .display-time .display-minutes').text(minutes)
                $('#optionalData-expiredAt .display-time .display-seconds').text(seconds)
            } else {
                $('#optionalData-expiredAt').addClass('hidden')
                $('#optionalData-expiredAt-expired').removeClass('hidden')
            }
        }, 1000)
        $('#optionalData-coupon .optionalData-content').click(function () {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($('#optionalData-coupon .optionalData-content span').text()).select();
            document.execCommand("copy");
            app.alert({
                type: 'info',
                message: `[[thesiscustom:copy-coupon,${$temp.val()}]]`,
                timeout: 2000
            });
            $temp.remove();
        })
    }
})