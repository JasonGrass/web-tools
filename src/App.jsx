import { Navigate, Route, Routes } from "react-router-dom"

import styled from "styled-components"

import Nav from "./components/nav/Nav"
import About from "./pages/about/About"
import Clipboard from "./pages/clipboard/Clipboard"
import Watermark from "./pages/watermark/Watermark"

function App() {
  return (
    <Style>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Navigate to="/watermark" replace />} />
        <Route path="/watermark" element={<Watermark />} />
        <Route path="/clipboard" element={<Clipboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Style>
  )
}

export default App

const Style = styled.div``
