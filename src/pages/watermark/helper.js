async function createWatermark({ dataUrl, width, height, text }) {
  //  console.log("createWatermark params", dataUrl, width, height, text)

  const originImgElement = document.createElement("img")
  originImgElement.src = dataUrl

  if (!width || !height) {
    const size = await getImageSize(originImgElement)
    width = size.width
    height = size.height
    console.log(
      `[createWatermark] get size from origin image; width: ${width}; height: ${height} `
    )
  }

  if (width <= 0 || height <= 0) {
    throw Error(`incorrect image size; width: ${width}; height: ${height}`)
  }

  const canvas = await new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    ctx.drawImage(originImgElement, 0, 0)

    // 计算水印颜色
    const { color, shadowColor } = getFontColor(ctx, width, height)

    // 文字大小
    const fontSize = width * 0.02
    // const text = "https://developer.mozilla.org/zh-CN/docs/Web/CSS/font"
    ctx.fillStyle = color
    ctx.textBaseline = "middle"
    // 添加文字阴影
    ctx.shadowColor = shadowColor
    ctx.shadowBlur = 5
    // 设置水印文字大小
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillText(text, width * 0.01, height - fontSize - 2)

    resolve(canvas)
  })

  //  使用 canvas.toBlob 转成最终图像
  const newImgUrl = await new Promise((resolve) => {
    canvas.toBlob((canvasBlob) => {
      const url = URL.createObjectURL(canvasBlob)
      resolve(url)
    })
  })

  return {
    url: newImgUrl,
    width,
    height
  }
}

/**
 * 根据 ctx 计算水印的文字颜色和阴影颜色
 * @param ctx canvas 上下文
 * @param width
 * @param height
 */
function getFontColor(ctx, width, height) {
  const imgData = ctx.getImageData(0, height * 0.9, width, height * 0.1)
  const data = imgData.data
  const r = data[0]
  const g = data[1]
  const b = data[2]

  // const avgColor = `rgba(${r}, ${g}, ${b})`
  // 计算 r g b 颜色的反色
  // const reverseColor = `rgba(${255 - r}, ${255 - g}, ${255 - b})`

  // 判断颜色是否接近白色
  const isCloseWhite = (r + g + b) / 3 > 200

  if (isCloseWhite) {
    return {
      color: `#fff`,
      shadowColor: `#000`
    }
  } else {
    return {
      color: `#000`,
      shadowColor: `#fff`
    }
  }
}

/**
 * 根据 image element, 获取图像的大小
 */
async function getImageSize(imageElement) {
  // 等待图片渲染完成
  await new Promise((resolve) => {
    if (imageElement.complete) {
      resolve()
    } else {
      imageElement.onload = () => {
        resolve()
      }
    }
  })

  return {
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight
  }
}

export { createWatermark }
