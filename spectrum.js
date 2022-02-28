var mic;
var fft;
var playButton;
var stopButton;
let isGetting = false;
var bin = 1024;
var w_spectrum;
var max_freq = 22528; //22627;
var min_freq = 0; //11;
var low = 220;
var high = 2200;

function setup() {
  let cnv = createCanvas(710, 400);
  cnv.parent("cnvSpectrum");
  noFill();

  mic = new p5.AudioIn();
  fft = new p5.FFT(0.9, bin);
  fft.setInput(mic);
  w_spectrum = width / bin;
  
  playButton = createButton("Play");
  playButton.mousePressed(startLoop);
  playButton.parent("cnvSpectrum"); 
  playButton.size(40, 20);

  playButton = createButton("Stop");
  playButton.mousePressed(stopLoop);
  playButton.parent("cnvSpectrum"); 
  playButton.size(40, 20);
}

function startLoop() {
  if (!isGetting) {
    mic.start();
    isGetting = true;
  }
}

function stopLoop() {
  if (isGetting) {
    mic.stop();
    isGetting = false;
  }  
}

function touchStarted() {
    userStartAudio();
}

function draw() {
  background(200);
  if (isGetting) {
    var spectrum = fft.analyze();
    var oct_band = fft.getOctaveBands(1, 0);
    console.log(oct_band);
    var log_average = fft.logAverages(oct_band);
    console.log(log_average);

    beginShape();
    /*
    for (i = 0; i < spectrum.length; i++) {
      var amp = spectrum[i];
      var y_spectrum = map(amp, 0, 255, height, 0);
      line(i*w_spectrum, height, i*w_spectrum, y_spectrum);
    }
    */

    
    // show 220-2200
    for (i = 10; i <= 105; i++) {
      var amp = spectrum[i];
      var y_spectrum = map(amp, 0, 255, height, 0);
      line(i*w_spectrum*9, height, i*w_spectrum*9, y_spectrum);
    }
    

    /*
    // log average
    for (i = 0; i < log_average.length; i++) {
      var amp = log_average[i];
      var y = map(amp, 0, 255, height, 0);
      line(i*width/11, height, i*width/11, y);
    }
    */
    endShape();
  }
}