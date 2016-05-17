
(function() {

  /* Create Audio Elements:

      > audio: creates <audio/> element in page (Your music artist i.e. Lil' Wayne)

      > source: takes input from the audio (Think of a microphone.)
      > analyser: what manipulates the music (think of the autotune 
        that manipulates Lil' Wayne's voice)
      > audioContext: the output destination (think of an amp that projects the
        manipulated version of his voice)      
         - AudioContext: specifies audio context for designated browser (Chrome)

  */

<<<<<<< HEAD
  var AudioContext;
  var audio;
  var audioContext;
  var source;
  var analyser;
=======
    // stream track id 245909077
    SC.stream('/tracks/245909077').then(function(sound){
>>>>>>> 0616ab3085bf55020a5b5682d07b90ba9f71a780

  /*
      > canvas: gets canvas element from HTML
      > canvasContext: let's create things 2d 
  */

  var canvas = document.getElementById("theCanvas");
  var canvasContext = canvas.getContext("2d");    

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  

  /*Music data variables*/

  var freqByteData;
  var analyserMethod = "getByteTimeDomainData";
  var streamUrl;


  /* 
      > Connect everything: 
        source to analyser, analyser to ctx (or ctx destination in this case)  
        
        audio -> source -> analyser -> ctx
        Lil' Wayne's voice -> Microphone-> Autotune -> Speaker

  */

  function initAudio(streamUrl) {

    AudioContext = window.AudioContext || window.webkitAudioContext;
    audio = new Audio();
    audio.crossOrigin = "anonymous"; // handle cross-domain restriction
    audio.controls = "true";
    audioContext = new AudioContext();
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();            
    source.connect(analyser);    
    analyser.connect(audioContext.destination);

  };

  function get(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
      if (request.readyState === 4 && request.status === 200) {
        callback(request.responseText);
      }
    }

    request.open("GET", url, true);            
    request.send(null);
  }

  var clientID = "client_id=587a61d352df592938176dce1406b818"
  var trackPermalinkUrl = "http://soundcloud.com/rosemary-fairweather/too-low";

  // Resove method promises JSON representation of official soundlcloud link with proper authentication

  function findTrack() {
    get("http://api.soundcloud.com/resolve.json?url=" +  trackPermalinkUrl + "&" + clientID,
        function (response) {
      var trackInfo = JSON.parse(response);
      streamUrl = trackInfo.stream_url + "?" + clientID;
    }
       );
  };


  function createBarAnimation() {
 
    analyser.fftSize = 2048;
    var bufferLength = 100;

    freqByteData = new Uint8Array(bufferLength); // creates an empty array for music data with 100 spaces
    canvasContext.fillStyle = "#aaa28a"; // color of the bars

    function drawAgain() {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight); // clear the canvas
      requestAnimationFrame(drawAgain); // looping

      analyser[analyserMethod](freqByteData); // fill array with values from analyser

      for(var i = 0; i < bufferLength; i++){
          bar_x = i * 20;
          bar_width = 5;
          bar_height = -(freqByteData[i*2]/2); // initialize heights via values in freqByteData

          //  fillRect( x, y, width, height ) 
          canvasContext.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
    }

    drawAgain(); 
  }

  var ispaused = false;

  // Click function for custom play/pause button

  $('#playButton').click(function() {

          var self = $(this);

          if (ispaused == false){
              audio.src = streamUrl;
              audio.looping = "looping";
              audio.play();

              createBarAnimation();
              self.addClass('playing');

              var bpm = 42.46,
              pulse = (60/bpm)*1000;

              function pulsing() {
                
                self.addClass('pulse');
                
                setTimeout(function() {
                  self.removeClass('pulse');
                }, pulse-100);
                
              } 

              pulsing();
              intervals = setInterval(function() {pulsing()}, pulse);
              ispaused = true;
            }

       else {
                audio.pause();
                self.removeClass('playing');
                clearInterval(intervals);
                ispaused = false;
            }
            

  });

<<<<<<< HEAD

  findTrack();
  initAudio();
})();
=======
});
>>>>>>> 0616ab3085bf55020a5b5682d07b90ba9f71a780
