import React, { memo, useEffect, useRef, useState } from "react"

import ImageInput from "../../components/image-input/ImageInput"
import { createWatermark } from "./helper"
import Style from "./style"

const Watermark = memo(() => {
  const [originImgDataUrl, setOriginImgDataUrl] = useState("")
  const [watermarkImgDataUrl, setWatermarkImgDataUrl] = useState("")

  const [watermark, setWatermark] = useState("")

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  function onInputImageChanged(dataUrl) {
    setOriginImgDataUrl(dataUrl)
  }

  function onOriginImageLoaded(e) {
    const img = e.target
    setImgWidth(img.naturalWidth)
    setImgHeight(img.naturalHeight)
    createWatermarkImage(
      originImgDataUrl,
      img.naturalWidth,
      img.naturalHeight,
      watermark
    )
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
  }

  return (
    <Style>
      <ImageInput onImageChanged={onInputImageChanged}></ImageInput>

      <div className="image-infos">
        <div className="image-info-box">
          <span>
            Size: {imgWidth} x {imgHeight}
          </span>
          <input
            type="text"
            value={watermark}
            onChange={(e) => onWatermarkTextChanged(e)}
            placeholder="watermark text"></input>
        </div>
      </div>

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
