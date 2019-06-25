import React,{Fragment} from 'react';

import NumberTableComponent from '../../components/numberTable/NumberTableComponent';
import Avatar from '../../components/Avatar';

class SportsPage extends React.Component {
  render() {
    return (
      <Fragment>
		<h1 class="topspace">Sports Results</h1>
    <div className="container">
	  <Avatar></Avatar>	
      <NumberTableComponent></NumberTableComponent>
    </div>
    </Fragment>
 );
}


}

export default SportsPage;
