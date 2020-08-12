<div class="clearfix post-header <!-- IF posts.isMain -->hidden<!-- ENDIF posts.isMain -->">
	<div class="icon pull-left">
		<a href="<!-- IF posts.user.userslug -->{config.relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->">
			{buildAvatar(posts.user, "sm2x", true, "", "user/picture")}
			<i component="user/status" class="fa fa-circle status {posts.user.status}" title="[[global:{posts.user.status}]]"></i>
		</a>
	</div>

	<small class="pull-left">
		<strong>
			<a href="<!-- IF posts.user.userslug -->{config.relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->" itemprop="author" data-username="{posts.user.username}" data-uid="{posts.user.uid}">{posts.user.username}</a>
		</strong>

		<!-- IMPORT partials/topic/badge.tpl -->

		<!-- IF posts.user.banned -->
		<span class="label label-danger">[[user:banned]]</span>
		<!-- ENDIF posts.user.banned -->

		<span class="visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">
			<a class="permalink" href="{config.relative_path}/post/{posts.pid}"><span class="timeago" title="{posts.timestampISO}"></span></a>

			<i component="post/edit-indicator" class="fa fa-pencil-square<!-- IF privileges.posts:history --> pointer<!-- END --> edit-icon <!-- IF !posts.editor.username -->hidden<!-- ENDIF !posts.editor.username -->"></i>

			<small data-editor="{posts.editor.userslug}" component="post/editor" class="hidden">[[global:last_edited_by, {posts.editor.username}]] <span class="timeago" title="{posts.editedISO}"></span></small>

			<!-- IF posts.toPid -->
			<a component="post/parent" class="btn btn-xs btn-default hidden-xs" data-topid="{posts.toPid}" href="{config.relative_path}/post/{posts.toPid}"><i class="fa fa-reply"></i> @<!-- IF posts.parent.username -->{posts.parent.username}<!-- ELSE -->[[global:guest]]<!-- ENDIF posts.parent.username --></a>
			<!-- ENDIF posts.toPid -->

			<span>
				<!-- IF posts.user.custom_profile_info.length -->
				&#124;
				{{{each posts.user.custom_profile_info}}}
				{posts.user.custom_profile_info.content}
				{{{end}}}
				<!-- ENDIF posts.user.custom_profile_info.length -->
			</span>
		</span>
		<span class="bookmarked"><i class="fa fa-bookmark-o"></i></span>

	</small>
</div>

<br />
<div class="row">
	<div class="content <!-- IF posts.isMain -->col-md-5 main<!-- ENDIF posts.isMain -->" component="post/content" itemprop="text">
		{posts.content}
		<!-- IF posts.isMain -->
		<!-- IMPORT partials/topic/topic-note.tpl -->
		<!-- ENDIF posts.isMain -->
	</div>
	<!-- IF posts.isMain -->
	<div class="col-xs-12 col-md-3" id="optional-data">
		<!-- IF optionalData.images.length -->
		<!-- IMPORT partials/topic/imageSlideshow.tpl -->
		<!-- ENDIF optionalData.images.length -->
		<!-- IF optionalData.dealUrl -->
		<a href="{optionalData.dealUrl}" class="btn btn-info" target="_blank" id="optionalData-dealUrl">
			[[thesiscustom:visit-now]]
		</a>
		<!-- ENDIF optionalData.dealUrl -->
		<div class="text-center author">
			<strong>
				<a href="<!-- IF posts.user.userslug -->{config.relative_path}/user/{posts.user.userslug}<!-- ELSE -->#<!-- ENDIF posts.user.userslug -->" itemprop="author" data-username="{posts.user.username}" data-uid="{posts.user.uid}">{posts.user.username}</a>
			</strong> [[thesiscustom:posted-deal]]
		</div>
	</div>
	<!-- ENDIF posts.isMain -->
</div>

<div class="clearfix post-footer">
	<!-- IF posts.user.signature -->
	<div component="post/signature" data-uid="{posts.user.uid}" class="post-signature">{posts.user.signature}</div>
	<!-- ENDIF posts.user.signature -->
	<!-- IF posts.isMain -->
	<!-- IMPORT partials/topic/votes-topic.tpl -->
	<!-- ENDIF posts.isMain -->
	<!-- IF !posts.isMain -->
	<small class="pull-right" style="display: flex; justify-content: center">
		<span class="post-tools">
			<span component="post/reply" class="no-select <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->"><i class="fa fa-comment"></i></span>
			<span component="post/quote" class="no-select <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->"><i class="fa fa-quote-left"></i></span>
		</span>
		<!-- IF !reputation:disabled -->
		<!-- IMPORT partials/topic/votes.tpl -->
		<!-- ENDIF !reputation:disabled -->
		<!-- IMPORT partials/topic/post-menu.tpl -->
		<!-- IMPORT partials/thread_tools.tpl -->
	</small>
	<!-- ENDIF !posts.isMain -->

	<!-- IF !hideReplies -->
	<!-- IF !posts.isMain -->
	<a component="post/reply-count" href="#" class="threaded-replies no-select <!-- IF !posts.replies.count -->hidden<!-- ENDIF !posts.replies.count -->">
		<span component="post/reply-count/avatars" class="avatars <!-- IF posts.replies.hasMore -->hasMore<!-- ENDIF posts.replies.hasMore -->">
			{{{each posts.replies.users}}}
			{buildAvatar(posts.replies.users, "xs", true, "")}
			{{{end}}}
		</span>

		<span class="replies-count" component="post/reply-count/text" data-replies="{posts.replies.count}">{posts.replies.text}</span>
		<i class="fa fa-fw fa-chevron-right" component="post/replies/open"></i>
		<i class="fa fa-fw fa-chevron-down hidden" component="post/replies/close"></i>
		<i class="fa fa-fw fa-spin fa-spinner hidden" component="post/replies/loading"></i>
	</a>
	<!-- ENDIF !posts.isMain -->
	<!-- ENDIF !hideReplies -->
</div>
<!-- IF posts.isMain -->
<div style="padding: 0px" class="col-md-8">
	<hr/>
</div>
<!-- ELSE -->
<hr/>
<!-- ENDIF posts.isMain -->