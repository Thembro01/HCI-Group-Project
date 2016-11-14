//192.168.1.38
//Created by Trenton Brew
//Date created: 11/10/2016

//-----------------------------global constants--------------------------------

var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;
var SCROLL_LIM = (SCREEN_HEIGHT - 70);
var FAB_APPEAR_LIM = 450;
var TITLE_MOVE_LIM = 130;
var LOGO_TOP_DEN = -1.5;

//-----------------------------global variables--------------------------------

var scrollq = [0,0];
var dimVal = 1;
var clearVal = 0;
var imgNum = 2;

//------------------------------global arrays----------------------------------

var bannerImg = [
  'res/plane3_faded.png',
  'res/plane4_faded.png',
  'res/plane5_faded_cut.png'
];

//----------------------------------events-------------------------------------

$(window).ready(function() {
  set_dynamic_dimensions();
  carousel();
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var scrollTemp = scrollq[1];

    scrollq = [scrollTemp,scroll];

    sticky_navbar(scroll);
    animate_fab(scroll);
    animate_logo(scroll);
    fade_fx(scroll);
    pastBreakScroll(scroll);
    tint_banner();
    nav_color_lock();
    parallax(scroll);
});

//-------------------------------functions-------------------------------------

function set_dynamic_dimensions() {
  $('#banner').css({
    'height': SCREEN_HEIGHT + 'px',
  });
  $('#logo').css({
    'margin-left': ((SCREEN_WIDTH / 2) - 295) + 'px',
    'margin-top': (SCREEN_HEIGHT / LOGO_TOP_DEN) + 'px'
  });
  $('#subtitle').css({
    'margin-top': (SCREEN_HEIGHT / -3.1) + 'px'
  });
  $('#down_pointer').css({
    'margin-top': (SCREEN_HEIGHT / -3.9) + 'px'
  });
  $('.feed_button').css({
    'width': (SCREEN_WIDTH / 4.7) + 'px'
  });
  $('.feed_card').css({
    'width': (SCREEN_WIDTH / 4.7) + 'px'
  });
}

function sticky_navbar(scroll) {
  if(scroll >= SCROLL_LIM) {
    $('#navbar').css({
      'top':'0px',
      'position':'fixed',
      'box-shadow':'0px 5px 10px rgba(0,0,0,0.4)',
      'transition':'box-shadow .3s'
    });
    $('#feed').css({
      'top':'0px'
    });

  };
  if(scroll < SCROLL_LIM) {
    $('#navbar').css({
      'top':'-70px',
      'position':'relative',
      'box-shadow':'none'
    });
    $('#feed').css({
      'top':'-70px'
    });
  }
}

function animate_fab(scroll) {
  if(scroll > FAB_APPEAR_LIM) {
    $('#fab').css({
      'bottom':'24px',
    });
  }
  else {
    $('#fab').css({
      'bottom':'-60px',
    });
  }
}

function animate_logo(scroll) {
  if(scroll > TITLE_MOVE_LIM) {
    $('#logo').css({
      'width':'177px',
      'height':'60px',
      'float':'left',
      'margin-left':'20px',
      'margin-top':'6px'
    });
  }
  else {
    $('#logo').css({
      'width':'531px',
      'height':'180px',
      'float':'none',
      'margin-left': ((SCREEN_WIDTH / 2) - 295) + 'px',
      'margin-top': (SCREEN_HEIGHT / LOGO_TOP_DEN) + 'px'
    });
  }
}

function fade_fx(scroll) {
  if(scroll < SCROLL_LIM) {
    if(scrollingDown() || scrollingUp()) {
      dimVal = (1 - (scroll * .001));
    }
  }
  else {
    dimVal = 0.7;
  }

  if(scroll < SCROLL_LIM) {
    if(scrollingDown() || scrollingUp()) {
      clearVal = (0 + (scroll * .0013));
    }
  }
  else {
    clearVal = 1;
  }
}

function scrollingDown() {
  if(scrollq[0] < scrollq[1]) {
    direction = 'down';
    return true;
  }
  else {
    return false;
  }
}

function scrollingUp() {
  if(scrollq[0] > scrollq[1]) {
    direction = 'up';
    return true;
  }
  else {
    return false;
  }
}

function pastBreakScroll(scroll) {
  var retVal;
  if(scroll < SCROLL_LIM) {
    retVal = (scroll / 2);
  }
  else {
    retVal = (SCROLL_LIM / 2);
  }
  //console.log(retVal);
  return retVal;
}

function tint_banner() {
  $('#banner').css({
    'background':'linear-gradient(rgba(28,50,107,' + clearVal + '),rgba(28,50,107,' + clearVal + ')),url(' + bannerImg[imgNum] + ')',
    'background-position':'center',
    'background-size':'cover'
  });
}

function nav_color_lock() {
  if(clearVal >= 1) {
    $('#navbar').css({
      'background-color':'rgba(28,50,107,1)'
    });
  }

  else {
    $('#navbar').css({
      'background-color':'rgba(28,50,107,0)'
    });
  }
}

function parallax(scroll) {
  //console.log(pastBreakScroll(scroll));
  $('#banner').css({
    'top': (pastBreakScroll(scroll)),
  });
}

function carousel() {
  var newImg;

  $('#banner').animate({ opacity:0 }, 500, function() {
    imgNum++;
    if(imgNum > bannerImg.length - 1) {
      imgNum = 0;
    }
    newImg = bannerImg[imgNum];
    $('#banner').css({
      'background':'linear-gradient(rgba(28,50,107,' + clearVal + '),rgba(28,50,107,' + clearVal + ')),url(' + newImg + ')',
      'background-size':'cover',
      'background-position':'center'
    });

    $('#banner').animate({ opacity:1 }, 500, function() {
      setTimeout(carousel,6000);
    });
  });
}

function subtitle_disappear(scroll) {
  if(scroll > 0) {
    $('#subtitle').css({
      'opacity':'1'
    });
  }
  else {
    $('#subtitle').css({
      'opacity':'0'
    });
  }
}
