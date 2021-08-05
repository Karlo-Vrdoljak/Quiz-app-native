import { createStore } from 'easy-peasy';
import { authModel } from './auth';
import { categoryModel } from './category';
import { globalModel } from './global';

const store = createStore({ authModel, categoryModel, globalModel });

export default store;
