import styled from "styled-components"

import React, { memo, useRef, useState } from "react"

import { useClipboardImage } from "../../tools/useClipboardImage"
import { useDragImage } from "../../tools/useDragImage"

const ImageInput = memo(({ onImageChanged }) => {
  const dragAreaRef = useRef()

  const [originImgDataUrl, setOriginImgDataUrl] = useState("")

  useDragImage(dragAreaRef, (image) => {
    setOriginImgDataUrl(image)
    onImageChanged?.(image)
  })

  useClipboardImage((image) => {
    setOriginImgDataUrl(image)
    onImageChanged?.(image)
  })

  async function onFileInput(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setOriginImgDataUrl(reader.result)
      onImageChanged?.(reader.result)
    }
  }

  return (
    <Style>
      <h3>选择图片</h3>

      <div className="image-drag-area" ref={dragAreaRef}>
        <div className="image-drag-area-content">
          <span>使用如下方式之一选择一张图片</span>
          <span>1 在页面中使用 Ctrl+V 粘贴图片</span>
          <span>2 将图片拖进框内</span>
          <span>
            3 从资源管理器选择文件
            <input
              type="file"
              id="fileInput"
              onChange={(e) => onFileInput(e)}
            />
          </span>
        </div>
      </div>
    </Style>
  )
})

export default ImageInput

const Style = styled.div`
  margin: 0 auto;
  width: 50%;
  .image-drag-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 160px;
    background-color: aliceblue;
    border: 3px dashed #aaa;
    border-radius: 10px;
  }

  .image-drag-area-content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > span {
      margin: 3px 0;
      color: #333;
    }
  }

  #fileInput {
    margin-left: 20px;
  }
`
