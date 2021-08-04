img = "";
status = "";
objects = [];

function preload() {
   alert_1 = loadSound("Alert.mp3");
}

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(650, 500);
    video.hide()

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) 
    {
      console.error(error);
    }
    else 
    {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 650, 500);

    if (status != "") 
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) 
        {
            if (objects[i].label == "person") 
            {
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                alert_1.stop();
                break
            }  
            else 
            {
                document.getElementById("status").innerHTML = "Status: Baby Is Not Detected";
                alert_1.play();
            }
            
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected : " + objects.length;
        }
    }
}