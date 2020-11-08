import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
`
const Navigation = styled.div`
  border-right: 1px solid black;
  display: flex;
  align-items: center;
justify-content: center;
`

const Layout = ({children, ...restProps}) => {
    return (
        <Wrapper {...restProps}>
            <Navigation>
                Menu
            </Navigation>
            {children}
        </Wrapper>
    )
}

export default Layout