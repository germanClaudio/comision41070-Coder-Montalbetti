import React from 'react'
import { useParams } from 'react-router-dom'
import ItemListContainer from '../itemList/ItemListContainer'

const Items = ( ) => {

  const styleItems = {
    backgroundImage: "radial-gradient(circle, #eeaeca, #94bbe9)",
    fontSize: '1rem',
    paddingTop: '12vh',
    paddingBottom: '4vh',
  }

  const {categoryId} = useParams()

  return (
    <div
      style={styleItems}
    >
      <h1><strong>Category Perfums {categoryId}</strong></h1>
      <hr />
        <ItemListContainer />
      <br />
    </div>
  )
}

export default Items