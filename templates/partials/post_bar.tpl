<div class="clearfix">
	<div class="tags pull-left">
		{{{each tags}}}
		<a href="{config.relative_path}/tags/{tags.value}">
		<span class="tag-item" data-tag="{tags.value}" style="<!-- IF tags.color -->color: {tags.color};<!-- ENDIF tags.color --><!-- IF tags.bgColor -->background-color: {tags.bgColor};<!-- ENDIF tags.bgColor -->">{tags.valueEscaped}</span>
		<span class="tag-topic-count human-readable-number" title="{tags.score}">{tags.score}</span></a>
		{{{end}}}
	</div>

	<!-- IMPORT partials/topic/browsing-users.tpl -->

	<div class="topic-main-buttons pull-right">
		<span class="loading-indicator btn pull-left hidden" done="0">
			<span class="hidden-xs">[[topic:loading_more_posts]]</span> <i class="fa fa-refresh fa-spin"></i>
		</span>
	</div>
</div>
<hr/>