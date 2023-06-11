import styled from "styled-components"

import { Navigate, Route, Routes } from "react-router-dom"

import Nav from "./components/nav"
import About from "./pages/about"
import Watermark from "./pages/watermark"

function App() {
  return (
    <Style>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Navigate to="/watermark" />} />
        <Route path="/watermark" element={<Watermark />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Style>
  )
}

export default App

const Style = styled.div``
