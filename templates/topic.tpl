<!-- IMPORT partials/breadcrumbs.tpl -->
<div class="row">
    <div class="col-xs-12">
        <h1 component="post/header" class="hidden-xs" itemprop="name">
            <i style="color: #4CAF50" component="topic/pinned"
               class="fa fa-check-circle <!-- IF locked -->hidden<!-- ENDIF locked --> <!-- IF deleted -->hidden<!-- ENDIF deleted -->"
               title="[[thesiscustom:approved]]"></i>
            <i class="pull-left fa fa-thumb-tack hidden <!-- IF !pinned -->hidden<!-- ENDIF !pinned -->"
               title="[[topic:pinned]]"></i>
            <i style="color: #fda34b"
               class="pull-left fa fa-hourglass-half <!-- IF !locked -->hidden<!-- ENDIF !locked --> <!-- IF deleted -->hidden<!-- ENDIF deleted -->"
               title="[[thesiscustom:disapproved]]"></i>
            <i style="color: #337ab7"
               class="pull-left fa fa-arrow-circle-right <!-- IF !oldCid -->hidden<!-- ENDIF !oldCid -->"
               title="[[topic:moved]]"></i>
            {{{each icons}}}@value{{{end}}}
            <span class="topic-title" component="topic/title">
                {title}
            <i style="color: #00b3ee" class="fa fa-star <!-- IF !isPinned --> hidden <!-- ENDIF !isPinned -->" title="[[thesiscustom:isPinned]]"></i>
            </span>
        </h1>
    </div>
    <div class="col-xs-12 col-md-4" id="#optional-data">
        <!-- IF optionalData.discountPrice -->
        <div class="row" id="optionalData-priceContainer">
            <div id="optionalData-price">{optionalData.price} {optionalData.currency}</div>
            <div id="optionalData-discountPrice">{optionalData.discountPrice} {optionalData.currency}</div>
        </div>
        <!-- ENDIF optionalData.discountPrice -->
        <!-- IMPORT partials/topic/more-info.tpl -->

        <!-- IF optionalData.images.length -->
        <!-- IMPORT partials/topic/imageSlideshow.tpl -->
        <!-- ENDIF optionalData.images.length -->
        <!-- IF optionalData.dealUrl -->
        <a href="{optionalData.dealUrl}" class="btn btn-info" target="_blank" id="optionalData-dealUrl">
            [[thesiscustom:visit-now]]
        </a>
        <!-- ENDIF optionalData.dealUrl -->
    </div>
    <div class="col-xs-12 col-md-8">
        <div class="topic <!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
            <!-- IF merger -->
            <div component="topic/merged/message" class="alert alert-warning clearfix">
                <span class="pull-left">[[topic:merged_message, {mergeIntoTid}, {merger.mergedIntoTitle}]]</span>
                <span class="pull-right">
				<a href="{config.relative_path}/user/{merger.userslug}">
					<strong>{merger.username}</strong>
				</a>
				<small class="timeago" title="{mergedTimestampISO}"></small>
			</span>
            </div>
            <!-- ENDIF merger -->

            <!-- IMPORT partials/topic/deleted-message.tpl -->
            <!-- IMPORT partials/topic/disapproved_message.tpl -->
            <hr class="visible-xs"/>

            <ul component="topic" class="posts" data-tid="{tid}" data-cid="{cid}">
                <!-- BEGIN posts -->
                <li component="post" class="<!-- IF posts.deleted -->
                                            deleted
                                            <!-- ENDIF posts.deleted -->
                                            <!-- IF !posts.isMain -->
                                            topic-comment
                                            <!-- ENDIF !posts.isMain -->"
                <!-- IMPORT partials/data/topic.tpl -->>
                <a component="post/anchor" data-index="{posts.index}" id="{posts.index}"></a>

                <meta itemprop="datePublished" content="{posts.timestampISO}">
                <meta itemprop="dateModified" content="{posts.editedISO}">

                <!-- IMPORT partials/topic/post.tpl -->
                <!-- IF !posts.index -->
                <div class="post-bar-placeholder"></div>
                <!-- ENDIF !posts.index -->
                </li>
                <!-- END posts -->
            </ul>

            <!-- IF config.enableQuickReply -->
            <!-- IMPORT partials/topic/quickreply.tpl -->
            <!-- ENDIF config.enableQuickReply -->

            <!-- IF config.usePagination -->
            <!-- IMPORT partials/paginator.tpl -->
            <!-- ENDIF config.usePagination -->

            <div class="navigator-thumb text-center hidden">
                <strong class="text"></strong><br/>
                <span class="time"></span>
            </div>
            <div class="visible-xs visible-sm pagination-block text-center">
                <div class="progress-bar"></div>
                <div class="wrapper">
                    <i class="fa fa-2x fa-angle-double-up pointer fa-fw pagetop"></i>
                    <i class="fa fa-2x fa-angle-up pointer fa-fw pageup"></i>
                    <span class="pagination-text"></span>
                    <i class="fa fa-2x fa-angle-down pointer fa-fw pagedown"></i>
                    <i class="fa fa-2x fa-angle-double-down pointer fa-fw pagebottom"></i>
                </div>
            </div>
        </div>
    </div>
    <div data-widget-area="sidebar"
         class="col-lg-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
        {{{each widgets.sidebar}}}
        {{widgets.sidebar.html}}
        {{{end}}}
    </div>
</div>
<div data-widget-area="header">
    {{{each widgets.header}}}
    {{widgets.header.html}}
    {{{end}}}
</div>

<div data-widget-area="footer">
    {{{each widgets.footer}}}
    {{widgets.footer.html}}
    {{{end}}}
</div>

<!-- IF !config.usePagination -->
<noscript>
    <!-- IMPORT partials/paginator.tpl -->
</noscript>
<!-- ENDIF !config.usePagination -->
