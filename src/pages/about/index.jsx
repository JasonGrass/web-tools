import styled from "styled-components"

import React, { memo } from "react"

const About = memo(() => {
  const url = "https://github.com/JasonGrass/web-tools"

  return (
    <Style>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </Style>
  )
})

export default About

const Style = styled.div`
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`
