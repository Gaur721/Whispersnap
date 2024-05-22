import React, { useEffect, useState } from "react";
import VirtualBackground from "../../VirtualBackgroundComponent/VirtualBackground";

function VirtualBgHome() {
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [activeImg, setActiveImg] = useState();

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getImages");
      const data = await response.json();
      setImages(data);
      setShowImages(true);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImgSelect = (url) => {
    console.log(url);
    setActiveImg(url);
  };
  return (
    <div>
      <div className=" mainSection">
        <VirtualBackground activeImg={activeImg} />
        <div className="allBGImgs flex">
          {showImages ? (
            <>
              {images.map((image, index) => (
                <img
                  onClick={() => {
                    handleImgSelect(image.url);
                  }}
                  key={index}
                  src={`${image.url}`}
                  alt={image.name}
                  className="bgImg"
                />
              ))}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VirtualBgHome;
