<!-- IF optionalData.discountPercentage -->
<div id="optionalData-discountPercentage">
    -{optionalData.discountPercentage}%
</div>
<!-- ENDIF optionalData.discountPercentage -->
<div id="optionalData-thumb">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            {{{each imagePaths}}}
            <li data-target="#myCarousel" data-slide-to="{imagePaths.index}"></li>
            {{{end}}}
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            {{{each imagePaths}}}
            <div class="item" style="height: inherit">
                <img src="{imagePaths.path}" class="img-responsive" style="height: inherit; max-width: 100%; max-height: 100%">
            </div>
            {{{end}}}
        </div>

        <!-- Left and right controls -->
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <i class="fa fa-chevron-left"></i>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <i class="fa fa-chevron-right"></i>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
<script>
    document.querySelector("#optionalData-thumb #myCarousel .carousel-indicators li:first-child").classList.add('active');
    document.querySelector("#optionalData-thumb #myCarousel .carousel-inner .item:first-child").classList.add('active');
    document.querySelector("#optionalData-thumb .carousel-inner").style.height = document.querySelector("#optionalData-thumb .carousel-inner").offsetWidth +"px"
    window.onresize=function(){
        document.querySelector("#optionalData-thumb .carousel-inner").style.height = document.querySelector("#optionalData-thumb .carousel-inner").offsetWidth +"px"
    }
</script>
