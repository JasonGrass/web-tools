async function createWatermark({ dataUrl, width, height }) {
  console.log("createWatermark params", dataUrl, width, height)

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

    // 添加水印
    ctx.fillStyle = "red"
    ctx.textBaseline = "middle"
    ctx.fillText("123 123 123", 20, 20)

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

async function getImageSize(imageElement) {
  let width = 0
  let height = 0

  await new Promise((resolve) => {
    if (imageElement.complete) {
      width = imageElement.naturalWidth
      height = imageElement.naturalHeight
      resolve()
    } else {
      imageElement.onload = () => {
        width = imageElement.naturalWidth
        height = imageElement.naturalHeight
        resolve()
      }
    }
  })

  return { width, height }
}

export { createWatermark }
