import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
 } from '@mui/material';
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Search,
} from '@mui/icons-material';
import stepCards from '../data/stepCards.json';

export default function Home({
  activeStep,
  setActiveStep,
  selectedSteps,
  handleCardSelection,
  resetSelectedSteps,
}) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(stepCards[activeStep]);
  }, [activeStep]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      {/* Back */}
      <Button
        variant="outlined"
        size="small"
        sx={{
          minWidth: '50px',
          bgcolor: 'rgba(0, 0, 0, .5)',
          color: 'common.white',
          borderRight: '1px solid rgba(255, 255, 255, .2)',
          '&:hover' : {
            bgcolor: 'rgba(0, 0, 0, .65)',
            color: 'common.white',
            borderRight: '1px solid rgba(255, 255, 255, .2)',
          },
          '&.Mui-disabled' : {
            color: '#ccc',
            borderRight: '1px solid rgba(255, 255, 255, .2)',
          },
        }}
        disabled={activeStep === 0}
        onClick={() => setActiveStep(activeStep - 1)}
      >
        <ArrowBackIosNew />
      </Button>

      {/* Category */}
      <Grid container>
        {cards.map((card) => (
          <Grid className='custom-card-grid' item key={card.id} md={6}>
            <Card
              sx={{
                bgcolor: selectedSteps[activeStep].includes(card.id) ?
                'rgba(0, 0, 0, .6)' : 'rgba(0, 0, 0, .5)'
              }}
              onClick={() => handleCardSelection(activeStep, card.id)}
            >
              {/* Image */}
              <CardContent>
                <CardMedia component="img" image={card.url} />
              </CardContent>

              {/* Desc */}
              <CardContent>
                <Typography gutterBottom variant="button" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Forward or Submit */}
      {activeStep < 2 ? (
        <Button
          variant="outlined"
          size="small"
          sx={{
            minWidth: '50px',
            bgcolor: 'rgba(0, 0, 0, .5)',
            color: 'common.white',
            borderLeft: '1px solid rgba(255, 255, 255, .2)',
            '&:hover' : {
              bgcolor: 'rgba(0, 0, 0, .65)',
              color: 'common.white',
              borderLeft: '1px solid rgba(255, 255, 255, .2)',
            },
            '&.Mui-disabled' : {
              color: '#ccc',
              borderLeft: '1px solid rgba(255, 255, 255, .2)',
            },
          }}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          <ArrowForwardIos />
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          sx={{
            minWidth: '50px',
            bgcolor: 'rgba(0, 0, 0, .5)',
            color: 'common.white',
            borderLeft: '1px solid rgba(255, 255, 255, .2)',
            '&:hover' : {
              bgcolor: 'rgba(0, 0, 0, .65)',
              color: 'common.white',
              borderLeft: '1px solid rgba(255, 255, 255, .2)',
            },
            '&.Mui-disabled' : {
              color: '#ccc',
              borderLeft: '1px solid rgba(255, 255, 255, .2)',
            },
          }}
          onClick={() => {
            // Add your submit logic here
            console.log('Selected cards:', selectedSteps);
            navigate('/products');
          }}
        >
          <Search />
        </Button>
      )}
    </Box>
  );
}