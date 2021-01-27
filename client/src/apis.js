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

export const singUpWithToken = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/singUpWithToken`, JSON.parse(request))
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

export const reSendVerficationEmail = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/reSendVerficationEmail`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const logInHidden = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/logInHidden`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const loginWithoutEmail = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/LoginWithoutEmail`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const mergeVideos = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/merge-video`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const trimVideo = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/trimVideo`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const setUserPassword = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/setUserPassword`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const InviteUser = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/InviteUsers`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const updateUserDetails = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/updateUserDetails`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const updateUserMouthguardDetails = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/updateUserMouthguardDetails`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}


export const VerifyVerificationCode = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/VerifyVerificationCode`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const VerifyNumber = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/VerifyNumber`, request,{withCredentials: true})
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

export const uploadProfileSelfie = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/uploadProfileSelfie`, request,{withCredentials: true})
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
export const uploadSidelineImpactVideo = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/uploadSidelineImpactVideo`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const removeVideo = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/removeVideo`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const resetToOriginal = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/resetToOriginal`, request,{withCredentials: true})
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
      axios.post(`/getUserDetails`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAvatarInspection = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAvatarInspection`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getUserDBDetails = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getUserDBDetails`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getUserTokenDBDetails = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getUserTokenDBDetails`, request,{withCredentials: true})
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
      axios.post(`/getHeadAccelerationEvents`, request,{withCredentials: true})
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
      axios.post(`/getPlayersData`, request,{withCredentials: true})
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
      axios.post(`/getOrganizationAdminData`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const fetchAllTeamsInOrganization = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/fetchAllTeamsInOrganization`, request,{withCredentials: true})
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
      axios.post(`/addTeam`, JSON.parse(request),{withCredentials: true})
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
      axios.post(`/deleteTeam`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getCumulativeAccelerationData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getCumulativeAccelerationData`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}


export const getSimulationFilePath = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getSimulationFilePath`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}


export const getSimulationFilesOfPlayer = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getSimulationFilesOfPlayer`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getCumulativeAccelerationTimeData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getCumulativeAccelerationTimeData`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const uploadModelRealData= (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/uploadModelRealData`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const fetchStaffMembers = (request) => {
    return new Promise((resolve,reject)=>{
        axios.post(`/fetchStaffMembers`, request, {withCredentials: true})
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error)
        });
    })
}

export const fetchAdminStaffMembers = (request) => {
    return new Promise((resolve,reject)=>{
        axios.post(`/fetchAdminStaffMembers`, request, {withCredentials: true})
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error)
        });
    })
}
export const fetchOrgStaffMembers = (request) => {
    return new Promise((resolve,reject)=>{
        axios.post(`/fetchOrgStaffMembers`, request, {withCredentials: true})
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error)
        });
    })
}
//fetchTeamStaffMembers
export const fetchTeamStaffMembers = (request) => {
    return new Promise((resolve,reject)=>{
        axios.post(`/fetchTeamStaffMembers`, request, {withCredentials: true})
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error)
        });
    })
}

export const getAllCumulativeAccelerationTimeRecords = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllCumulativeAccelerationTimeRecords`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getCumulativeAccelerationTimeRecords = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getCumulativeAccelerationTimeRecords`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const AllCumulativeAccelerationTimeRecords = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/AllCumulativeAccelerationTimeRecords`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getSimulationDetail = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getSimulationDetail`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllCumulativeAccelerationJsonData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllCumulativeAccelerationJsonData`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getSimulationStatusCount = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getSimulationStatusCount`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const checkIfPlayerExists = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/checkIfPlayerExists`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const listAllUsers = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/listAllUsers`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getUserDetailsForIRB = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getUserDetailsForIRB`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const confirmGuardianIRBConsent = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/confirmGuardianIRBConsent`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getVtkFileLink = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getVtkFileLink`, JSON.parse(request),{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getUpdatesAndNotifications = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getUpdatesAndNotifications`, request)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllSensorBrands = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllSensorBrands`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllSensorBrandsList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllSensorBrandsList`, {},{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllOrganizationsOfSensorBrand = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllOrganizationsOfSensorBrand`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getAllOrganizationsOfSensorBrandList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllOrganizationsOfSensorBrandList`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getAllteamsOfOrganizationOfSensorBrand = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllteamsOfOrganizationOfSensorBrand`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getAllteamsOfOrganizationOfSensorBrandList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getAllteamsOfOrganizationOfSensorBrandList`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getBrainSimulationMovie = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.get(`/getBrainSimulationMovie/`+request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getBrainSimulationLogFile = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.get(`/getBrainSimulationLogFile/`+request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getOrganizationList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getOrganizationList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getOrganizationNameList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getOrganizationNameList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const getTeamList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getTeamList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getTeamNameList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getTeamNameList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getTeamSpheres = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getTeamSpheres`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getFilterdTeamSpheres = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getFilterdTeamSpheres`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getPlayerList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getPlayerList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const loadMorePlayerList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/loadMorePlayerList/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const deleteItem = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/deleteItem/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
export const renameOrganization = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/renameOrganization/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const renameTeam = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/renameTeam/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const addOrganization = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/addOrganization/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const addorgTeam= (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/addorgTeam/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const updateUserStatus = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/updateUserStatus/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const MergeOrganization = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/MergeOrganization/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const MergeTeam = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/MergeTeam/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getOrgUniqueList = () =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getOrgUniqueList/`, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getOrgUniqueTeams = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getOrgUniqueTeams/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const setVideoTime = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/setVideoTime/`,request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

//Demo api for team state page.
export const getFilterdTeamSpheres_demo = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getFilterdTeamSpheres_demo`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const getTeamSpheres_Demo = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getTeamSpheres_Demo`, request,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

export const modalValidationOutput = () =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/modalValidationOutput`,{withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

//# submit jobs api called
export const submitBrainsimulationJobs = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/api/v2/upload/sensor/`, request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}


//# ...
export const checkSensorDataExistsSimulationjsonData = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/api/v2/checkSensorDataExists/json/`, request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

//# getFailedSimulationList
export const getFailedSimulationList = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.post(`/getFailedSimulationList`, request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}

//# getFailedSimulationList
export const filterStrainMetric = (request) =>{
  return new Promise((resolve,reject)=>{
      axios.patch(`/filterStrainMetric`, request, {withCredentials: true})
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}