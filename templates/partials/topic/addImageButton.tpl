<button type="button" id="btnAddImage" class="btn btn-info btn-lg" data-toggle="modal" data-target="#addImagesModal" style="width: 100%">
    <i class="fa fa-picture-o"></i>
</button>
<!-- Modal -->
<div class="modal fade" id="addImagesModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content" style="max-height: 100%">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thêm ảnh</h4>
            </div>
            <div class="modal-body">
                <input name="file[]" id="filesToUpload" type="file" multiple="" style="display: none;"/>
                <button style="width: 100%" class="btn btn-primary" type="button" onclick="document.getElementById('filesToUpload').click();">
                    <i class="fa fa-upload"></i>
                </button>
                <ul class="list-group" id="imageListPreview">
                </ul>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" id="uploadImages"><i class="fa fa-check"></i></button>
            </div>
        </div>

    </div>
</div>

<!--
<li class="list-group-item row clone">
    <div class="col-xs-6">
        <img src="#" alt="Image preview" style="height: 100px">
    </div>
    <div class="col-xs-6">
        <button data-index="">x</button>
    </div>
</li>
-->