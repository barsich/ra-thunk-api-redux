import {
  CHANGE_SERVICE_FIELD,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  REMOVE_SERVICE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
} from './actionTypes';

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = (error) => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = (services) => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    services,
  },
});

export const deleteServiceRequest = (id) => ({
  type: DELETE_SERVICE_REQUEST,
  payload: { id },
});

export const deleteServiceFailure = (error) => ({
  type: DELETE_SERVICE_FAILURE,
  payload: { error },
});

export const deleteServiceSuccess = () => ({
  type: DELETE_SERVICE_SUCCESS,
});

export const fetchEditableServiceRequest = (id) => ({
  type: EDIT_SERVICE_REQUEST,
  payload: { id },
});

export const fetchEditableServiceFailure = (error) => ({
  type: EDIT_SERVICE_FAILURE,
  payload: { error },
});

export const fetchEditableServiceSuccess = (service) => ({
  type: EDIT_SERVICE_SUCCESS,
  payload: { service },
});

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    name,
    price,
  },
});

export const addServiceFailure = (error) => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    error,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const changeServiceField = (name, value) => ({
  type: CHANGE_SERVICE_FIELD,
  payload: {
    name,
    value,
  },
});

export const removeService = (id) => ({
  type: REMOVE_SERVICE,
  payload: {
    id,
  },
});

export const fetchServices = async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    dispatch(fetchServicesFailure(e.message));
  }
};

export const fetchEditableService = async (dispatch, id) => {
  dispatch(fetchEditableServiceRequest());
  console.log('test')
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchEditableServiceSuccess(data));
  } catch (e) {
    dispatch(fetchEditableServiceFailure(e.message));
  }
};

export const addService = async (dispatch, name, price) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
  fetchServices(dispatch);
};

export const deleteService = async (dispatch, id) => {
  dispatch(deleteServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(deleteServiceSuccess());
    dispatch(removeService(id));
  } catch (e) {
    dispatch(deleteServiceFailure(e.message));
  }
};
