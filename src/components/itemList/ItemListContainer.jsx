import { Box, CircularProgress, Grid } from '@mui/material';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ItemList from './ItemList';
import { collection, getDocs, query, where, limit, getFirestore } from 'firebase/firestore'

const ItemListContainer = () => {

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const queryCollectionItems = collection(db, 'items');

    if (categoryId) {
      const timer = setTimeout(() => {
        const queryCollectionItemsFiltered = query(
          queryCollectionItems,
          where('category', '==', categoryId),
          limit(10)
        );
        getDocs(queryCollectionItemsFiltered)
          .then((response) => setCards(response.docs.map(card => ({ id: card.id, ...card.data() }))))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
      }, 1000);
      return () => clearTimeout(timer);

    } else {

      const timer = setTimeout(() => {
        getDocs(queryCollectionItems)
          .then((response) => setCards(response.docs.map(card => ({ id: card.id, ...card.data() }))))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [categoryId])

  return (
    <Box sx={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    }} style={{ width: '100%' }}>

      {
        loading ?
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '12rem',
            paddingBottom: '10%'
          }}>
            <h2>Loading Items.....</h2>
            <CircularProgress color="success" thickness={6} size="3rem" />
          </Box>

          :

          <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 8 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            flexWrap='wrap'
          >

            <Grid container
              direction="row"
              justifyContent="right"
              alignItems="center"
              flexWrap='wrap'
            >
            </Grid>
            
            <Grid item xs={1} sm={4} md={4}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              flexWrap='wrap'
            >
              <ItemList cards={cards} />

            </Grid>
          </Grid>
      }
    </Box>

  )
}

export default ItemListContainer