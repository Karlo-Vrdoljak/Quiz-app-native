import { createStore } from 'easy-peasy';
import { authModel } from './auth';
import { categoryModel } from './category';

const store = createStore({ authModel, categoryModel });

export default store;
