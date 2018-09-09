  $(document).ready(function() {

      if (window.console) console.log('start');

      var sections = new Array("#comp", "#projects", "#bio", "#contact");
      var num = 0;
      var current = sections[num];
      var curr = "";
      var liE = "#bt" + num;



      $(document).keydown(function(e){       

        if (window.console) console.log('start agin');
        switch(e.which)
        {
          // user presses up key
          case 38:  
            if (num > 0){
              num -=1 ;
              current = sections[num];
              showViaKeypress(current);

            } 
            break;  
                
          // user presses down key
          case 40:  
            if (num < 3){
              num +=1 ;
              current = sections[num];
              showViaKeypress(current);
            } 
            break;  
        }

      }); 



      $(document).scroll(function() { 

        $('.view').each(function() {
          if(isScrolledIntoView(this) == true){
            $(liE).removeClass('active'); 
            $(liE).addClass('inactive');  
            curr = "#" + this.id;
            // console.log(curr);
            // console.log("*************************************");
          }
        });

        switch(curr){
          case "#hero":
            num = 0;
            break;

          case "#projects":
            num = 1;
            break;

          case "#bio":
            num = 2;
            break;

          case "#contact":
            num = 3;
            break;
        }

        liE = "#bt" + num;
        $(liE).removeClass('inactive'); 
        $(liE).addClass('active');

        
      }); 



      // shows a given element and hides all others
      function showViaKeypress(element_id)
      {
    
        var selector = $(element_id);

        $('html, body').animate({
            scrollTop: selector.offset().top
          }, {
            duration: 800
          });    
      };

      function isScrolledIntoView(elem){
          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();

          var elemTop = $(elem).offset().top;
          var elemBottom = elemTop + $(elem).height();

          var eHeight = $(elem).height();
          var wHeight = $(window).height();

          var result = false;

          if(eHeight > wHeight) {
            result = ((docViewTop >= elemTop) && (docViewBottom <= elemBottom));
          } else {
            result = ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
          }

          return (result)
          
      };

  });
