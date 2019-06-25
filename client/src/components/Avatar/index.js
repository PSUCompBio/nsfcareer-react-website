import React from 'react';
import { createAvatar } from '../../apis';
import { formDataToJson } from '../../utilities/utility'
import uuidv1 from 'uuid/v1';

class Avatar extends React.Component {
    constructor() {
        super();

        this.state = {
			users: [
				{"id":1,"firstname":"vitor","lastname":"lima","plyPath":"","originalImagePath":"https://avatar3d.s3.amazonaws.com/images/vlima.png", "download": "none", "createAvatar": "block",isLoading: false},
				{"id":2,"firstname":"asdf","lastname":"qwer","plyPath":"","originalImagePath":"https://avatar3d.s3.amazonaws.com/images/asdf.jpg", "download": "none", "createAvatar": "block",isLoading: false},
				{"id":3,"firstname":"Reuben","lastname":"Kraft","plyPath":"","originalImagePath":"https://avatar3d.s3.amazonaws.com/images/Reuben.jpg", "download": "none", "createAvatar": "block",isLoading: false},
				{"id":4,"firstname":"Ritika","lastname":"Menghani","plyPath":"","originalImagePath":"https://avatar3d.s3.amazonaws.com/images/ritikamenghani.png", "download": "none", "createAvatar": "block",isLoading: false}
			]
        };
        this.handleClick = this.handleClick.bind(this);
    }
	
	handleClick(id, image) {
        
		let user_arr = this.state.users;
		let user;
		
		for (user in user_arr) {
			if (user_arr[user]['id'] === id){
				user_arr[user]['isLoading'] = true;
			}
		}
		
		this.setState({ users: user_arr });

        const formJsonData = {image : image};
        createAvatar(formJsonData).then((data) => {
			
			//console.log(data.data.plyPath);
		   
		    this.setState({ isLoading: false});
		   
			let user_arr = this.state.users;
			let user;
			
			for (user in user_arr) {
				if (user_arr[user]['id'] === id){
					user_arr[user]['plyPath'] = data.data.plyPath;
					user_arr[user]['download'] = 'block';
					user_arr[user]['createAvatar'] = 'none';
					user_arr[user]['isLoading'] = false;
				}
			}	 
			
		   this.setState({ users: user_arr });
		   
        }).catch((err) => {
           
            // catch error 
            alert("error : ", err);
			this.setState({ isLoading: false});
        })
    }
	
	urlOpen(url) {
		if (url === "") {
		  alert('Please create Avatar before download.');
		  return;
		}
		window.open(url, "_blank");
	}
		
	render() {

        return (

            <React.Fragment>
			<div className="showContainer" style={{ marginBottom: '50px'}}>
                <div className="row">
                  {this.state.users.map((user, num) => {
                    return (
                      <div className="col" key={num}>
                        <div className="card">
                          <div>
                            <label>{user.firstname + " "}</label>
                            <label>{user.lastname}</label>
                          </div>
                          <div>
                            <img
							  style={{ width: 'auto', height: '200px', maxWidth: '100%' }}
                              alt=""
                              src={user.originalImagePath}
                              className="imageStyle"
                            />
                          </div>

                          <div>
                            {
							user.isLoading ? 
								<div className="d-flex justify-content-center center-spinner">
								<div className="spinner-border text-primary" role="status" >
								<span className="sr-only">Loading...</span>
								</div>
								</div>: <div><button className="btn btn-primary" style={{ display: user.createAvatar }} onClick={() => this.handleClick(user.id, user.originalImagePath)}>Create Avatar</button>
							<button className="btn btn-primary" style={{ display: user.download }} onClick={() => this.urlOpen(user.plyPath)}>Download Avatar</button> </div>
							}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
               
			</React.Fragment>
        );
    }
}

export default Avatar;	