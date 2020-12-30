import React from 'react';

class DeletePopup extends React.Component {
  constructor() {
    super();
    this.state = {
        user_types : [],
        first_name : '',
        last_name : '',
        email : '',
        isRequesting : false
    };

  }
  // Function to update the array holding type of user
  updateUserType(userType) {
     
  }

  handleDelete = (e)=> {
  }
  scrollToTop(){
    //  window.scrollTo(0, 0)
  }
  componentWillUnmount() {
      
    }
  render() {
    return (
      <div style={this.props.isVisible} className="modal__wrapper ">
         {this.props.isVisible ? this.scrollToTop() : null}
        <div className="modal__show delete-confirmation-box">
          <img
            className="delete__icon"
             onClick={() => this.props.makeVisible({ display: 'none' })}
            src="/img/icon/close.svg"
            alt=""
          />

          <h4>Are you sure you want to delete data?</h4>
          <p>
           It cannot be undone.
          </p>
          <div className="delete-confirmation-button">
            <button className="btn button-back"  onClick={() => this.props.makeVisible({ display: 'none' })}>Go Back</button>
            <button className="btn button-yes" onClick={() => this.props.isDeleteData(true)}>Yes, Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeletePopup;
