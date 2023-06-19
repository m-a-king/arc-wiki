import * as React from 'react';
import {
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { Observer } from "mobx-react-lite";
import Stores from '../../stores';

export default function StepperNavigation() {
  const { categoryStore }  = Stores();

  return (
    <Observer>{() => (
      <Stepper
        activeStep={categoryStore.activeStep}
        alternativeLabel
        sx={{
          width: '100%',
          maxWidth: 'sm',
          py: 3,
        }}
      >
        {categoryStore.categoryGroups.map((categoryGroup) => (
          <Step
            key={categoryGroup.code}
            sx={{
              '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
                  color: 'common.white',
                  fontWeight: 300,
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                  fontWeight: 500,
              },
            }}
          >
            <StepLabel>{`${categoryGroup.title} (${categoryStore.getSelectedCategoriesCount(categoryGroup)})`}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )}</Observer>
  );
}