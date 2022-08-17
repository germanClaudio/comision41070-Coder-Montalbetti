import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, CardActionArea, CardHeader, Grid, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const ItemList = (props) => {

  const cards = props.cards;

  return (
    <div
      style={{
        display: 'inline-flex',
        marginLeft: '10',
        marginRight: '10'
      }} >
      <br />

      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap='wrap'>

        {cards.map(card => (
          <Card key={card.id}
            sx={{
              maxWidth: 270,
              height: 650,
              display: 'inline',
              flexDirection: 'row',
              m: 4,
              flexWrap: 'wrap',
            }}
            elevation={24}
          >
            <CardHeader
              title={card.title}
              subheader={'Edition: ' + card.capacity}
            />
            <CardActionArea>
              {
                card.stock === 0 ?
                  <>
                    <CardMedia
                      component="img"
                      height="300"
                      image={card.image}
                      alt="Perfum Image"
                      sx={{ filter: "blur(3px)" }}
                    />
                    <Chip icon={<SentimentVeryDissatisfiedIcon />} label="Sold Out!!" color="error"
                      sx={{ position: 'relative', bottom: 180, left: 0 }} />

                  </>
                  :

                  <CardMedia
                    component="img"
                    height="330"
                    image={card.image}
                    alt="Perfum Image"
                    sx={{ color: 'primary.main' }}
                  />
              }
              <hr />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <h6><strong>${card.price}</strong> {card.cuota}</h6>
                </Typography>
                {
                  (card.stock <= 8 && card.stock > 0) ?
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Stock available: {card.stock}
                      </Typography>
                      <Chip icon={<AccessAlarmOutlinedIcon />} label="Last availables!!" color="primary" size="small" />
                    </>
                    :
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Stock available: {card.stock}
                      </Typography>
                      <br />
                    </>
                }
              </CardContent>
            </CardActionArea>

            <CardActions>
            </CardActions>
            {
              card.stock === 0 ?
                <Chip icon={<SentimentVeryDissatisfiedIcon />} label="Sold Out!!" color="error" />

                :

                <Link to={`/ItemDetailContainer/${card.id}`} className="btn btn-secondary btn-sm my-1">
                  See Product's Detail
                </Link>
            }
          </Card>
        ))}
      </Grid>
    </div>
  )
}

export default ItemList