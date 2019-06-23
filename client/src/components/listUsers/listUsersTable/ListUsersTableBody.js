import React from 'react';
import ListUserTableRow from './ListUserTableRow'

class ListUsersTableBody extends React.Component {
  constructor() {
    super();
    
  }

  render() {
    return <React.Fragment>
      
      <ListUserTableRow userDetail={true}/>

      
      
      </React.Fragment>;
  }

}

export default ListUsersTableBody;
