objects = [];
status = "";
function preload()
    {
        video = createVideo('video.mp4');
        video.hide();
    }

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function pause(){
    video.pause();
}

function stop(){
    video.stop();
}

function modelLoaded(){
    console.log("Model Loaded !!");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResult(error , results)
{
  if(error){
      console.log(error);
  }
   console.log(results);
   objects = results;
}

function draw()
{
    image(video,0 ,0 , 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected "
            document.getElementById("no._of_objects").innerHTML = "Number of objects detected are :" + objects.length;

            fill("#ff0015");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ff0015");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height );
        }
    }
}
