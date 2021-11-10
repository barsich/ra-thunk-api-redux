import { createStore, combineReducers } from 'redux';
import serviceDeleteReducer from '../reducers/serviceDelete';
import serviceEditReducer from '../reducers/serviceEdit';
import serviceListReducer from '../reducers/serviceList';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceDelete: serviceDeleteReducer,
  serviceEdit: serviceEditReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
