import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{  display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: 'auto',
                      height: '100%',
                      width: '100%'
                  }}>
                    <h5>Loading Picture... </h5>
                    <CircularProgress color="secondary" thickness={5}/>
          </Box>
  )
}

export default Loading