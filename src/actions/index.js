import * as TYPES from "./types";
import api from "../api/api";
import history from "../history";

//User Related Actions

export const fetchUser = (token) => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (!data) {
    return { type: TYPES.FETCH_USER };
  }
  return { type: TYPES.FETCH_USER, payload: data };
};

export const signIn = (formValues) => async (dispatch) => {
  try {
    const res = await api.post("/login", formValues);
    console.log(res.data);
    dispatch({ type: TYPES.SIGN_IN, payload: res.data });
    history.push("/");
    localStorage.setItem(
      "data",
      JSON.stringify({
        token: res.data.token,
        // name: res.data.user.name,
        // id: res.data.user._id,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

// export const getUserDetails = (token) => async (dispatch) => {
//   const res = await api({
//     method: 'post',
//     url: '/Employee/getDetails',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   dispatch({ type: TYPES.GET_EMPLOYEE_DETAIL, payload: res.data });
// };

// export const signUp = (formValues) => async (dispatch) => {
//   const res = await api.post('/users', formValues);
//   dispatch({ type: TYPES.SIGN_UP, payload: res.data });
//   history.push('/');
//   localStorage.setItem(
//     'data',
//     JSON.stringify({
//       token: res.data.token,
//       name: res.data.user.name,
//       id: res.data.user._id,
//     })
//   );
// };

export const signOut = (token) => async (dispatch) => {
  await api({
    method: "post",
    url: "/users/logout",
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch({ type: TYPES.SIGN_OUT });
  localStorage.removeItem("data");
  history.push("/login");
};

// EMPLOYEE RELATED ACTIONS//

//Fetch All Employee
export const fetchAllEmployee = (offsetValue) => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("data"));
  try {
    const res = await api({
      method: "get",
      url: `/employee/all?offset=${offsetValue}`,
      headers: { Authorization: `Bearer ${data.token}` },
    });
    console.log(res.data);

    dispatch({ type: TYPES.FETCH_ALL_EMPLOYEE, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// CLIENT RELATED ACTIONS//

//Fetch All Clients
export const fetchAllClient = (offsetValue) => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("data"));
  try {
    const res = await api({
      method: "post",
      url: `/fetchClients`,
      headers: { Authorization: `Bearer ${data.token}` },
      data: { offset: offsetValue },
    });
    console.log(res.data);

    dispatch({ type: TYPES.FETCH_ALL_CLIENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//Fetch Clients with Search (name,number,etc.)
export const fetchClientBySearch = (searchTerm) => async (dispatch) => {
  console.log(searchTerm);
  const data = JSON.parse(localStorage.getItem("data"));
  try {
    const res = await api({
      method: "post",
      url: `/client/search`,
      headers: { Authorization: `Bearer ${data.token}` },
      data: { search: searchTerm },
    });
    console.log(res.data);

    dispatch({ type: TYPES.FETCH_CLIENT_BY_SEARCH, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//Fetch Clients by CLID
export const fetchClientByClid = (clid) => async (dispatch) => {
  console.log(clid);
  const data = JSON.parse(localStorage.getItem("data"));
  try {
    const res = await api({
      method: "post",
      url: `/client/fetchByClid`,
      headers: { Authorization: `Bearer ${data.token}` },
      data: { clid: clid },
    });
    console.log(res.data);

    dispatch({ type: TYPES.FETCH_CLIENT_BY_CLID, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// //TASK RELATED ACTIONS//
// export const fetchTasks = (token) => async (dispatch) => {
//   // const url = () => {
//   //   if (value === 'true' || value === 'false') {
//   //     return `/tasks/?completed=${value}`;
//   //   } else {
//   //     return `/tasks`;
//   //   }
//   // };
//   try {
//     const res = await api({
//       method: 'get',
//       url: `/tasks`,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(res);

//     dispatch({ type: TYPES.FETCH_TASKS, payload: res.data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const fetchTasksByFilter = (token, value) => async (dispatch) => {
//   // try {
//   //   const res = await api({
//   //     method: 'get',
//   //     url: `/tasks/?completed=${value}`,
//   //     headers: { Authorization: `Bearer ${token}` },
//   //   });
//   //   console.log(res.data.length);
//   //   dispatch({ type: TYPES.FETCH_TASKS_BY_FILTER, payload: res.data });
//   // } catch (error) {
//   //   console.log(error);
//   // }
// };

// export const fetchTask = (token, id) => async (dispatch) => {
//   try {
//     const res = await api({
//       method: 'get',
//       url: `/tasks/${id}`,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     console.log(res.data);
//     dispatch({ type: TYPES.FETCH_TASK, payload: res.data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addTask = (formValues, token) => async (dispatch) => {
//   try {
//     const res = await api({
//       method: 'post',
//       url: '/tasks',
//       data: {
//         description: formValues.description,
//         completed: formValues.status,
//       },
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: TYPES.ADD_TASK, payload: res.data });
//     history.push('/tasks');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const editTask = (formValues, token, id) => async (dispatch) => {
//   try {
//     const res = await api({
//       method: 'patch',
//       url: `/tasks/${id}`,
//       data: {
//         description: formValues.description,
//         completed: formValues.status,
//       },
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: TYPES.EDIT_TASK, payload: res.data });
//     history.push('/tasks');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteTask = (token, id) => async (dispatch) => {
//   try {
//     const res = await api({
//       method: 'delete',
//       url: `/tasks/${id}`,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: TYPES.DELETE_TASK, payload: res.data });
//     history.push('/tasks');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addProduct = (formValues, token) => async (dispatch) => {
//   const data = {
//     productName: 'product name',
//     desc: 'description',
//     features: '\nfeatures 2\nfeature 3',
//     videoUrls: [],
//     category: 'Device',
//     featuresData: [
//       'product type',
//       'origin',
//       '78',
//       '23',
//       '12',
//       'weight',
//       '1',
//       'ip rating',
//       'built in battery',
//       'stand by duration',
//       'battery protection',
//       'storage logs',
//       'built in memory',
//       'working voltage',
//       'gps chipset ',
//       'gps signal',
//       'gps channels',
//       'gnss parameter',
//       'irnss parameter',
//       'gps fixed time with agps',
//       'tracking sensitivity',
//       'capturing sensitivity',
//       'gps positioning accuracy',
//       'gsm chipset',
//       'frequency',
//       'gprs',
//       'average standby current',
//       'average working current',
//       'working temperature',
//       'working humidity',
//       'storage temperature',
//       'gps ant',
//       'gsm ant',
//       '1',
//       '2',
//       '2',
//     ],
//     functions: [
//       true,
//       true,
//       false,
//       true,
//       false,
//       true,
//       false,
//       true,
//       false,
//       false,
//       false,
//       false,
//       false,
//       false,
//     ],
//   };

//   try {
//     const res = await api({
//       method: 'post',
//       url: '/addProduct',
//       data: data,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: TYPES.ADD_PRODUCT, payload: res.data });
//     history.push('/tasks');
//   } catch (error) {
//     console.log(error);
//   }
// };
