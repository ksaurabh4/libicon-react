import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import clientReducer from './clientReducer';
import employeeReducer from './employeeReducer';
import orderReducer from './orderReducer';
export default combineReducers({
auth: authReducer,
client: clientReducer,
employee: employeeReducer,
order:orderReducer,
form: formReducer,
});