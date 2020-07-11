<div class="topic-note" data-tid={tid}>
    <div class="row">
        <div class="col-xs-11">
            <span id="note-title">Ghi chú: </span>
            <!-- IF optionalData.note -->
            <span id="note">{optionalData.note}</span>
            <!-- ENDIF optionalData.note -->
            <!-- IF !optionalData.note -->
            <span id="note">Chưa có ghi chú</span>
            <!-- ENDIF !optionalData.note -->
        </div>
        <!-- IF privileges.edit_note -->
        <div class="col-xs-1">
            <a data-toggle="collapse" data-target="#note-editor" class="pull-right">
                <i class="fa fa-pencil"></i>
            </a>
        </div>
        <!-- ENDIF privileges.edit_note -->
    </div>
    <!-- IF privileges.edit_note -->
    <div class="row collapse" id="note-editor">
        <div class="col-xs-10">
            <textarea class="form-control" id="note-input" data-tid={tid} value={optionalData.note} rows="3"></textarea>
        </div>
        <div class="col-xs-2">
            <button class="btn btn-primary pull-right" id="note-submit">
                <i class="fa fa-check"></i>
            </button>
        </div>
    </div>
    <!-- ENDIF privileges.edit_note -->
</div>