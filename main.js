prediction1="";


Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result_gesture").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
 });
}

console.log("ml5 version : ",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UpjGIN8yA/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The Prediction is :"+prediction1;
    var utter_this=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utter_this);
}

function prediction(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction1=results[0].label;

        speak();
        if(results[0].label=="peace"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }

        if(results[0].label=="best"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }

        if(results[0].label=="perfect"){
            document.getElementById("update_gesture").innerHTML="&#128076;";  
        }

    }
}

