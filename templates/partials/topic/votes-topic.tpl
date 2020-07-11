<div class="votes votes-topic">
    <div class="btn-group" role="group">
			<button class="btn btn-success <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->" component="post/reply">
				[[topic:reply]]
			</button>
		  <button component="post/upvote" type="button" class="btn btn-secondary <!-- IF posts.upvoted -->upvoted<!-- ENDIF posts.upvoted -->">
			  <i class="fa fa-thumbs-up"></i>
		  </button>
		<!-- IF !downvote:disabled -->
		  <button component="post/downvote" type="button" class="btn btn-secondary <!-- IF posts.downvoted -->downvoted<!-- ENDIF posts.downvoted -->">
			  <i class="fa fa-thumbs-down"></i>
		  </button>
		<!-- ENDIF !downvote:disabled -->
		<button class="btn btn-info" component="post/vote-count" data-votes="{posts.votes}">
			{posts.votes}
		</button>
	</div>
	<!-- IMPORT partials/topic/stats.tpl -->
	<small class="pull-right" style="display: flex; justify-content: center">
	<!-- IMPORT partials/topic/post-menu.tpl -->
	<!-- IMPORT partials/thread_tools.tpl -->
	</small>
</div>