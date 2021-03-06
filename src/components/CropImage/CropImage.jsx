import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "./CropImage.css";
import { useSelector } from 'react-redux';

export default function CropImage({ setCoordinates}) {
  const url = useSelector((state) => state.imageReducer.image)
  const [upImg, setUpImg] = useState(`${url}`);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ display: 'block', maxWidth: '100%' });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setUpImg(url)
  },[url])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    setCoordinates([crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY])
  }, [completedCrop]);

  return (
    <>
      <div style={{
        maxHidth: '250px',
        justifyContent: 'space-between',
        // marginLeft: '4em',
        // marginTop: '2rem'
        }}>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          crossOrigin="anonymous"
        />
        <canvas
          className="canvas"
          ref={previewCanvasRef}
          style={{
          marginLeft: '4em',
          marginBottom: '2rem',
          width: Math.round(completedCrop?.width ?? 0),
          height: Math.round(completedCrop?.height ?? 0)
        }}/>
      </div>
    </>
  );
}
