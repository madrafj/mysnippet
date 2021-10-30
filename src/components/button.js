import styled, { keyframes } from 'styled-components'

const riple = keyframes`
  to { transform: scale(4); }
`

const Button = styled.button`
  position: relative;
  font-family: sans-serif;
  padding: .75rem 1.5rem;
  border: ${({outlined}) => outlined ? '2px solid #1976d2' : 'none'};
  border-radius: 4px;
  color: ${({outlined}) => outlined ? '#1976d2' : '#fafafa'};
  font-size: 1rem;
  font-weight: 600;
  background: ${({outlined}) => outlined ? 'none' : '#1976d2'};
  box-shadow: ${({outlined}) => outlined ? 'none' : '1px 2px 8px #0006'};
  overflow: hidden;

  :hover,
  :focus {
    outline: none;
    background: ${({outlined}) => outlined ? '#aada' : '#42a5f5'};
  }

  :active:before {
    content: "";
    pointer-events: inherit;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: scale(1) translate(-32px, -32px);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(250, 250, 250, .3);
    animation: .3s ${riple} ease-out forwards;
  }
  
  svg {
    vertical-align: middle;
    margin-right: .5em;
    font-size: 1.25em;
  }
`
export default Button