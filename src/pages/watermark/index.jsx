import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

import React, { memo, useEffect, useRef, useState } from "react"

import ImageInfo from "../../components/image-info/ImageInfo"
import ImageInput from "../../components/image-input/ImageInput"
import { calcFileSize, writeToClipboard } from "../../tools/imageHelper"
import useLocalForage from "../../tools/useLocalForage"
import { createWatermark } from "./helper"
import Style from "./style"

const Watermark = memo(() => {
  const [originImgDataUrl, setOriginImgDataUrl] = useState("")
  const [originImgFileSize, setOriginImgFileSize] = useState(0)
  const [watermarkImgDataUrl, setWatermarkImgDataUrl] = useState("")
  const [watermarkImgFileSize, setWatermarkImgFileSize] = useState(0)

  const [watermark, setWatermark] = useState("")

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  const { getItem: getText, setItem: setText } = useLocalForage("watermark-text")

  useEffect(() => {
    getText().then((text) => {
      if (text) {
        setWatermark(text)
      }
    })
  }, [])

  function onInputImageChanged(imageDataUrl) {
    setOriginImgDataUrl(imageDataUrl)
    setOriginImgFileSize(calcFileSize(imageDataUrl))
  }

  function onOriginImageLoaded(e) {
    const img = e.target
    setImgWidth(img.naturalWidth)
    setImgHeight(img.naturalHeight)
    createWatermarkImage(originImgDataUrl, img.naturalWidth, img.naturalHeight, watermark)
  }

  function onWatermarkImageLoaded(e) {
    URL.revokeObjectURL(watermarkImgDataUrl)
  }

  function onWatermarkTextChanged(e) {
    const text = e.target.value
    setWatermark(text)
    createWatermarkImage(originImgDataUrl, imgWidth, imgHeight, text)
  }

  async function createWatermarkImage(dataUrl, width, height, text) {
    if (!text || text.trim() === "") {
      return
    }
    if (width < 0 || height < 0) {
      return
    }
    const { url } = await createWatermark({
      dataUrl,
      width,
      height,
      text
    })
    setWatermarkImgDataUrl(url)
    setWatermarkImgFileSize(calcFileSize(url))

    if (await writeToClipboard(url)) {
      Toastify({
        text: "new image copied to clipboard",
        duration: 3000,
        gravity: "top",
        position: "right"
      }).showToast()
    }

    setText(text)
  }

  return (
    <Style>
      <ImageInput onImageChanged={onInputImageChanged}></ImageInput>

      <div className="image-watermark-box">
        <input
          type="text"
          value={watermark}
          onChange={(e) => onWatermarkTextChanged(e)}
          placeholder="watermark text"></input>
      </div>

      {watermarkImgDataUrl === "" ? null : (
        <div className="image-info">
          <ImageInfo
            oldWidth={imgWidth}
            oldHeight={imgHeight}
            oldSize={originImgFileSize}
            newWidth={imgWidth}
            newHeight={imgHeight}
            newSize={watermarkImgFileSize}></ImageInfo>
        </div>
      )}

      <div className="image-container">
        {originImgDataUrl === "" ? null : (
          <img
            src={originImgDataUrl}
            alt="origin image"
            onLoad={(e) => {
              onOriginImageLoaded(e)
            }}
          />
        )}

        {watermarkImgDataUrl === "" ? null : (
          <img
            src={watermarkImgDataUrl}
            alt="watermark image"
            onLoad={(e) => {
              onWatermarkImageLoaded(e)
            }}
          />
        )}
      </div>
    </Style>
  )
})

Watermark.displayName = "Watermark"
export default Watermark
