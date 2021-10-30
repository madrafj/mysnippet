import { useEffect, useState } from 'react'
import { useIndexedDB } from 'react-indexed-db'
import styled from 'styled-components'
import Button from '../components/button'
import { IcRoundCancel, IcRoundCode, IcRoundSave, IcRoundTextFields } from '../components/icons'
import InputText from '../components/input'

const $ModalAdd = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #fafafafa;
  backdrop-filter: blur(4px);

  >div {
    width: 100%;
    max-width: 800px;
    min-width: 480px;
    height: 100%;
    overflow: auto;
    padding: 1em;
    margin-inline: 24px;
    box-sizing: border-box;

    >.divider {
      background: linear-gradient(to right, #0008, #ccc8);
      box-shadow: 0 0 1px #0008;
      padding: 1px;
      margin-bottom: 1em;
    }
    h2 {
      text-shadow: 0 0 2px #008a;
      color: #004;
      margin: .5em 0;
    }
    >div>button {
      margin: .5em .75em;
    }
    .insert-button {
      display: flex;
      justify-content: center;
      margin-bottom: 4rem;
    }
    .action-button {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 4;
      width: 100%;
      margin-inline: auto;
      max-width: 800px;
      padding: .5em 1em;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      background: #fafafa;
      box-shadow: 0 -2px 8px #0006;
    }
  }
`
const AddPackage = ({onClose, id}) => {
  const [state, setState] = useState({
    title: '',
    content: []
  })
  
  // eslint-disable-next-line
  useEffect(() => {
    if (id) {
      getByID(id).then(dt => setState(dt))
    }
  }, [])

  const { add, update, getByID } = useIndexedDB('package')

  const handleTitleChange = val => setState({ ...state, title: val })
  
  const handleItemChange = (val, i) => {
    let nuState = { ...state }
    const type = nuState.content[i].slice(0,4)
    nuState.content[i] = `${type}:${val}`
    setState(nuState)
  }

  const handleAddItem = type => setState({
    title: state.title,
    content: [...state.content, `${type}:`]
  })

  const handleMove = (dir, i) => {
    let nuState = { ...state }
    if (dir === 'up' && i > 0) {
      [nuState.content[i], nuState.content[i-1]] = [nuState.content[i-1], nuState.content[i]]
    }
    else if (dir === 'down' && i < nuState.content.length-1) {
      [nuState.content[i], nuState.content[i+1]] = [nuState.content[i+1], nuState.content[i]]
    }
    else {
      alert("can't move item.")
    }
    setState(nuState)
  }

  const handleRemove = i => {
    let nuState = { ...state }
    nuState.content.splice(i, 1)
    setState(nuState)
  }

  const handleSave = () => {
    if (id) {
      update({...state, id: id}).then(e => console.log('updated'), err => console.log(err))
    }
    else {
      add(state).then(e => console.log('created'), err => console.log(err))
    }
    console.log(state)
    onClose()
  }

  return (
    <$ModalAdd>
      <div>
        <h2>Add New Item</h2>
        <div className="divider"></div>
        <InputText type="title"
          value={state.title}
          onChange={handleTitleChange}
        />
        {
          state.content.map((v, i) => (
            <InputText
              key={i}
              type={v.slice(0,4)}
              value={v.slice(5)}
              onChange={val => handleItemChange(val, i)}
              onMoveUp={() => handleMove('up', i)}
              onMoveDown={() => handleMove('down', i)}
              onRemove={() => handleRemove(i)}
            />
          ))
        }
        <div className="insert-button">
          <Button onClick={() => handleAddItem('text')} outlined>
            <IcRoundTextFields />
            Insert Text
          </Button>
          <Button onClick={() => handleAddItem('code')}>
            <IcRoundCode />
            Insert Code Snippet
          </Button>
        </div>
        <div className="action-button">
          <Button outlined onClick={onClose}>
            <IcRoundCancel />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <IcRoundSave />
            Save
          </Button>
        </div>
      </div>
    </$ModalAdd>
  )
}

export default AddPackage