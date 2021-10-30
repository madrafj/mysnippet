import styled from 'styled-components'
import Code from './code'
import { IcRoundDeleteForever, IcRoundEdit } from './icons'

const $Card = styled.div`
  position: relative;
  width: 100%;
  padding: 0 1rem 1rem;
  border-radius: .5rem;
  box-shadow: 2px 3px 3px #0008;
  background: #f0f0f0;
  margin: 1.5rem 1rem;
  box-sizing: border-box;

  h3 { padding-top: .5rem }

  .action-button {
    position: absolute;
    right: 1rem;
    top: .5rem;
    display: flex;
    
    span {
      display: inline-block;
      max-width: 1.5rem;
      height: 1.5rem;
      border-radius: .75rem;
      box-shadow: 0 0 1px 2px #aafa;
      margin-left: .5rem;
      background: #f0f0f0;
      overflow: hidden;
      transition: max-width .4s ease-in-out;
      
      :hover {
        max-width: 6rem;
      }
      svg {
        font-size: 1.5rem;
        background: #fff;
        color: #00a;
        vertical-align: middle;
      }
      button {
        border: none;
        background: none;
        color: #00a;
        font-weight: bold;
      }
    }
  }
  p, div {
    margin-left: .5rem;
    white-space: pre-wrap;
  }
`
const PKGCard = ({dt, onDelete, onEdit}) => (
  <$Card>
    <h3>{dt.title}</h3>
    <div className="action-button">
      <span>
        <IcRoundEdit />
        <button onClick={() => onEdit(dt.id)}>
          Edit
        </button>
      </span>
      <span>
        <IcRoundDeleteForever />
        <button onClick={() => onDelete(dt.id)}>
          Delete!
        </button>
      </span>
    </div>
    {
      dt.content.map((item, i) => (
        item.slice(0,4) === 'code'
        ? <Code inner={item.slice(5)} key={i} />
        : <p key={i}>{item.slice(5)}</p>
      ))
    }
  </$Card>
)

export default PKGCard