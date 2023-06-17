import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';
import {
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useObserver } from 'mobx-react';
import Stores from '../../stores';
import HTTP from '../../apiClient';

export default function StepperNavigation() {
  // category-groups 조회
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    HTTP.get('/api/category-groups')
      .then((response) => {
        setSteps(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const { stepStore }  = Stores();
  return useObserver(() => (
    <Stepper
      activeStep={stepStore.activeStep}
      alternativeLabel
      sx={{
        width: '100%',
        maxWidth: 'sm',
        py: 3,
      }}
    >
      {steps.map((step, index) => (
        <Step
          key={step.category_group_code}
          sx={{
            '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
                color: 'common.white',
                fontWeight: 200,
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                fontWeight: 500,
            },
          }}
        >
          <StepLabel>{step.category_group_title + ' (' + stepStore.selectedSteps[index].length + ')'}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ));
}