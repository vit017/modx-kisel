$(function () {

    /**
     * check fix buttons (arrow-up, callback) on window scroll event
     */
    var $parent = $('.btns-fix'),
        $btnArrow = $parent.find('.arrow-up'),
        btnOpacity = getComputedStyle($btnArrow[0]).opacity,
        $btnCallback = $parent.find('.callback'),
        $footer = $('#footer'),
        maxScroll = $footer.offset().top;

    $btnArrow[0].addEventListener('click', scrollWindow.bind(null, $btnArrow));
    window.addEventListener('scroll', checkFixBtns.bind(null, maxScroll, [$btnArrow, $btnCallback], btnOpacity));


    /**
     * show tooltip - add product to compare list. catalog page
     */
    if ($('.item .img-catalog').length) {
        $('.item .img-catalog').mouseenter(function () {
            $(this).parent().find('.img-compare').show();
        });
        $('.item .img-catalog').mouseleave(function (ev) {
            $(this).parent().find('.img-compare').hide();
        });
        $('.img-compare').click(function () {
            var $objPamel = getComparePanel(),
                $parent = $(this).closest('.item'),
                title = $parent.find('.text-catalog .product-title').text(),
                imgSrc = $parent.find('.img-product').attr('src');

            $objPamel.img.attr('src', imgSrc);
            $objPamel.img.attr('alt', title);

            $objPamel.product.text(title);
            $objPamel.panel.css('z-index', 999);
            $objPamel.panel.css('opacity', 1);

            $(this).hide();
        });
    }

    /**
     * add product to compare list. catalog detail page
     */
    $('.cart .compare').click(function() {
        var $panel = getComparePanel(),
            $item = getCompareItem();

        insertCompare($item, $panel);
    });

    /**
     * Compare page. Remove item from compare list
     */
    $('.ico-del').click(function(event) {
        event.preventDefault();
    });


    /**
     * mobile menu + catalog
     */
    $('#touch-menu').click(function(ev) {
        $(this).toggleClass('active');
        $('#h-nav ul').slideToggle();
        ev.preventDefault();
    });

    $('#catalog-menu h2').click(function(ev) {
        $(this).toggleClass('active');
        $('#catalog-menu ul').slideToggle();
        ev.preventDefault();
    });


});

function insertCompare($item, $dest) {
    $dest.img.attr('src', $item.imgSrc);
    $dest.img.attr('alt', $item.title);

    $dest.product.text($item.title);
    $dest.panel.css('z-index', 999);
    $dest.panel.css('opacity', 1);

    return true;
}

function getCompareItem() {
    var $parent = $('.content-center');
    var title = $parent.find('h1').text(),
        imgSrc = $parent.find('.img-detail img').attr('src');

    return {title: title, imgSrc: imgSrc};
}

function getComparePanel() {
    var $panel = $('#panel-compare'),
        $panelImg = $panel.find('.product-img').find('img'),
        $panelProduct = $panel.find('.product-title').find('span');

    return {'panel': $panel, 'img': $panelImg, 'product': $panelProduct};
}

function scrollWindow($btnArrow) {
    window.removeEventListener('scroll', checkFixBtns);
    $('html, body').animate({scrollTop: 0}, 200, function () {
        window.addEventListener('scroll', checkFixBtns);
        $btnArrow.css('visibility', 'hidden');
    });
}

function checkFixBtns(maxScroll, $btns, btnOpacity) {
    if (arguments.length < 4)
        return;

    var scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (!scrolled) {
        $btns[0].css('visibility', 'hidden');
    }
    else if (scrolled + document.documentElement.clientHeight >= maxScroll) {
        $btns.forEach(function ($btn) {
            $btn.removeClass('pos-f');
            $btn.addClass('pos-a');
        });
    }
    else {
        $btns[0].css('visibility', 'visible');
        $btns.forEach(function ($btn) {
            $btn.removeClass('pos-a');
            $btn.addClass('pos-f');
        });
    }


}

