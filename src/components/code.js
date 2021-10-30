import { useRef } from 'react'
import styled from 'styled-components'
import { IcOutlineContentCopy as SvgCopy } from './icons'

const $Code = styled.div`
  position: relative;
  padding: .5em 1.5em;
  border-radius: 4px;
  background: #004d;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  color: #fafafa;

  button {
    position: absolute;
    right: .5em;
    bottom: .5em;
    border: none;
    background: none;
    color: #ddd;
    font-size: 1.25em;
    
    :hover {
      color: #ffa;
    }
    :active {
      background: #ddf;
      color: #004;
    }
  }
`
const Code = ({inner}) => {
  const ref = useRef(null)

  const handleCopy = () => {
    let r = document.createRange()
    r.selectNode(ref.current)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand('Copy')
    window.getSelection().removeAllRanges()
  }

  return (
    <$Code>
      <p ref={ref} >
        {inner}
      </p>
      <button onClick={handleCopy} title="Copy to Clipboard">
        <SvgCopy />
      </button>
    </$Code>
  )
}

export default Code