import React, { memo, useEffect } from "react"
import { useState } from "react"

const ClipboardItem = memo(({ clipboardItem }) => {
  const { types } = clipboardItem

  return (
    <div>
      {types.map((t) => {
        return (
          <span className="type-label" key={t}>
            {t}
          </span>
        )
      })}

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

  return <div>{unknown}</div>
})

const ClipBoardTextItem = memo(({ type, blob, item }) => {
  const [text, setText] = useState(null)
  useEffect(() => {
    const resolveBlob = async () => {
      setText(await blob.text())
    }
    resolveBlob()
  }, [blob])

  return <p>{text}</p>
})

const ClipboardImageItem = memo(({ type, blob, item }) => {
  const [image, setImage] = useState(null)
  useEffect(() => {
    setImage(URL.createObjectURL(blob))
  }, [blob])

  return <img src={image} />
})

export default ClipboardItem
