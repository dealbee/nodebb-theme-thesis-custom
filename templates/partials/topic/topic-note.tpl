<div class="topic-note <!-- IF !posts.note -->empty<!-- ENDIF !posts.note -->" data-tid={posts.tid}>
    <div class="row">
        <div class="col-xs-11">
            <span id="note-title">[[thesiscustom:note]]: </span>
            <span id="note" data-note="{posts.note}">
                <!-- IF posts.note -->
                {posts.note}
                <!-- ELSE -->
                [[thesiscustom:note-empty]]
                <!-- ENDIF posts.note -->
            </span>
            <div id="note-adder" class="pull-right <!-- IF !posts.note -->hidden<!-- ENDIF !posts.note -->">
                <span>[[thesiscustom:note-adder]]: </span><a href="{posts.userslugAddNote}">{posts.usernameAddNote}</a>
            </div>
        </div>
        <!-- IF posts.edit_note -->
        <div class="col-xs-1">
            <a data-toggle="collapse" data-target="#note-editor" class="pull-right" title="[[thesiscustom:note-add-btn]]">
                <i class="fa fa-pencil"></i>
            </a>
        </div>
        <!-- ENDIF posts.edit_note -->
    </div>
    <!-- IF posts.edit_note -->
    <div class="row collapse" id="note-editor">
        <div class="col-xs-10">
            <textarea class="form-control" id="note-input" data-tid={posts.tid} value={posts.note} rows="3"></textarea>
        </div>
        <div class="col-xs-2">
            <button class="btn btn-primary pull-right" id="note-submit">
                <i class="fa fa-check"></i>
            </button>
        </div>
    </div>
    <!-- ENDIF posts.edit_note -->
</div>
<script>
    note_add();
</script>