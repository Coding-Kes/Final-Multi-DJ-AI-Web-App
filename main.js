
song_goldenhour = "";
song_hero = "";

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

score_leftwrist = 0;
left_wrist_song = "";

score_rightwrist = 0;
right_wrist_song = "";

function preload()
{
    song_goldenhour = loadSound("JVKE-GoldenHour.mp3");
    song_hero = loadSound("JVKE-Hero.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FFD700");
    stroke("#FFD700");

    left_wrist_song = song_hero.isPlaying();
    right_wrist_song = song_goldenhour.isPlaying();

    if(score_leftwrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        song_hero.stop();

        if(right_wrist_song == false)
        {
            song_goldenhour.play();

            document.getElementById("song_name").innerHTML = "Playing: Golden Hour by JVKE";
        }
    }

    if(score_rightwrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);

        song_goldenhour.stop();

        if(left_wrist_song == false)
        {
            song_hero.play();

            document.getElementById("song_name").innerHTML = "Playing: Hero by JVKE";
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet Model Is Loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("LeftWristX = "+leftWristX+"LeftWristY = "+leftWristY);
        console.log("RightWristX = "+rightWristX+"LeftWristY = "+rightWristX);
    }
}

