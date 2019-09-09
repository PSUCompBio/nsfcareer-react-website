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
  <Index isAuthenticated={true} isAdmin={true} />,
  document.getElementById('root')
);

export default Index;
