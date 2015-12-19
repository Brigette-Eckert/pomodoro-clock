//set init var
//times in seconds 
var time = {
  work: 1500,
  break: 300,
};
var timeOutput;

var count = time.work;
  //storing function in var to be able to stop timer
var timer ;
var audio = new Audio('255101__soneproject__jingle2.wav');
//intinal setup of variables in html for buttons and type 
$("p.type").html("Work");
$("#start-stop").html("Start");


//Take in seconds and returns string xx:xx
function timeDisplay(timeInput){
  var minCon = timeInput/60
  var min = (Math.floor(minCon)).toString();
  var sec = (timeInput%60).toString();
  //adding 0s if second or min is only one char long
  if(min.length == 1 && sec.length != 1){
    console.log("min padding added");
    var paddedMin = "0" + min;
    timeOutput =  paddedMin + ":" + sec;
  }else if(sec.length == 1 && min.length != 1){
    console.log("sec padding added");
    var paddedSec= "0" + sec;
    timeOutput =  min + ":" + paddedSec;
  } else if(min.length == 1 && sec.length == 1){
  console.log("both min & sec padding added")
    var paddedMin = "0" + min;
    var paddedSec= "0" + sec;
   timeOutput =  paddedMin + ":" + paddedSec;
  }else {
  timeOutput =  min + ":" + sec;
  };
  console.log(timeOutput)
  return timeOutput;
}

//intinal setup of var in html where time is dispalyed on page
$("p.counter").html(timeDisplay(count));
$("p.workInt").html(timeDisplay(time.work));
$("p.breakInt").html(timeDisplay(time.break));

function addWork() {
    time.work += 1;
    count = time.work;
    $("p.workInt").html(timeDisplay(count));
    //updating count var to change with work
    $("p.counter").html(timeDisplay(count));
  };

function minusWork() {
    //on - button click subtract 1 to Work interval
    time.work -= 1;
    count = time.work;
     $("p.counter").html(timeDisplay(count));
     $("p.workInt").html(timeDisplay(count));
    //avoiding non-existant and negative intervals
    if(time.work >= 1) {
      //updating count var to change with work
      $("p.workInt").html(timeDisplay(count));
      // timeDisplay();
    } else {
      time.work = 1;
      count = time.work;
    }  
  };

function addBreak() {
    //on + button click add 1 to Break     interval
    time.break += 1;
    $("p.breakInt").html(timeDisplay(time.break));
  };

function minusBreak() {
    //on - button click subtract one from break interval
  time.break -= 1;
  //avoiding non-existant and negative intervals
  if (time.break >= 1) {
    $("p.breakInt").html(timeDisplay(time.break));
  } else {
    time.break = 1;
  }
};

function reset() {
    if($("#clock").hasClass("workTime") == false){
    $("#clock").addClass("workTime");
    }
    count = time.work;
    console.log("timer reset")    
    $("p.counter").html(timeDisplay(count));
  };


function checkStatus() {
  //setting work vs break sessions
  if($("#clock").hasClass("workTime") == true) {
    $("p.type").html("Work");
      count = time.work
     $("p.counter").html(timeDisplay(time.work));
  } else {
     $("p.type").html("Break")
      count = time.break;
      $("p.counter").html(timeDisplay(time.break));
  };
};


function countDown(){
    if (count >= 1) {
      count -= 1;
      console.log(count);
      $("p.counter").html(timeDisplay(count));
    } else if(count == 0)  {
      console.log("switch")
      console.log(count)
      //play alarm
      audio.play();
       $("#clock").toggleClass("workTime");
       checkStatus();
    }
  };
  
$('#addWork').click(function(){
    addWork();
});

$('#minusWork').click(function() {
    minusWork();
});

$('#addBreak').click(function() {
    addBreak();
});

$('#minusBreak').click(function() {
    minusBreak();
});

//reset count to work time
$("#reset").click(function() {
    reset();
  
});

$("#start-stop").click(function() {
  $("#start-stop").toggleClass("running");
    console.log("timer toggled");
    //Toggling start and stop button
    if ($("#start-stop").hasClass("running") == true) {
     timer = setInterval(function(){ countDown()}, 1000);
      $("#start-stop").html("Stop");
    } else {
      clearInterval(timer);
      $("#start-stop").html("Start");
    };
  });
