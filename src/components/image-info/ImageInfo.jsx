import styled from "styled-components"

import React, { memo } from "react"

const ImageInfo = memo(({ oldWidth, oldHeight, oldSize, newWidth, newHeight, newSize }) => {
  const size1 = (oldSize / 1024).toFixed(2)
  const size2 = (newSize / 1024).toFixed(2)

  return (
    <Style>
      <h3>OLD</h3>
      <p>
        {oldWidth} x {oldHeight}
      </p>
      <p>{size1} KB</p>
      <h3>NEW</h3>
      <p>
        {newWidth} x {newHeight}
      </p>
      <p>{size2} KB</p>
    </Style>
  )
})

export default ImageInfo

const Style = styled.div`
  max-width: 200px;
`
