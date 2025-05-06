import logo from './logo.svg';
import './App.css';
import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.5
    });

    setInterval(() => {
      detect(net)
    }, 100)
  };

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      console.log(pose);
    }
  };

  runPosenet();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{ position: "absolute", marginLeft: "auto", marginRight: "auto", left: 0, right: 0, textAlign: "center", zIndex: 9, width: 640, height: 480 }}
        />
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", marginLeft: "auto", marginRight: "auto", left: 0, right: 0, textAlign: "center", zIndex: 9, width: 640, height: 480 }} />
      </header>
    </div>
  );
}

export default App;
