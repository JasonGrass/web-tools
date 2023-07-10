import React, { memo, useEffect } from "react"
import { useState } from "react"

const ClipboardItem = memo(({ clipboardItem }) => {
  const { types } = clipboardItem

  return (
    <div className="clipboard-item">
      {/*  MIME type 标签 */}
      <div className="type-labels">
        {types.map((t) => {
          return (
            <code className="type-label" key={t}>
              {t}
            </code>
          )
        })}
      </div>

      {/* 具体内容 */}
      {types.map((t) => {
        return (
          <div key={t}>
            <ClipboardTypeItem type={t} item={clipboardItem}></ClipboardTypeItem>
          </div>
        )
      })}
    </div>
  )
})

// ClipboardItem 内容展示
const ClipboardTypeItem = memo(({ type, item }) => {
  const [itemBlob, setItemBlob] = useState(null)

  useEffect(() => {
    const getBlob = async () => {
      const blob = await item.getType(type)
      setItemBlob(blob)
    }
    getBlob()
  }, [item])

  if (!itemBlob) return null

  if (type === "text/plain" || type === "text/html") {
    return <ClipBoardTextItem type={type} blob={itemBlob} item={item}></ClipBoardTextItem>
  }

  if (type.indexOf("image") !== -1) {
    return <ClipboardImageItem type={type} blob={itemBlob} item={item}></ClipboardImageItem>
  }

  const unknown = `UNKNOWN TYPE: ${type}`
  return (
    <ClipBoardTextItem title={unknown} type={type} blob={itemBlob} item={item}></ClipBoardTextItem>
  )
})

// 文本内容
const ClipBoardTextItem = memo(({ title, type, blob, item }) => {
  const [text, setText] = useState(null)
  useEffect(() => {
    const resolveBlob = async () => {
      setText(await blob.text())
    }
    resolveBlob()
  }, [blob])

  return (
    <ClipboardItemContainer title={title} type={type}>
      <p>{text}</p>
    </ClipboardItemContainer>
  )
})

// 图片内容
const ClipboardImageItem = memo(({ type, blob, item }) => {
  const [image, setImage] = useState(null)
  useEffect(() => {
    setImage(URL.createObjectURL(blob))
  }, [blob])

  return (
    <ClipboardItemContainer type={type}>
      <img className="item-content-image" src={image} />
    </ClipboardItemContainer>
  )
})

const ClipboardItemContainer = ({ title, type, children }) => {
  return (
    <div className="item-container">
      <div className="item-header">
        <span className="item-title">{title}</span>
        <span className="item-type">{type}</span>
      </div>
      <div className="item-content">{children}</div>
    </div>
  )
}

export default ClipboardItem
