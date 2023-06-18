import { makeAutoObservable, runInAction } from "mobx";
import HTTP from '../apiClient';

class ProductStore {
  features = [];
  materials = [];
  cares = [];

  constructor() {
    makeAutoObservable(this);
    this.initialize();
  }

  async initialize() {
    await this.fetchFeatures();
    await this.fetchMaterials();
    await this.fetchCares();
  }
  
  async fetchFeatures() {
    try {
      const response = await HTTP.get('/api/features');
      runInAction(() => {
        this.features = response.data;
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async fetchMaterials() {
    try {
      const response = await HTTP.get('/api/materials');
      runInAction(() => {
        this.materials = response.data;
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async fetchCares() {
    try {
      const response = await HTTP.get('/api/cares');
      runInAction(() => {
        this.cares = response.data;
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }
}

const productStore = new ProductStore();
export default productStore;