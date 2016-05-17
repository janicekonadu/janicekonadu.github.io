


$( document ).ready(function() {

    
    SC.initialize({
      client_id: '587a61d352df592938176dce1406b818'
    });


    // stream track id 245909077
    SC.stream('/tracks/245909077').then(function(sound){

          var ispaused = true;

          $('.spinner-wrap').click(function(e) {

              e.preventDefault();

              var $this = $(this),

                bpm = Number($this.siblings('audio').data('bpm'))
                pulse = (60/bpm)*1000;
              
              // if song is playing
              if (ispaused === false) {
                sound.pause();
                sound.seek(0);
                $this.removeClass('playing');
                clearInterval(intervals);
                ispaused = true;
              }
              
              // if song is paused 
              else {
                sound.play();
                $this.addClass('playing');
                pulsing();
                intervals = setInterval(function() {pulsing()}, pulse);
                ispaused = false;
                
              }

              function pulsing() {
                
                $this.addClass('pulse');
                
                setTimeout(function() {
                  $this.removeClass('pulse');  
                }, pulse-100);
                
              }

          });
    
    
  });

});
