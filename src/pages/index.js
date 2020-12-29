import { graphql } from 'gatsby'
import React from 'react'

export default ({ data: { timeoutA, timeoutB } }) => (
  <>
    <p>A: {timeoutA.foo}</p>
    <p>B: {timeoutB.foo}</p>
  </>
)

export const query = graphql`
  query {
    timeoutA {
      foo
    }
    timeoutB {
      foo
    }
  }
`
