import * as React from 'react';
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

export default function Home({
  activeStep,
  setActiveStep,
  selectedSteps,
  handleCardSelection,
  resetSelectedSteps,
}) {
  const stepCards = [
    [
      { id: 1, title: 'Step 1 Heading 1', content: 'Step 1 Description 1' },
      { id: 2, title: 'Step 1 Heading 2', content: 'Step 1 Description 2' },
      { id: 3, title: 'Step 1 Heading 3', content: 'Step 1 Description 3' },
      { id: 4, title: 'Step 1 Heading 4', content: 'Step 1 Description 4' },
      { id: 5, title: 'Step 1 Heading 5', content: 'Step 1 Description 5' },
      { id: 6, title: 'Step 1 Heading 6', content: 'Step 1 Description 6' },
      { id: 7, title: 'Step 1 Heading 7', content: 'Step 1 Description 7' },
      { id: 8, title: 'Step 1 Heading 8', content: 'Step 1 Description 8' },
    ],
    [
      { id: 9, title: 'Step 2 Heading 1', content: 'Step 2 Description 1' },
      { id: 10, title: 'Step 2 Heading 2', content: 'Step 2 Description 2' },
      { id: 11, title: 'Step 2 Heading 3', content: 'Step 2 Description 3' },
      { id: 12, title: 'Step 2 Heading 4', content: 'Step 2 Description 4' },
      { id: 13, title: 'Step 2 Heading 5', content: 'Step 2 Description 5' },
      { id: 14, title: 'Step 2 Heading 6', content: 'Step 2 Description 6' },
      { id: 15, title: 'Step 2 Heading 7', content: 'Step 2 Description 7' },
      { id: 16, title: 'Step 2 Heading 8', content: 'Step 2 Description 8' },
    ],
    [
      { id: 17, title: 'Step 3 Heading 1', content: 'Step 3 Description 1' },
      { id: 18, title: 'Step 3 Heading 2', content: 'Step 3 Description 2' },
      { id: 19, title: 'Step 3 Heading 3', content: 'Step 3 Description 3' },
      { id: 20, title: 'Step 3 Heading 4', content: 'Step 3 Description 4' },
      { id: 21, title: 'Step 3 Heading 5', content: 'Step 3 Description 5' },
      { id: 22, title: 'Step 3 Heading 6', content: 'Step 3 Description 6' },
      { id: 23, title: 'Step 3 Heading 7', content: 'Step 3 Description 7' },
      { id: 24, title: 'Step 3 Heading 8', content: 'Step 3 Description 8' },
    ],
  ];
  const cards = stepCards[activeStep];

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
        sx={{ minWidth: '50px' }}
        disabled={activeStep === 0}
        onClick={() => setActiveStep(activeStep - 1)}
      >
        <ArrowBackIosNew />
      </Button>

      {/* Category */}
      <Grid container spacing={1}>
        {cards.map((card) => (
          <Grid item key={card.id} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                opacity: selectedSteps[activeStep].includes(card.id) ? 0.5 : 1,
              }}
              onClick={() => handleCardSelection(activeStep, card.id)}
            >
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image="https://source.unsplash.com/random?wallpapers"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title}
                </Typography>
                <Typography>
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
          sx={{ minWidth: '50px' }}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          <ArrowForwardIos />
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: '50px' }}
          onClick={() => {
            // Add your submit logic here
            console.log('Selected cards:', selectedSteps);
            resetSelectedSteps();
          }}
        >
          <Search />
        </Button>
      )}
    </Box>
  );
}