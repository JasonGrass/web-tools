import { useEffect } from "react"

export const useDragImage = (dropBoxRef, callback) => {
  useEffect(() => {
    const dropBox = dropBoxRef.current

    if (!dropBox) {
      return
    }
    document.body.style.cursor = "pointer"

    dropBox.ondragenter = ignoreDrag // 拖动文件的鼠标指针位置放置区之上时发生
    dropBox.ondragover = ignoreDrag
    dropBox.ondrop = drop

    function onMouseOver(event) {
      console.log(event)
      if (event.button === 0) {
        document.body.style.cursor = "move"
      }
    }

    function onMouseLeave() {
      document.body.style.cursor = "default"
    }

    dropBox.addEventListener("mouseover", onMouseOver)
    dropBox.addEventListener("mouseleave", onMouseLeave)

    return () => {
      dropBox.removeEventListener("mouseover", onMouseOver)
      dropBox.removeEventListener("mouseleave", onMouseLeave)
    }
  })

  function ignoreDrag(e) {
    // 确保其他元素不会取得该事件
    e.stopPropagation()
    e.preventDefault()
  }

  function drop(e) {
    e.stopPropagation()
    e.preventDefault() // 取得拖放进来的文件
    var data = e.dataTransfer
    var items = data.files // 将其传给真正的处理文件的函数

    console.log("first", items)

    let file = null
    if (items && items.length) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          file = items[i]
          break
        }
      }
    }

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      callback(e.target.result)
    }
  }
}
