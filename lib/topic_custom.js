$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url == 'topic') {
        let files = [];

        function deleteImg(e) {
            files.splice($(e).data('index'), 1)
            drawList(files)
        }

        function readURL(file, index) {
            var reader = new FileReader();
            let img = $(`
<li class="list-group-item row clone">
    <div class="col-xs-3">
        <img src="#" alt="Image preview" style="height: 50px">
    </div>
    <div class="col-xs-7">
        ${file.name}
    </div>
    <div class="col-xs-2">
        <button class="deleteImage-btn btn btn-danger pull-right" data-index="${index}"><i class="fa fa-remove"></i></button>
    </div>
</li>`)
            reader.onload = function (e) {
                img.find('img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
            $('ul#imageListPreview').append(img)
        }

        $("input#filesToUpload").change(function () {
            files = [...files, ...$(this).prop('files')]
            drawList(files)
        });

        function drawList(files) {
            $('ul#imageListPreview').empty();
            for (let i = 0; i < files.length; i++) {
                readURL(files[i], i)
            }
            $('button.deleteImage-btn').click(function (e, data) {
                deleteImg(e.target)
            })
        }

        $('#uploadImages').click(function () {
            let formData = new FormData();
            files.forEach((e, i) => {
                formData.append(`files[${i}]`, e);
            })
            $.ajax({
                url: `${window.RELATIVE_PATH}/api/dealbee/util/upload-images`,
                type: 'POST',
                data: formData,
                processData: false,  // tell jQuery not to process the data
                contentType: false,  // tell jQuery not to set contentType
                success: function (paths) {
                    paths = paths.map(e => {
                        return e.url;
                    })
                    let dataPaths = {paths: paths, isAdd: true}
                    let tid = data.url.split('/')[1];
                    $.ajax({
                        url:`${window.RELATIVE_PATH}/api/dealbee/topics/${tid}/update-images`,
                        type:'PUT',
                        data: JSON.stringify(dataPaths),
                        dataType:'json',
                        contentType: 'application/json',
                        success: function (result) {
                            $('#addImagesModal button.close').trigger('click')
                            app.alert({
                                type: 'success',
                                title: '<i class="fa fa-1x fa fa-image"></i> Thêm ảnh thành công',
                                message: 'Hãy tải lại trang',
                                timeout: 3000
                            });
                        }
                    })
                }
            });
        })
    }
})