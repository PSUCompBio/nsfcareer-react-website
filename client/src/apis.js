import axios from 'axios';



// function to get number from DB calling our Server API
export const getNumbersFromDb = () =>{
    return new Promise((resolve,reject)=>{
        axios.post(`/getNumbers`, {})
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
      axios.post(`/putNumbers`, JSON.parse(request))
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
      axios.post(`/signUp`, JSON.parse(request))
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
      axios.post(`/logIn`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/logInFirstTime`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/isAuthenticated`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/listUsers`, {})
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
      axios.post(`/enableUser`, JSON.parse(request))
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
      axios.post(`/disableUser`, JSON.parse(request))
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
      axios.post(`/uploadProfilePic`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const uploadSensorDataAndCompute = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/uploadSensorDataAndCompute`, request,{withCredentials: true})
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
      axios.post(`/getUserDetails`, {},{withCredentials: true})
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
      axios.post(`/getProfilePicLink`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/getInpFileLink`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/getModelFileLink`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/getSimulationFileLink`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/verifyUser`, {},{withCredentials: true})
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
      axios.post(`/logOut`, {},{withCredentials: true})
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
      axios.post(`/createAvatar`, request)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getCumulativeEventPressureData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getCumulativeEventPressureData`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getCumulativeEventLoadData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getCumulativeEventLoadData`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getHeadAccelerationEvents = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getHeadAccelerationEvents`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getTeamAdminData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getTeamAdminData`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getImpactHistory = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getImpactHistory`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getImpactSummary = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getImpactSummary`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getPlayersData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getPlayersData`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getOrganizationAdminData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getOrganizationAdminData`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllRosters = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllRosters`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const addTeam = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/addTeam`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const deleteTeam = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/deleteTeam`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
