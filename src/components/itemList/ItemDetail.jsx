import React from 'react'
import ItemCount from './ItemCount';
import { Card, CardContent, CardHeader, CardMedia, Chip, Skeleton, Typography } from '@mui/material'
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

const ItemDetail = ( {item, loading} ) => {

return (
    <>
      <Card sx={{ display: 'flex',
                  margin: 15,
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  padding: 5,
                }}
                elevation={24}>
                  
        <Box 
            sx={{ display: 'flex',
                  flexDirection: 'column',
                  borderRight: '1px solid #2580AF',
                  paddingRight: '2rem',
                  paddingLeft: '2rem',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  minWidth: 400}}>
          <CardHeader
                  title={item.title} 
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Item category {item.category} <br/>
              {'Edition: ' + item.capacity} <br/>
            <hr/> 
              <h6><strong>Price ${item.price}</strong> o {item.cuota}</h6> <br/>
              Stock availlable: {item.stock} 
            </Typography>
            {
                  (item.stock <= 8 && item.stock > 0) ?
                    <>
                      <Chip icon={<AccessAlarmOutlinedIcon />} label="Last availables!!" color="primary" size="small" />
                    </>
                    :
                    ""
            }
            <Typography variant="caption" color="text.secondary" component="div">
              Item id: {item.id} <br/>
            </Typography>
            
            <hr/>
          </CardContent>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pl: 1, pb: 1 }}>
            
          {loading ?
            <Skeleton variant="rectangular" width={180} height={50} animation="wave" />
          :
            <ItemCount item={item} stock={item.stock} initial={1} />
          }  
            <Link to={'/'} className="btn btn-secondary btn-sm mt-4">
                Go Back <i className="fas fa-arrow-rotate-left"></i>
            </Link>
        
          </Box>
            
        </Box>
        
        {loading ? 
          
          <Loading/>
          
        :
          <CardMedia
            component="img"
            sx={{ width: 300,
                  margin: 'auto',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  borderRadius: '.5rem', 
                  boxShadow: '#3d343a 2px 0px 8px',
                  alignItems: 'center'
                }}
            image={item.image}
            alt="Perfume Img"
          />
         } 

      </Card>
    </>

  )
}

export default ItemDetail