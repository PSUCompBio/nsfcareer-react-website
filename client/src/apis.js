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