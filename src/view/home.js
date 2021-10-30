import { useEffect, useState } from 'react'
import { useIndexedDB } from 'react-indexed-db'
import styled from 'styled-components'
import Button from '../components/button'
import PKGCard from '../components/card'
import { IcRoundAddCircleOutline, IcRoundSearch } from '../components/icons'

const $Home = styled.div`
  max-width: 800px;
  min-width: 480px;
  width: calc(100% - 2rem);
  padding: 2rem 0 5rem;

  .addnew-button {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    box-shadow: 0 -4px 16px #fffa;
    display: flex;
    justify-content: center;
    
    >div {
      padding: 1.5rem 4rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 800px;
      box-sizing: border-box;

      span {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;
        min-width: 10rem;
        height: 2rem;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 0 1px 2px #aafa;
        background: #f0f0f0;
        
        svg {
          flex-shrink: 0;
          font-size: 2rem;
          background: #eaeaea;
          color: #00a;
          vertical-align: middle;
        }
        input {
          border: none;
          font-size: 1rem;
          color: #00a;
          width: auto;
          max-width: 15rem;

          :focus {
            outline: 1px solid #aafa;
          }
        }
      }
    }
  }
`
const Home = ({onAction, onAddExample}) => {
  const { getAll, deleteRecord, openCursor } = useIndexedDB('package')
  const [ data, setData ] = useState(undefined)
  const [ keyword, setKeyword ] = useState('')

  // eslint-disable-next-line
  useEffect(() => refreshData(), [])

  const refreshData = () => getAll().then(dt => setData(dt))

  const handleDelete = id => deleteRecord(id).then(refreshData)

  const handleSearch = e => {
    if (e.keyCode === 13) {
      const keywordArr = keyword.toLowerCase().split(' ')
      let tempData = []
      openCursor(evt => {
        const cursor = evt.target.result
        if (cursor) {
          for (const key of keywordArr) {
            if (cursor.value.title.toLowerCase().includes(key)) {
              tempData.push(cursor.value)
              break
            }
          }
          cursor.continue()
        }
        else {
          if (tempData.length>0) {
            setData(tempData)
          }
          else {
            alert('No Records match keyword!')
          }
        }
      })
    }
  }

  return (
    <$Home>
      {
        data && data.length > 0
        ? data.map((v, i) => (
          <PKGCard dt={v} key={i}
            onEdit={id => onAction(id)}
            onDelete={handleDelete}
          />
        ))
        : data ? <Button onClick={onAddExample}>Generate Example</Button>
        : <div>...Loading</div>
      }
      <div className="addnew-button">
        <div>
          <span>
            <IcRoundSearch />
            <input type="text" placeholder="keyword"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyUp={e => handleSearch(e)}
            />
          </span>
          <Button onClick={() => onAction()} outlined>
            <IcRoundAddCircleOutline />
            Add New
          </Button>
        </div>
      </div>
    </$Home>
  )
}

export default Home