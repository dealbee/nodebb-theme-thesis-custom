<div class="votes votes-topic">
    <div class="btn-group" role="group">
        <button component="post/upvote" type="button"
                class="btn btn-default <!-- IF posts.upvoted -->upvoted<!-- ENDIF posts.upvoted -->">
            <i class="fa fa-thumbs-up"></i>
        </button>
        <!-- IF !downvote:disabled -->
        <button component="post/downvote" type="button"
                class="btn btn-default <!-- IF posts.downvoted -->downvoted<!-- ENDIF posts.downvoted -->">
            <i class="fa fa-thumbs-down"></i>
        </button>
        <!-- ENDIF !downvote:disabled -->
        <button class="btn btn-info" component="post/vote-count" data-votes="{posts.votes}">
            {posts.votes}
        </button>
    </div>
    <div class="btn-group" role="group">
        <button class="btn btn-default <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->"
                component="post/reply">
            <i class="fa fa-comment"></i>
        </button>
        <button class="btn btn-info disabled">{posts.postcount}</button>
    </div>
    <div class="btn-group" role="group">
        <button class="btn btn-default disabled"
                component="post/reply">
            <i class="fa fa-eye"></i>
        </button>
        <button class="btn btn-info disabled">{posts.viewcount}</button>
    </div>
    <small class="pull-right" style="display: flex; justify-content: center;">
        <!-- IF posts.isMain -->
        <!-- IF !locked -->
        <!-- IF privileges.topics:pindealbee -->
        <span id="pinDealbeeButton" style="margin-right: -10px">
            <a id="buttonPin" class="dropdown moderator-tools bottom-sheet" style="cursor: pointer">
                <i class="fa fa-thumb-tack" title="[[thesiscustom:pin-on-dealbee]]"></i>
            </a>
        </span>
        <!-- ENDIF privileges.topics:pindealbee -->
        <!-- ENDIF !locked -->
        <!-- ENDIF posts.isMain -->

        <!-- IMPORT partials/topic/post-menu.tpl -->
        <!-- IMPORT partials/thread_tools.tpl -->
        <!-- IF mainPost.display_edit_tools -->
        <!-- IF posts.isMain -->
        <!-- IMPORT partials/topic/addImageModal.tpl -->
        <!-- ENDIF posts.isMain -->
        <!-- ENDIF mainPost.display_edit_tools -->
    </small>
</div>