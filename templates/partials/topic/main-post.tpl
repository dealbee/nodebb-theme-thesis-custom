<div class="clearfix post-header">
    <div class="icon pull-left">
        <a href="<!-- IF mainPost.user.userslug -->{config.relative_path}/user/{mainPost.user.userslug}<!-- ELSE -->#<!-- ENDIF mainPost.user.userslug -->">
            {buildAvatar(mainPost.user, "sm2x", true, "", "user/picture")}
            <i component="user/status" class="fa fa-circle status {mainPost.user.status}" title="[[global:{mainPost.user.status}]]"></i>
        </a>
    </div>

    <small class="pull-left">
        <strong>
            <a href="<!-- IF mainPost.user.userslug -->{config.relative_path}/user/{mainPost.user.userslug}<!-- ELSE -->#<!-- ENDIF mainPost.user.userslug -->" itemprop="author" data-username="{mainPost.user.username}" data-uid="{mainPost.user.uid}">{mainPost.user.username}</a>
        </strong>

        <!-- IMPORT partials/topic/badge.tpl -->

        <!-- IF mainPost.user.banned -->
        <span class="label label-danger">[[user:banned]]</span>
        <!-- ENDIF mainPost.user.banned -->

        <span class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
			<a class="permalink" href="{config.relative_path}/post/{mainPost.pid}"><span class="timeago" title="{mainPost.timestampISO}"></span></a>

			<i component="post/edit-indicator" class="fa fa-pencil-square<!-- IF privileges.posts:history --> pointer<!-- END --> edit-icon <!-- IF !mainPost.editor.username -->hidden<!-- ENDIF !mainPost.editor.username -->"></i>

			<small data-editor="{mainPost.editor.userslug}" component="post/editor" class="hidden">[[global:last_edited_by, {mainPost.editor.username}]] <span class="timeago" title="{mainPost.editedISO}"></span></small>

            <!-- IF mainPost.toPid -->
			<a component="post/parent" class="btn btn-xs btn-default hidden-xs" data-topid="{mainPost.toPid}" href="{config.relative_path}/post/{mainPost.toPid}"><i class="fa fa-reply"></i> @<!-- IF mainPost.parent.username -->{mainPost.parent.username}<!-- ELSE -->[[global:guest]]<!-- ENDIF mainPost.parent.username --></a>
            <!-- ENDIF mainPost.toPid -->

			<span>
				<!-- IF mainPost.user.custom_profile_info.length -->
				&#124;
				{{{each mainPost.user.custom_profile_info}}}
                {mainPost.user.custom_profile_info.content}
                {{{end}}}
				<!-- ENDIF mainPost.user.custom_profile_info.length -->
			</span>
		</span>
        <span class="bookmarked"><i class="fa fa-bookmark-o"></i></span>

    </small>
</div>

<br />

<div class="content" component="post/content" itemprop="text">
    {mainPost.content}
</div>

<div class="clearfix post-footer">
    <!-- IF mainPost.user.signature -->
    <div component="post/signature" data-uid="{mainPost.user.uid}" class="post-signature">{mainPost.user.signature}</div>
    <!-- ENDIF mainPost.user.signature -->
    <!-- IMPORT partials/topic/topic-note.tpl -->
    <!-- IMPORT partials/topic/votes-topic.tpl -->
</div>

<hr />