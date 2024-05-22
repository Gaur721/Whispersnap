import { useEffect, useRef, useState } from "react";
import { segmentBackground, applyBlur, applyImageBackground } from "virtual-bg";
import "./VirtualBackground.css";

const VirtualBackground = ({ activeImg }) => {
  const inputVideoRef = useRef(null);
  const outputCanvasRef = useRef(null);
  const imageBrowserInputRef = useRef(null);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    console.log(activeImg, "d");
    if (activeImg) {
      setBackgroundImage(activeImg);
    }
  }, [activeImg]);

  const toggleStream = async () => {
    if (imageBrowserInputRef.current.files[0]) {
      setBackgroundSelectedImage(imageBrowserInputRef.current.files[0]);
    } else {
      imageBrowserInputRef.current.onchange = (e) => {
        applyBlur(0);
        setBackgroundSelectedImage(e.target.files[0]);
      };
    }

    if (!streamStarted) {
      try {
        const myStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        inputVideoRef.current.srcObject = myStream;

        segmentBackground(inputVideoRef.current, outputCanvasRef.current);
        setStreamStarted(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const setBackgroundImage = (imageUrl) => {
    applyBlur(0);
    const image = new Image();
    image.src = imageUrl;
    applyImageBackground(image);
  };

  const setBackgroundSelectedImage = (imageFile) => {
    applyBlur(0);
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const image = new Image();
      image.src = imageUrl;
      applyImageBackground(image);
    };
  };

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    alert(
      "Mobile Devices are not fully supported. Please visit from a desktop"
    );
  }

  return (
    <div id="cameraComponent">
      <button id="toggleButton" onClick={toggleStream}>
        Start Camera
      </button>

      <div id="container">
        <input
          type="file"
          id="imageBrowserInput"
          name="imageBrowserInput"
          accept="image/*"
          ref={imageBrowserInputRef}
        />

        <br />
        <canvas
          className="output_canvas"
          id="outputVideo"
          ref={outputCanvasRef}
        ></canvas>
      </div>
      <video autoPlay id="inputVideoElement" ref={inputVideoRef}></video>
    </div>
  );
};

export default VirtualBackground;
