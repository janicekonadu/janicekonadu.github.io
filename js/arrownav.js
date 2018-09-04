      if (window.console) console.log('start');

        var sections = new Array("#comp", "#projects", "#bio", "#contact");
        var num = 0;
        var current = sections[num];


        var liE = "#bt" + num;   

      $(document).keydown(function(e)
      {       


        $(liE).removeClass('active'); 
        $(liE).addClass('inactive'); 

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

        if (num < 4){
        liE = "#bt" + num;
        console.log(liE); 

        $(liE).removeClass('inactive'); 
        $(liE).addClass('active');  
        }

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
      }
