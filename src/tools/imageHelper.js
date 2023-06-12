/**
 * 计算图片文件大小
 */
function calcFileSize(dataUrl) {
  var strLength = dataUrl.length
  var fileLength = parseInt(strLength - (strLength / 8) * 2)

  return fileLength
}

export { calcFileSize }
