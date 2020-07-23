<div class="modal fade" id="addImagesModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content" style="max-height: 100%">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">[[thesiscustom:add-images]]</h4>
            </div>
            <div class="modal-body">
                <span class="info">[[thesiscustom:upload-image]]</span>
                <input name="file[]" id="filesToUpload" type="file" multiple="" style="display: none;"/>
                <button style="width: 100%" class="btn btn-primary" id="btnUpload" type="button" onclick="document.getElementById('filesToUpload').click();">
                    <i class="fa fa-upload"></i>
                </button>
                <span class="info">[[thesiscustom:pass-url]]</span>
                <input type="text" id="urlInput" class="form-control">
                <ul class="list-group" id="imageListPreview">
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" id="uploadImages"><i class="fa fa-check"></i></button>
            </div>
        </div>

    </div>
</div>