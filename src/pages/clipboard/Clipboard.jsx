import React, { memo, useEffect, useState } from "react"

import ClipboardItem from "./ClipboardItem"
import Style from "./Style"

const Clipboard = memo(() => {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState("")

  const onReadButtonClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      if (!clipboardItems || clipboardItems.length === 0) {
        setMessage("No items in clipboard")
        setItems([])
      } else {
        setMessage(`${clipboardItems.length} items in clipboard`)
        setItems(clipboardItems)
      }
    } catch (err) {
      console.error(err.name, err.message)
      setMessage(`ERROR ${err.message}`)
      setItems([])
    }
  }

  return (
    <Style>
      <input type="button" onClick={(e) => onReadButtonClick()} value="Read Clipboard"></input>

      <h2>{message}</h2>

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
