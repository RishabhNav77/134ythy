img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("IMG20210706203352.jpg");
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    

}

function draw() {
    image(video,0,0,380,380);
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video,gotRESULT);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("numberofobjects").innerHTML = "Number Of Objects Detected Are :" + " " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelloaded() {
    console.log("Model is loaded");
    status = true;
}

function gotRESULT(error,results) {
    if(error) {
        console.error(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}