import React, { memo, useEffect, useState } from "react"

import ClipboardItem from "./ClipboardItem"
import Style from "./Style"

const Clipboard = memo(() => {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState("")

  const currentTime = () => {
    return new Date().toLocaleTimeString()
  }

  const onReadButtonClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      if (!clipboardItems || clipboardItems.length === 0) {
        setMessage(`No items in clipboard (${currentTime()})`)
        setItems([])
      } else {
        setMessage(`${clipboardItems.length} clipboardItem in clipboard (${currentTime()})`)
        setItems(clipboardItems)
      }
    } catch (err) {
      console.error(err.name, err.message)
      setMessage(`ERROR: ${err.message} (${currentTime()})`)
      setItems([])
    }
  }

  return (
    <Style>
      <input
        type="button"
        className="read-clipboard-button"
        onClick={(e) => onReadButtonClick()}
        value="Read Clipboard"></input>
      <span className="read-clipboard-message">{message}</span>
      <hr />
      {items.map((item, index) => buildClipboardItemView(item, index))}
    </Style>
  )

  function buildClipboardItemView(clipboardItem, index) {
    return (
      <div key={index}>
        <ClipboardItem clipboardItem={clipboardItem}></ClipboardItem>
      </div>
    )
  }
})

export default Clipboard
