import styled from "styled-components"

import React, { memo } from "react"

const ImageInfo = memo(({ oldWidth, oldHeight, oldSize, newWidth, newHeight, newSize }) => {
  const size1 = (oldSize / 1024).toFixed(2)
  const size2 = (newSize / 1024).toFixed(2)

  return (
    <Style>
      <h4>OLD</h4>
      <p>
        {oldWidth} x {oldHeight}
      </p>
      <p>{size1} KB</p>
      <h4>NEW</h4>
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

  h4,
  p {
    margin: 0;
  }

  h4 {
    margin-top: 10px;
  }

  p {
    margin-top: 3px;
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`
