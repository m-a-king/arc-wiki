import { makeAutoObservable, runInAction } from "mobx";
import HTTP from '../apiClient';

class CategoryStore {
  categoryGroups = [];
  categories = [];
  activeStep = 0;
  selectedCategories = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  async initialize() {
    await this.fetchCategoryGroups();
    await this.fetchCategories();
  }

  setActiveStep(step) {
    this.activeStep = step;  
    this.fetchCategories();
  }

  toggleCategory(category) {
    const index = this.findSelectedCategoryIndex(category);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  }

  findSelectedCategoryIndex(category) {
    if (this.selectedCategories) {
      return this.selectedCategories.findIndex(c => c.code === category.code);
    }
  }

  getSelectedCategoriesCount(categoryGroup) {
    return this.selectedCategories.filter(c => c.category_group_code === categoryGroup.code).length;
  }

  async fetchCategoryGroups() {
    try {
      const response = await HTTP.get('/api/category-groups');
      runInAction(() => {
        this.categoryGroups = response.data;
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async fetchCategories() {
    try {
      const response = await HTTP.get('/api/categories', {
        params: {
          categoryGroupCode: this.categoryGroups[this.activeStep].code
        }
      });
      runInAction(() => {
        this.categories = response.data;
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
}

const categoryStore = new CategoryStore();
export default categoryStore;