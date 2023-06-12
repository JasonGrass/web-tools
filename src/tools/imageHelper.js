/**
 * 计算图片文件大小
 */
function calcFileSize(dataUrl) {
  var strLength = dataUrl.length
  var fileLength = parseInt(strLength - (strLength / 8) * 2)

  return fileLength
}

async function writeToClipboard(dataUrl) {
  const item = new ClipboardItem({
    "image/png": b64toBlob(dataUrl, "image/png", 512)
  })

  try {
    await navigator.clipboard.write([item])
    return true
  } catch (error) {
    console.error("保存图片到剪贴板失败", error)
    return false
  }
}

/** base64转Blob */
const b64toBlob = (b64Data, type, size) => {
  const contentType = type || "image/png"
  const sliceSize = size || 512
  const byteCharacters = window.atob(b64Data.substring(b64Data.indexOf(",") + 1))
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, { type: contentType })
}

export { calcFileSize, writeToClipboard }
