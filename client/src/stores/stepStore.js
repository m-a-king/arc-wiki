import { observable } from "mobx";

const StepStore = observable({
  activeStep: 0,
  selectedSteps: [[], [], []],

  setActiveStep(step) {
    this.activeStep = step;
  },

  setSelectedSteps(steps) {
    this.selectedSteps = steps;
  },
});

export default StepStore;