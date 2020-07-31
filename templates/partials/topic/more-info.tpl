<div id="moreInfo" class="row">
    <!-- IF optionalData.expiredAt -->
    <div id="optionalData-expiredAt"
         class="<!-- IF optionalData.isExpired -->hidden<!-- ENDIF optionalData.isExpired -->"
         data-expiredtime="{optionalData.expiredAt}">
        <span class="optionalData-title">Còn lại</span>:
        <a title="[[thesiscustom:expired-at,{optionalData.expiredTime},{optionalData.expiredDate}]]">
        <span class="display-time optionalData-content">
                <i class="fa fa-clock-o selected"></i> <span class="display-days">00</span> ngày <span
                    class="display-hours">00</span> : <span class="display-minutes">00</span> : <span
                    class="display-seconds">00</span>
        </span>
        </a>
    </div>
    <a title="[[thesiscustom:expired-at,{optionalData.expiredTime},{optionalData.expiredDate}]]">
        <div id="optionalData-expiredAt-expired"
             class="<!-- IF !optionalData.isExpired -->hidden<!-- ENDIF !optionalData.isExpired -->">
            Hết hạn
        </div>
    </a>
    <!-- ENDIF optionalData.expiredAt -->

    <!-- IF optionalData.coupon -->
    <div id="optionalData-coupon"><span class="optionalData-title">[[thesiscustom:coupon]]</span>: <span
                class="optionalData-content"><i class="fa fa-tag"></i> <span>{optionalData.coupon}</span></span></div>
    <!-- ENDIF optionalData.coupon -->
    <a data-toggle="collapse" data-target="#optionalData-collapse" title="Xem thêm"><i
                class="fa fa-info-circle"></i></a>
    <div id="optionalData-collapse" class="collapse">
        <!-- IF optionalData.brand -->
        <div id="optionalData-brand"><span class="optionalData-title">[[thesiscustom:brand]]</span>: <span
                    class="optionalData-content">{optionalData.brand}</span></div>
        <!-- ENDIF optionalData.brand -->

        <!-- IF optionalData.maxDiscount -->
        <div id="optionalData-maxDiscount"><span class="optionalData-title">[[thesiscustom:max-discount-money]]</span>:
            <span class="optionalData-content">{optionalData.maxDiscount} {optionalData.currency}</span></div>
        <!-- ENDIF optionalData.maxDiscount -->

        <!-- IF optionalData.amount -->
        <div id="optionalData-amount"><span class="optionalData-title">[[thesiscustom:amount]]</span>: <span
                    class="optionalData-content">{optionalData.amount}</span></div>
        <!-- ENDIF optionalData.amount -->

        <!-- IF optionalData.minOrder -->
        <div id="optionalData-minOrder"><span class="optionalData-title">[[thesiscustom:min-order]]</span>: <span
                    class="optionalData-content">{optionalData.minOrder}</span></div>
        <!-- ENDIF optionalData.minOrder -->

        <!-- IF optionalData.sku -->
        <div id="optionalData-sku"><span class="optionalData-title">[[thesiscustom:sku]]</span>: <span
                    class="optionalData-content">{optionalData.sku}</span></div>
        <!-- ENDIF optionalData.sku -->
    </div>
</div>