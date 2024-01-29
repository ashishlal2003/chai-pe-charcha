import React from 'react'
import styled from 'styled-components'

function Welcome({currentUser}) {
  return (
    
    <CointainerWel>
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>
            Select a chat to start messaging.
        </h3>
    </CointainerWel>
  )
}

const CointainerWel = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffff;
    background-color : #834b17;
    img {
        height: 20rem;
    }
`;

export default Welcome
