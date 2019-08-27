import {ENDPOINT} from './config/constants'
import axios from 'axios';

// function to get number from DB calling our Server API
export const getNumbersFromDb = () =>{
    return new Promise((resolve,reject)=>{
        axios.post(`${ENDPOINT}getNumbers`, {})
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error)
        });
    })
}
export const putNumbersToDb = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}putNumbers`, JSON.parse(request))
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const signUp = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}signUp`, JSON.parse(request))
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const logIn = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}logIn`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const logInFirstTime = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}logInFirstTime`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const isAuthenticated = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}isAuthenticated`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const listUsers = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}listUsers`, {})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const enableUser = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}enableUser`, JSON.parse(request))
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const disableUser = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}disableUser`, JSON.parse(request))
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const uploadProfilePic = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}uploadProfilePic`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getUserDetails = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}getUserDetails`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getProfilePicLink = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}getProfilePicLink`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getInpFileLink = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}getInpFileLink`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getModelLink = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}getModelFileLink`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getSimulationFile = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}getSimulationFileLink`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const verifyUser = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}verifyUser`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const logOut = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}logOut`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const createAvatar = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`${ENDPOINT}createAvatar`, request)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
