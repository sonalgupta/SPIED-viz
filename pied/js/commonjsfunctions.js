
    $(function() {   
    $('#help').click(function(){
        console.log("here");
        $('#overlay').fadeIn(200,function(){
            $('#box').animate({'top':'20px'},200);
        });
        return false;
    });
    $('#boxclose').click(function(){
        $('#box').animate({'top':'-1000px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
    });
    });
    
$(document).keyup(function(e) {

  if (e.keyCode == 27) { 
          $('#box').animate({'top':'-1000px'},500,function(){
            $('#overlay').fadeOut('fast');
        });
        
            $( ".accordionclass" ).css({"opacity":1}).show();
            $( ".dynamic" ).empty();
            $( ".dynamic" ).offset({top:-1000});

        
  }   
});

/*
   * hoverIntent | Copyright 2011 Brian Cherne
   * http://cherne.net/brian/resources/jquery.hoverIntent.html
   * modified by the jQuery UI team
   */
  $.event.special.hoverintent = {
    setup: function() {
      $( this ).bind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    teardown: function() {
      $( this ).unbind( "mouseover", jQuery.event.special.hoverintent.handler );
    },
    handler: function( event ) {
      var currentX, currentY, timeout,
        args = arguments,
        target = $( event.target ),
        previousX = event.pageX,
        previousY = event.pageY;
 
      function track( event ) {
        currentX = event.pageX;
        currentY = event.pageY;
      };
 
      function clear() {
        target
          .unbind( "mousemove", track )
          .unbind( "mouseout", clear );
        clearTimeout( timeout );
      }
 
      function handler() {
        var prop,
          orig = event;
 
        if ( ( Math.abs( previousX - currentX ) +
            Math.abs( previousY - currentY ) ) < 7 ) {
          clear();
 
          event = $.Event( "hoverintent" );
          for ( prop in orig ) {
            if ( !( prop in event ) ) {
              event[ prop ] = orig[ prop ];
            }
          }
          // Prevent accessing the original event since the new event
          // is fired asynchronously and the old event is no longer
          // usable (#6028)
          delete event.originalEvent;
 
          target.trigger( event );
        } else {
          previousX = currentX;
          previousY = currentY;
          timeout = setTimeout( handler, 100 );
        }
      }
 
      timeout = setTimeout( handler, 100 );
      target.bind({
        mousemove: track,
        mouseout: clear
      });
    }
  };


