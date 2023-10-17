import React, { memo, useEffect, useState } from "react"

import styled from "styled-components"

const ExtensionLangHelper = memo(() => {
  const [langKey, setLangKey] = useState("")
  const [langValueEn, setLangValueEn] = useState("")
  const [langValueZh, setLangValueZh] = useState("")
  const [langValueJa, setLangValueJa] = useState("")

  const [resultEn, setResultEn] = useState("")
  const [resultZh, setResultZh] = useState("")
  const [resultJa, setResultJa] = useState("")

  const onKeyChange = (e) => {
    setLangKey(e.target.value)
  }

  const onEnValueChange = (e) => {
    setLangValueEn(e.target.value)
  }

  const onZhValueChange = (e) => {
    setLangValueZh(e.target.value)
  }

  const onJaValueChange = (e) => {
    setLangValueJa(e.target.value)
  }

  const format = (obj) => {
    const json = JSON.stringify(obj, null, 2).trim()
    return json.slice(1).slice(0, json.length - 2)
  }

  useEffect(() => {
    setResultEn(
      format({
        [langKey]: {
          message: langValueEn
        }
      })
    )

    setResultZh(
      format({
        [langKey]: {
          message: langValueZh
        }
      })
    )

    setResultJa(
      format({
        [langKey]: {
          message: langValueJa
        }
      })
    )
  }, [langKey, langValueEn, langValueZh, langValueJa])

  const onZhCopy = async () => {
    await writeToClipboard(`"${langKey}"`)
    await writeToClipboard(resultZh + ",")
  }

  const onEnCopy = async () => {
    await writeToClipboard(`"${langKey}"`)
    await writeToClipboard(resultEn + ",")
  }

  const onJaCopy = async () => {
    await writeToClipboard(`"${langKey}"`)
    await writeToClipboard(resultJa + ",")
  }

  async function writeToClipboard(json) {
    const item = new ClipboardItem({
      "text/plain": new Blob([json], { type: "text/plain" })
    })

    try {
      await navigator.clipboard.write([item])
      return true
    } catch (error) {
      console.error("保存到剪贴板失败", error)
      return false
    }
  }

  const onClear = () => {
    setLangKey("")
    setLangValueEn("")
    setLangValueZh("")
  }

  return (
    <Style>
      <h2>Chrome Extension Language Helper（Chrome 扩展开发多语言辅助工具）</h2>
      <button onClick={onClear} id="btn-clear">
        Clear
      </button>
      <label htmlFor="lang-key">Key: </label>
      <input type="text" id="lang-key" value={langKey} onChange={onKeyChange} />
      <div>
        <label>zh: </label>
        <textarea
          type="text"
          id="lang-value-zh"
          className="lang-value-text"
          rows={3}
          value={langValueZh}
          onChange={onZhValueChange}
        />
      </div>
      <div>
        <label>en: </label>
        <textarea
          type="text"
          id="lang-value-en"
          className="lang-value-text"
          rows={3}
          value={langValueEn}
          onChange={onEnValueChange}
        />
      </div>
      <div>
        <label>ja: </label>
        <textarea
          type="text"
          id="lang-value-ja"
          className="lang-value-text"
          rows={3}
          value={langValueJa}
          onChange={onJaValueChange}
        />
      </div>

      <div className="result">
        <p>{resultZh}</p>
        <button onClick={onZhCopy}>Copy</button>
      </div>
      <div className="result">
        <p>{resultEn}</p>
        <button onClick={onEnCopy}>Copy</button>
      </div>
      <div className="result">
        <p>{resultJa}</p>
        <button onClick={onJaCopy}>Copy</button>
      </div>
    </Style>
  )
})

export default ExtensionLangHelper

const Style = styled.div`
  margin: 0 10px;

  #btn-clear {
    display: block;
    width: 100px;
    height: 24px;
    margin: 5px 0 20px 55px;
  }

  label {
    display: inline-block;
    width: 50px;
    margin-right: 5px;
    text-align: right;
  }

  .lang-value-text {
    width: 800px;
    margin: 5px 0;
  }

  #lang-key {
    width: 300px;
    margin: 5px 0;
  }

  .result {
    margin-left: 55px;

    button {
      width: 80px;
      height: 24px;
    }
  }
`
