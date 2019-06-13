import React from 'react';
import HeaderComponent from '../numberTable/HeaderComponent'
import BodyComponent from '../numberTable/BodyComponent'
import { getNumbersFromDb } from '../../apis';

class NumberTableComponent extends React.Component {
  constructor() {
    super();
    this.state = { numbers: [],isLoading : false };
  }

  render() {
    if(this.state.isLoading){
     return <h1>Loading...</h1>   
    }
    return (

<React.Fragment>

<table className="table table-bordered">
    <HeaderComponent></HeaderComponent>
    <BodyComponent numbersArray={this.state.numbers}></BodyComponent>
</table>

</React.Fragment>
    );
  }

  componentDidMount() {
      this.setState({isLoading : true});
    getNumbersFromDb().then((response)=>{
        this.setState({ numbers: response.data , isLoading : false });
    }).catch((error)=>{
        this.setState({ numbers: [] , isLoading : false});
    })
  }
}

export default NumberTableComponent;
