import * as React from 'react';
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
import { Observer } from "mobx-react-lite";
import Stores from '../stores';

const backButtonStyle = {
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
};

const nextButtonStyle = {
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
};

const BackButton = ({ isDisabled, onClick }) => (
  <Button
    variant="outlined"
    size="small"
    sx={{ ...backButtonStyle }}
    disabled={isDisabled}
    onClick={onClick}
  >
    <ArrowBackIosNew />
  </Button>
);

const ForwardButton = ({ onClick }) => (
  <Button
    variant="outlined"
    size="small"
    sx={{ ...nextButtonStyle }}
    onClick={onClick}
  >
    <ArrowForwardIos />
  </Button>
);

const SubmitButton = ({ onClick }) => (
  <Button
    variant="outlined"
    size="small"
    sx={{ ...nextButtonStyle }}
    onClick={onClick}
  >
    <Search />
  </Button>
);

export default function Home() {
  const navigate = useNavigate();
  const { categoryStore }  = Stores();

  const handleBackClick = () => {
    categoryStore.setActiveStep(categoryStore.activeStep - 1);
  };

  const handleCategoryClick = (category) => {
    categoryStore.toggleCategory(category);
  };

  const handleForwardClick = () => {
    categoryStore.setActiveStep(categoryStore.activeStep + 1);
  };

  const handleSubmitClick = () => {
    // 1. 선택된 카테고리의 코드들을 추출합니다.
    const categoryCodes = categoryStore.selectedCategories.map((category) => category.code);
  
    // 2. '/products' 경로로 이동하고, 선택된 카테고리 코드들을 상태로 전달합니다.
    navigate('/products', { state: { categoryCodes: categoryCodes } });
  };
  
  return (
    <Observer>{() => (
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <BackButton
          isDisabled={categoryStore.activeStep === 0}
          onClick={handleBackClick}
        />

        <Grid container>
          {categoryStore.activeCategories.map((category) => (
            <Grid className='custom-card-grid' item key={category.code} md={6}>
              <Card
                sx={{
                  bgcolor: categoryStore.findSelectedCategoryIndex(category) > -1 ?
                  'rgba(0, 0, 0, .6)' : 'rgba(0, 0, 0, .5)'
                }}
                onClick={() => handleCategoryClick(category)}
              >
                {/* Image */}
                <CardContent>
                  <CardMedia component="img" image={category.icon} />
                </CardContent>

                {/* Desc */}
                <CardContent>
                  <Typography gutterBottom variant="button" sx={{ fontWeight: 'bold' }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2">
                    {category.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {categoryStore.activeStep < 2 ?
          <ForwardButton onClick={handleForwardClick} />
          :
          <SubmitButton onClick={handleSubmitClick} />
        }
      </Box>
    )}</Observer>
  );
}