$(window).on('action:ajaxify.end', function (event, data) {
    if (data.tpl_url == 'topic') {
        let files = [];
        let getTemplate = function (name, index) {
            return $(`
<li class="list-group-item row clone">
    <div class="col-xs-3">
        <img src="#" alt="Image preview" style="height: 50px">
    </div>
    <div class="col-xs-7">
        ${name}
    </div>
    <div class="col-xs-2">
        <button class="deleteImage-btn btn btn-danger pull-right" data-index="${index}"><i class="fa fa-remove"></i></button>
    </div>
</li>`)
        }

        function deleteImg(e) {
            files.splice($(e).data('index'), 1)
            drawList(files)
        }

        function readURL(file, index) {
            var reader = new FileReader();
            let img = getTemplate(file.name, index)
            reader.onload = function (e) {
                img.find('img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
            $('ul#imageListPreview').append(img)
        }

        function readURLImage(name, index) {
            let img = getTemplate(name, index)
            img.find('img').attr('src', name);
            $('ul#imageListPreview').append(img)
        }

        $("input#filesToUpload").change(function () {
            files = [...files, ...testImageFile($(this).prop('files'))]
            drawList(files)
        });

        function drawList(files) {
            $('ul#imageListPreview').empty();
            for (let i = 0; i < files.length; i++) {
                if (typeof (files[i]) === 'string') {
                    readURLImage(files[i], i)
                } else {
                    readURL(files[i], i)
                }
            }
            $('button.deleteImage-btn').click(function (e, data) {
                deleteImg(e.target)
            })
        }

        $('#uploadImages').click(function () {
            let formData = new FormData();
            files.forEach((e, i) => {
                if (typeof (e) != 'string')
                    formData.append(`files[${i}]`, e);
            })
            let hasFile = false;
            files.forEach(e => {
                if (typeof (e) != 'string')
                    hasFile = true;
            })
            if (hasFile) {
                $.ajax({
                    url: `${window.RELATIVE_PATH}/api/dealbee/util/upload-images`,
                    type: 'POST',
                    data: formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,  // tell jQuery not to set contentType
                    success: function (response) {
                        let pathIndex = 0;
                        files = files.map(e => {
                            if (typeof (e) != 'string') {
                                e = response[pathIndex].url;
                                pathIndex++;
                            }
                            return e;
                        })
                        RequestUpdateImagePaths(files);
                    },
                    fail: function () {
                        app.alertError('Upload files failed')
                    }
                });
            } else {
                RequestUpdateImagePaths(files);
            }
        })
        function RequestUpdateImagePaths(filesArray){
            let dataPaths = {paths: filesArray.slice(), isAdd: true}
            let tid = data.url.split('/')[1];
            $.ajax({
                url: `${window.RELATIVE_PATH}/api/dealbee/topics/${tid}/update-images`,
                type: 'PUT',
                data: JSON.stringify(dataPaths),
                dataType: 'json',
                contentType: 'application/json',
                success: function (result) {
                    $('#addImagesModal button.close').trigger('click')
                    files = [];
                    app.alert({
                        type: 'success',
                        title: '<i class="fa fa-1x fa fa-image"></i> Thêm ảnh thành công',
                        message: 'Trang đang được tải lại ...',
                        timeout: 3000
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                },
                fail:function (e) {
                    app.alertError('Saving files failed')
                }
            })
        }
        $('#urlInput').on('change', function () {
            let url = $(this).val();
            console.log(url)
            testImage(url, 3000, function (url, boolean) {
                if (boolean === true) {
                    files = [...files, url]
                    drawList(files)
                    $('#urlInput').val('')
                }
            })
        })

        function testImage(url, timeout, callback) {
            timeout = timeout || 5000;
            var timedOut = false, timer;
            var img = new Image();
            img.onerror = img.onabort = function () {
                if (!timedOut) {
                    clearTimeout(timer);
                    callback(url, false);
                }
            };
            img.onload = function () {
                if (!timedOut) {
                    clearTimeout(timer);
                    callback(url, true);
                }
            };
            img.src = url;
            timer = setTimeout(function () {
                timedOut = true;
                // reset .src to invalid URL so it stops previous
                // loading, but doesn't trigger new load
                img.src = "//!!!!/test.jpg";
                callback(url, false);
            }, timeout);
        }

        function testImageFile(files) {
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            let result = []
            for (let i = 0; i < files.length; i++) {
                if (validImageTypes.includes(files[i]['type'])) {
                    result.push(files[i])
                }
            }
            return result;
        }
    }
})