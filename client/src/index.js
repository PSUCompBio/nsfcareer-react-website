import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import Routing from './pages/Home/Routing';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';



// API
// import { verifyUser } from './apis.js'

class Index extends React.Component {
  constructor(props) {
    super();
    const EVENTS_TO_MODIFY = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel'];
    this.state = {
        endpoint: "http://127.0.0.1:3001"
    }
    const originalAddEventListener = document.addEventListener.bind();
    document.addEventListener = (type, listener, options, wantsUntrusted) => {
      let modOptions = options;
      if (EVENTS_TO_MODIFY.includes(type)) {
        if (typeof options === 'boolean') {
          modOptions = {
            capture: options,
            passive: false,
          };
        } else if (typeof options === 'object') {
          modOptions = {
            passive: false,
            ...options,
          };
        }
      }

      return originalAddEventListener(type, listener, modOptions, wantsUntrusted);
    };

    const originalRemoveEventListener = document.removeEventListener.bind();
    document.removeEventListener = (type, listener, options) => {
      let modOptions = options;
      if (EVENTS_TO_MODIFY.includes(type)) {
        if (typeof options === 'boolean') {
          modOptions = {
            capture: options,
            passive: false,
          };
        } else if (typeof options === 'object') {
          modOptions = {
            passive: false,
            ...options,
          };
        }
      }
      return originalRemoveEventListener(type, listener, modOptions);
    };
    }

  render() {

    return (
      <Router>
        <Provider store={store}>
          <Routing />
        </Provider>
      </Router>
    );
  }
}
// Here we call fetch API to check if user is authenticted or not
// verifyUser().then((response)=>{
// if(response.data.message=="success"){
//   ReactDOM.render(
//     <Router>
//     <Index isAuthenticated={true} isAdmin={response.data.isAdmin}/>
//   </Router>
//     ,
//     document.getElementById('root')
//   );
// }
// else{
//   ReactDOM.render(
//     <Router>
//     <Index isAuthenticated={false} isAdmin={false}/>
//   </Router>
//     ,
//     document.getElementById('root')
//   );
// }
// }).catch((err)=>{

// console.log(err);
//   ReactDOM.render(
// <h1>Internal Service Error </h1>
//     ,
//     document.getElementById('root')
//   );

// })

ReactDOM.render(
  <Index  />,
  document.getElementById('root')
);

export default Index;
