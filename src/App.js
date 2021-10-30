import styled, { createGlobalStyle } from 'styled-components'
import { initDB, useIndexedDB } from 'react-indexed-db'
import { DBConfig } from './config/db-config'
import { Fragment, useState } from 'react'
import AddPackage from './view/add'
import Home from './view/home'
import BufferPage from './components/buffer-page'

initDB(DBConfig)

const $Global = createGlobalStyle`
  html {
    font-size: 16px;
  }
`
const $Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
const App = () => {
  const [ modalAdd, setModal ] = useState(undefined)
  const { add } = useIndexedDB('package')

  const handleExample = () => {
    add({
      title: 'Styled Components - React Module',
      content: [
        'code:npm install --save styled-components',
        'text:Then add the following code to package.json',
        'code:{\n  "resolutions": {\n    "styled-components": "^5"\n  }\n}'
      ]
    })
    add({
      title: 'This is Example, try edit me! ',
      content: [
        'code:This is your code snippet\n\nCopy to clipboard by clicking copy button',
        'text:Try Edit, Delete or Add a new one'
      ]
    }).then(() => setModal(
      <BufferPage onLoad={() => setModal(undefined)} />
    ))
  }

  const handleAction = (id=undefined) => setModal(
    <AddPackage id={id} onClose={() => setModal(undefined)} />
  )

  return (
    <Fragment>
      <$Global />
      <$Container>
        {
          modalAdd || <Home onAction={handleAction} onAddExample={handleExample} />
        }
      </$Container>
    </Fragment>
  )
}

export default App