<!-- IF optionalData.discountPercentage -->
<div id="optionalData-discountPercentage">
    -{optionalData.discountPercentage}%
</div>
<!-- ENDIF optionalData.discountPercentage -->
<div class="clearfix">
    <ul id="image-slideshow" class="gallery list-unstyled cS-hidden">
        {{{each optionalData.images}}}
        <li data-thumb="{optionalData.images}">
            <img class="img-responsive" src="{optionalData.images}"/>
        </li>
        {{{end}}}
    </ul>
</div>