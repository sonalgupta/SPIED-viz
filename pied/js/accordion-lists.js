    makeLists();
    $(function() {

    $( ".accordionclass" ).accordion({
	  event: "click hoverintent",
      heightStyle: "content"});
      
    $('#help').click(function(){
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
    
    $( ".litog" ).unbind('click');
    $( ".litog" ).bind("click",function(){
        $( this ).nextAll( "p:first" ).toggle();
        if ($( this ).nextAll( "p:first" ).is(":hidden")) {
            $( this ).nextAll( "div:first" ).hide();
        }
        else
        {
            $( this ).nextAll( "div:first" ).show();
        }
        });
 
      });
 
  
