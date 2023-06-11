import React, { memo, useEffect, useRef, useState } from "react"
import { createWatermark } from "./helper"
import { useClipboardImage } from "../../tools/useClipboardImage"

const Watermark = memo(() => {
  const [originImgDataUrl, setOriginImgDataUrl] = useState("")
  const [watermarkImgDataUrl, setWatermarkImgDataUrl] = useState("")

  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)

  useClipboardImage((image) => {
    setOriginImgDataUrl(image)
  })

  async function onFileInput(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setOriginImgDataUrl(reader.result)
    }
  }

  function onOriginImageLoaded(e) {
    const img = e.target
    setImgWidth(img.naturalWidth)
    setImgHeight(img.naturalHeight)
    //     addWatermark(originImgDataUrl, img.naturalWidth, img.naturalHeight)
    addWatermark(originImgDataUrl)
  }

  function onWatermarkImageLoaded(e) {
    URL.revokeObjectURL(watermarkImgDataUrl)
  }

  async function addWatermark(dataUrl, width, height) {
    const { url } = await createWatermark({
      dataUrl,
      width,
      height
    })
    setWatermarkImgDataUrl(url)
  }

  return (
    <div>
      <h2>上传图片</h2>
      <h2>
        Size: {imgWidth} x {imgHeight}
      </h2>

      <input type="file" id="fileInput" onChange={(e) => onFileInput(e)} />

      <div>
        <img
          src={originImgDataUrl}
          alt="origin image"
          onLoad={(e) => {
            onOriginImageLoaded(e)
          }}
          style={{ maxWidth: 800 }}
        />
      </div>

      <div>
        <img
          src={watermarkImgDataUrl}
          alt="watermark image"
          onLoad={(e) => {
            onWatermarkImageLoaded(e)
          }}
          style={{ maxWidth: 800 }}
        />
      </div>
    </div>
  )
})

Watermark.displayName = "Watermark"
export default Watermark
