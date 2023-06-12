import React, { memo } from "react"

import styled from "styled-components"

import githubIcon from "@/assets/github-mark.svg"

const About = memo(() => {
  const url = "https://github.com/JasonGrass/web-tools"

  return (
    <Style>
      <img src={githubIcon} alt="github icon" />
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

  img {
    margin-bottom: 20px;
  }
`
