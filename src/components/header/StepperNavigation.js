import * as React from 'react';
import {
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

export default function StepperNavigation({ steps, activeStep, selectedSteps }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        width: '100%',
        maxWidth: 'sm',
        py: 3,
      }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{label + ' (' + selectedSteps[index].length + ')'}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}