import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Homepage = ({...restProps}) => {
    return (
        <Wrapper {...restProps}>
            Homepage
        </Wrapper>
    )
}

export default Homepage