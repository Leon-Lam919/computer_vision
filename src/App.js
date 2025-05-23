import './App.css';
import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { getAngle } from './utils/poseMath.js';
import { drawKeypoints, drawSkeleton } from './utils/utilities.js';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const armParts = new Set([
    'leftShoulder',
    'rightShoulder',
    'leftElbow',
    'rightElbow',
    'leftWrist',
    'rightWrist',
  ]);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5,
    });
    return net;
  };

  const detect = async (net) => {
    const webcamCurrent = webcamRef.current;
    if (webcamCurrent && webcamCurrent.video && webcamCurrent.video.readyState === 4) {
      const video = webcamCurrent.video;
      const videoWidth = webcamCurrent.video.videoWidth;
      const videoHeight = webcamCurrent.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      console.log('Full pose keypoints:', pose.keypoints);
      console.log(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    const armKeyPoints = pose.keypoints.filter((kp) => armParts.has(kp.part));
    drawKeypoints(armKeyPoints, 0.5, ctx);
    drawSkeleton(armKeyPoints, 0.5, ctx);
    //drawKeypoints(pose['keyPoints'], 0.5, ctx);
    //drawSkeleton(pose[armParts], 0.5, ctx);
  };

  useEffect(() => {
    let animationFrameId;

    const run = async () => {
      const net = await runPosenet();

      const detectLoop = async () => {
        await detect(net);
        animationFrameId = requestAnimationFrame(detectLoop);
      };

      // Wait until video is ready
      const waitForVideo = setInterval(() => {
        const video = webcamRef.current?.video;
        if (video && video.readyState === 4) {
          video.play();
          clearInterval(waitForVideo);
          detectLoop(); // Start detection
        }
      }, 100);
    };

    run();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // log to check webcam is working
  useEffect(() => {
    const checkWebcam = setInterval(() => {
      const video = webcamRef.current?.video;
      if (video) {
        console.log('Webcam video element found:', video);
        clearInterval(checkWebcam);
      }
    }, 500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> where the video is suppose to be </h1>
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: 'user',
          }}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
