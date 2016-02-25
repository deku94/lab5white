/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';
// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializeSoundPage();
    console.log("Initialized page");
})

/*
 * Function that is called when the document is ready.
 */
function initializeSoundPage() {
    $('#sound-test').click(soundTest);
    $('#submitBtn').hide();
    console.log("Applied click function");
}
var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;
var testingSound = false;
var canceled = false;
var mediaStreamSource = null;
var stopTest = null;
function soundTest() {
    console.log("Clicked sound test button");
    if (testingSound == true) {
        canceled = true;
        shutdown();
    } else {
        testingSound = true;
        $("#test-result-div").hide();
        $("#submitBtn").hide();
        $("#sound-test").html("Cancel Test");
        $("#meter-div").show();
        // grab our canvas
        canvasContext =$("#meter")[0].getContext("2d");
        
        // monkeypatch Web Audio
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        
        // grab an audio context
        audioContext = audioContext || new AudioContext();

        // Attempt to get audio input
        try {
            // monkeypatch getUserMedia
            navigator.getUserMedia = 
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;

            // ask for an audio input
            
            navigator.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, gotStream, didntGetStream);
        } catch (e) {
            alert('getUserMedia threw exception :' + e);
        }
    }
}

function didntGetStream() {
    alert("Couldn't gain access to microphone.");
    shutdown();
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    stopTest = window.setTimeout(shutdown, 7500);
    drawLoop();
}

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 0, meter.volume*WIDTH*1.4, HEIGHT);

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}

function shutdown() {
    if (!testingSound) {
        canceled = false;
        return;
    }
    testingSound = false;
    if (!canceled) {       
        var calculatedDecibels = calculateDecibels();
        if (calculatedDecibels >= 50) {
            $("#test-details").html("<i class='fa fa-headphones fa-5x' style='position:relative; left:170px'></i>"
            +"<p>You should probably wear headphones or use a less sensitive microphone. Decibel Level: " + calculatedDecibels.toFixed(2) + "</p>");
        } else {
            $("#test-details").html("<img style='width:5em; vertical-align:top' src='https://cdn1.iconfinder.com/data/icons/computer-hardware-4/512/audio_speakers-2-512.png'/>"
            +"<p>You should be fine with speakers. Decibel Level: " + calculatedDecibels.toFixed(2) + "</p>");
        }
        $("#test-result-div").show();
        $("#submitBtn").show();
        $.get('/soundtest/updateJSON/'+calculatedDecibels.toFixed(2));
    } else {
        window.clearTimeout(stopTest);
        canceled = false;
    }
    if (meter != null) {
        meter.shutdown();
    }
    if (mediaStreamSource != null) {
        mediaStreamSource.disconnect();
    }
    $("#meter-div").hide();
    $("#sound-test").html("Test Noise Level");
}

function calculateDecibels() {
    if (meter == null) {
        return;
    } else {
        var sum = 0;
        meter.recordedDBs.forEach(function(element) {
            sum += element;
        }, this);
        var avgDecibels = sum/meter.recordedDBs.length;
        
        console.log(avgDecibels);
        return avgDecibels;
    }
}