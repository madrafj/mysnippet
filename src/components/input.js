import { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import { IcRoundArrowUpward, IcRoundDeleteForever } from './icons'

const fadeIn = keyframes`
  from { max-height: 1em; }
  to { max-height: 10em; }
`
const $Input = styled.fieldset`
  display: flex;
  justify-content: space-between;
  padding: 0;
  background: linear-gradient(to left, #aaf 0, #aaf 34px, #f0f0f0 34px, #f0f0f0 100%);
  border: 1px solid #aaf;
  border-radius: .5em;
  margin-bottom: 1em;
  overflow: hidden;
  box-shadow: 1px 1px 4px #0004;
  animation: ${fadeIn} .4s ease-out;

  legend {
    margin-left: .75em;
    color: #00a;
  }
  textarea {
    padding: .5em .75em;
    background: none;
    border: none;
    resize: none;
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;

    :focus {
      outline: none;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
    box-sizing: border-box;
    width: 35px;
  }
  button {
    display: block;
    border-radius: 50%;
    font-size: 1.25em;
    line-height: 1em;
    padding: 0;
    margin-bottom: 4px;
    width: 1.25em;
    height: 1.25em;
    border: none;
    color: #00a;

    :hover {
      color: #f44;
    }
    :active, :focus {
      outline: none;
      box-shadow: 0 0 1px 2px red;
    }
    svg {
      vertical-align: middle;
    }
  }
`
const InputText = ({type, value, onChange, onRemove, onMoveUp, onMoveDown}) => (
  <$Input>
    <legend>{type}</legend>
    <textarea
      autoFocus
      rows={(value.match(/\n/g) || []).length + 2}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <div>
      {
        type !== 'title' &&
        <Fragment>
          <button onClick={onMoveUp} title="Move Up">
            <IcRoundArrowUpward />
          </button>
          <button onClick={onMoveDown} title="Move Down">
            <IcRoundArrowUpward style={{ transform: 'scale(1, -1)' }} />
          </button>
          <button onClick={onRemove} title="Remove Element">
            <IcRoundDeleteForever />
          </button>
        </Fragment>
      }
    </div>
  </$Input>
)

export default InputText