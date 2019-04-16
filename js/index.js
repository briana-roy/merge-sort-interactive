var $body = $('body');
var $footer = $('footer');
var advanceState = false;

/* 
 * @func animateCSS, Handle the CSS animation allocation for jQuery elements
 * @params {object} $element, the jQuery element to animate
 * @params {string} animationName, the name of the animation to add
 * @params {object} callback
 */
var animateCSS = function ($element, animationName, animationDuration, callback) {
  $element.addClass('animated ' + animationName + ' ' + animationDuration);
  
  function _handleAnimationEnd () {
    $element.removeClass('animated ' + animationName + ' ' + animationDuration);
    $element.off('animationend', _handleAnimationEnd);
       
    if (typeof callback === 'function') {
      callback();
    }
  }

  $element.on('animationend', _handleAnimationEnd);
};

/* @func shuffle, Shuffle the order of a list of elements and render on the DOM
 * @params {object} $displayBlock, jQuery list of elements to shuffle
 */
var shuffle = function ($displayBlock) {
  // tmp debug statement
  console.log('shuffle');

  // Set up vars for randomization;
  var nodes = $displayBlock.children();
  var randomized = nodes;
  var currIndex = nodes.length;
  var temp;
  var randomIndex;

  // While there remains an element to shuffle
  while (currIndex !== 0) {
    
    // Pick a remaining element and decrease the current index
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    // Swap the current element with the randomized element
    temp = randomized[currIndex];
    randomized[currIndex] = randomized[randomIndex];
    randomized[randomIndex] = temp;
  }
  
 animateCSS($(nodes), 'jello', 'faster');
 $(nodes).attr('data-face','@__@'); 
  animateCSS($($displayBlock), 'wobble', 'faster', function () {
  $(nodes).attr('data-face','o__o'); 
 });
  // Render the randomized elements
  $displayBlock.html(randomized);
};

/* @func divide, Take one DOM element and split it into two. Render new list on the DOM
 * @params {object} $displayBlock, jQuery list of elements to shuffle
 */
var divide = function ($dividable) {
  // tmp debug statement
  console.log('divide', $dividable);
  var nodes = $dividable.children();

  var listA = [];
  var listB = [];
  var $containerA = $('<div class="box"></div>');
  var $containerB = $('<div class="box"></div>');
  var length = nodes.length;
  var middle = length / 2;
  
  console.log('length: ', length);
  console.log('middle position: ', middle);
  if (length > 1) {
    animateCSS($dividable, 'rubberBand', 'fast');
    
    $dividable.html('');

    // populate listA and listB
    listA = nodes.slice(0, middle);
    listB = nodes.slice(middle, nodes.length);

    listA.each(function (index) {
      var $elem = $(this);
      $containerA.append($elem);
      console.log('containerA append', $containerA);
    });

    listB.each(function (index) {
      var $elem = $(this);
      $containerB.append($elem);
      console.log('containerB append', $containerB);
    });

    // remove outer border on display
    $dividable.removeClass('box');

      if ($containerA.length > 0) {
        $dividable.append($containerA)
      }
      if ($containerB.length > 0) {
        $dividable.append($containerB);
      }
  }
};

var sort = function ($sortable) {
  console.log('sort');
  var $nodes = $sortable.children();
  $sortable.each(function (index, elem) {
  animateCSS($(this), 'wobble', slow);
  // $(this).html($(this).sort());
  })
  
};

var combine = function ($workspace) {
  console.log('combine');
};

/* Given a list of actions, render action buttons on the DOM
 * @params {object} <actions> a list of string actions to gen btns for
 * @return {string} <btnHTML> a string rep of all the btn elements to inject into the DOM
 */
var parseActions = function (actions) {
  var unrequiredActions = ['<<', '>>'];
  var btnHTML = '';
  var animationClass = '';  
  actions.forEach(function (elem) {
    if (!unrequiredActions.includes(elem)) {
        animationClass = 'animated pulse infinite';
    }
    btnHTML += '<button class="btn '+ elem + ' ' + animationClass + '">' + elem + '</button>';
   animationClass = '';
  });
  return btnHTML;
};

var handleBtnState = function ($btnContainer) {
  var $target;
  
  if (advanceState) {
    $target = $btnContainer.find('.pulse')
    
    $target.children().removeClass('animation pulse infinite');
    CSSanimate($target.next(),'pulse', 'infinite');
    advanceState = false;
  }
  
};

/* Mark the appropriate active slide
*  @params {object} jQuery reference to the DOM element to be altared
*  @params {int} slide number reference
*/
var trackSlide = function ($blockCarousel, curr) {
  $blockCarousel.each(function (index) {
    $blockCarousel[index].classList.remove('selected');
  });
  $blockCarousel[curr].classList.add('selected');
};

/* Given a slide reference display in on the DOM
*  @params {object} slide the slide object to render
*  @params {object} jQuery reference to the element to update
*/
var displaySlide = function (slide, $displayText) {
  $displayText.find('.block-dialog-title').text(slide.title);
  $displayText.find('.block-dialog-desc').text(slide.desc);
};

var init = function () {
  console.log('INIT');
  var curr = 0;
  var slides = [];
  var state = {
    'curr': 0,
    'history': []
  }
  
  /* Create the slide data */
  slides[0] = {
    title: "Welcome to Merge Sort Interactive",
    desc: "This is a tutorial for understanding the concept behind the merge sort algorithm.",
    actions: ['next']
  };

  slides[1] = {
    title: "Step One: The Problem",
    desc: "Let's say that we want to sort 6 nodes by value. Click the shuffle button to randomize the nodes. Then we will use the merge sort algorithm to put them back in order.",
    actions: ['<<', 'shuffle', '>>']
  };

  slides[2] = {
    title: "Step Two: DIVIDE",
    desc: "It is easier to sort a small list than a large list. That is why merge sort begins by repeatedly dividing our list in half until we have 6 lists of only one element. (Note: a list with one element is already a sorted list)",
    actions: ['<<', 'divide', '>>']
  };

  slides[3] = {
    title: "Step three: Sort and Combine",
    desc: "At this point in our algorithm, we need to sort and combine each mini list. Hit Sort and Combine until the lists ",
    actions: ['<<', 'sort', 'combine', '>>']
  };

  slides[4] = {
    title: "Step 4: ",
    desc: "Let's say we have 6 items to sort that have different weights",
    actions: []
  };

  slides[5] = {
    title: "Step 5: ",
    desc: "Let's say we have 6 items to sort that have different weights",
    actions: []
  };

  slides[6] = {
    title: "Step 6: ",
    desc: "Let's say we have 6 items to sort that have different weights",
    actions: []
  };

  
  var $nodes = $body.find('.node');
  var $btnBack = $footer.find('.back');
  var $blockCarouselItems = $('.block-carousel-item');
  var $btnNext = $footer.find('.next');
  var $blockDialog = $body.find('.block-dialog');
  var $blockSlide = $body.find('.slide');

  var $btnContainer = $body.find('.btn-container');
  var $blockWorkspace = $body.find('.block-workspace');
  var $blockDisplay = $body.find('.block-display');
  
  $nodes.on('click', function (ev) {
    var $target = $(ev.target);
    var currExpression = $target.attr('data-face');
    var pokeExpression = '>__<'
    
    $target.attr('data-face', pokeExpression);
    animateCSS($target, 'jello', 'faster', function () {
      $target.attr('data-face', currExpression);
    });
  });
  
  var _handleSlideDisplay = function () {
    // Switch to slide
    animateCSS($blockSlide, 'fadeIn', 'slow');
    displaySlide(slides[curr], $blockDialog);

    // Set active slide
    trackSlide($blockCarouselItems, curr);
    // Update iterator
    $body.find('.iterator').text('Step ' + curr + '/' + (slides.length-1));
      
      // Build any action btns
      $btnContainer.html(parseActions(slides[curr].actions));
  };
  
  $blockCarouselItems.on('click', function (ev) {
    console.log('jump to step');
    curr = parseInt($(ev.target).text());
    _handleSlideDisplay();
  });
  
  $btnBack.on('click', function (ev) {
    console.log('Go back!', curr);
    if (curr > 0) {
      curr-=1;
      _handleSlideDisplay();
    }
  });
  
  $(document).on('keydown', function (ev) {
  console.log('key press!', ev.which);
    if (ev.which === 37) {
          console.log('Go back key press!', curr);
      if (curr > 0) {
        curr-=1;
        _handleSlideDisplay();
      }
    }
    if (ev.which === 39) {
      console.log('Go forward key press!', curr);
      if (curr < slides.length -1) {
        curr+=1;
        _handleSlideDisplay();
      }
    }2
  });

  
  $btnNext.on('click', function (ev) {
    console.log('Go next!', curr);
    if (curr < slides.length -1) {
      curr+=1;
      _handleSlideDisplay();
    }
  });
  
  $btnContainer.on('click', function (ev) {
    var $dividables;
    
    switch ($(ev.target).text()) {
      case 'shuffle':
        $blockDisplay.addClass('box');
        shuffle($blockDisplay);
        break;
      case 'divide':
        advanceState = true;
        $dividables = $body.find('.box');
        console.log('dividables: ', $dividables);
        $dividables.each(function (index) {
          console.log('curr dividable node: ', $(this));
          divide($(this));
        });
        break;
      case 'sort':
        advanceState = true;
        $sortables = $body.find('.box');
        sort($sortables);
        break;
      case '<<':
        curr-=1;
         _handleSlideDisplay();
        break;
      case '>>':
      case 'next':
        curr+=1;
        _handleSlideDisplay();
        break;
        break;
      default:
        break;
    }
  });
 
  // Set active slide
  trackSlide($blockCarouselItems, curr);
  // Build any action btns
  $btnContainer.html(parseActions(slides[curr].actions));
  // Update iterator
  $body.find('.iterator').text('Step ' + curr + '/' + (slides.length-1));
};

init();