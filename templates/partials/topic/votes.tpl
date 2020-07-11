<span class="votes">
	<a component="post/upvote" href="#" class="<!-- IF posts.upvoted -->upvoted<!-- ENDIF posts.upvoted -->">
		<i class="fa fa-thumbs-up"></i>
	</a>

	<span component="post/vote-count" data-votes="{posts.votes}">{posts.votes}</span>

<!-- IF !downvote:disabled -->
	<a component="post/downvote" href="#"
	   class="<!-- IF posts.downvoted -->downvoted<!-- ENDIF posts.downvoted -->">
		<i class="fa fa-thumbs-down"></i>
	</a>
<!-- ENDIF !downvote:disabled -->
</span>