$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url == 'topic') {
        let chosenNum = 0;
        // $('#deleteImagesModal .modal-body .img-container').height($('#deleteImagesModal .modal-body .img-container').width())
        $('#deleteImagesModal .modal-body .img-container').click(function () {
            if (!$(this).hasClass('chosen'))
                $(this).addClass('chosen');
            else
                $(this).removeClass('chosen');
            chosenNum = $('#deleteImagesModal .modal-body .img-container.chosen').length;
            $('#deleteImagesBtn').attr('disabled', !(chosenNum > 0))
        })
        $('#deleteImagesBtn').click(function () {
            let img = [];
            let chosenImg = $('#deleteImagesModal .modal-body .img-container.chosen img');
            for (let i = 0; i < chosenImg.length; i++) {
                img.push($($('#deleteImagesModal .modal-body .img-container.chosen img').get(i)).attr('src'))
            }
            let dataPaths = {paths: img, isAdd: false}
            let tid = data.url.split('/')[1];
            $.ajax({
                url:`${window.RELATIVE_PATH}/api/dealbee/topics/${tid}/update-images`,
                type:'PUT',
                data: JSON.stringify(dataPaths),
                dataType:'json',
                contentType: 'application/json',
                success: function (result) {
                    $('#deleteImagesModal button.close').trigger('click')
                    app.alert({
                        type: 'success',
                        title: '<i class="fa fa-1x fa fa-image"></i> Xóa ảnh thành công',
                        message: 'Hãy tải lại trang',
                        timeout: 3000
                    });
                }
            })
        })
    }
})