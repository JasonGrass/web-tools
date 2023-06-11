import { useEffect } from "react"

export const useClipboardImage = (callback) => {
  useEffect(() => {
    function onClipboardPaste(event) {
      const file = readImageFromClipboard(event)
      // console.log("onClipboardPaste", file)

      if (!file) {
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        // target.result 该属性表示目标对象的 DataURL
        // console.log(e.target.result)
        callback(e.target.result)
      }
    }

    document.addEventListener("paste", onClipboardPaste)

    return () => {
      document.removeEventListener("paste", onClipboardPaste)
    }
  })
}

function readImageFromClipboard(event) {
  const items = event.clipboardData && event.clipboardData.items
  let file = null
  if (items && items.length) {
    // 检索剪切板items
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        file = items[i].getAsFile()
        break
      }
    }
  }

  return file
}
