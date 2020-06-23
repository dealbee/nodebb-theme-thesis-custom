<!-- IF optionalData.images.length -->
<button type="button" id="openDeleteModalBtn" class="btn btn-danger" data-toggle="modal" data-target="#deleteImagesModal">
    <i class="fa fa-trash"></i>
</button>
<!-- Modal -->
<div class="modal fade" id="deleteImagesModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Xóa hình ảnh</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    {{{each optionalData.images}}}
                    <div class="col-xs-3">
                        <div class="img-container">
                            <img class="img-responsive" src="{optionalData.images}"/>
                        </div>
                    </div>
                    {{{end}}}
                </div>
            </div>
            <div class="modal-footer">
                <buttn class="btn btn-danger" disabled=true id="deleteImagesBtn"><i class="fa fa-trash"></i></buttn>
            </div>
        </div>
    </div>
</div>
<!-- ENDIF optionalData.images.length -->