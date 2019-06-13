import React from 'react';
import HeaderComponent from '../numberTable/HeaderComponent'
import BodyComponent from '../numberTable/BodyComponent'
import { getNumbersFromDb, putNumbersToDb } from '../../apis';
import uuidv1 from 'uuid/v1';

class NumberTableComponent extends React.Component {
  constructor() {
    super();
    this.state = { numbers: [],isLoading : false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    
    const data = new FormData(e.target);
    console.log(data);
    
    //
    putNumbersToDb(data).then((data)=>{
        
    }).catch((err)=>{

    })
  }

  render() {
    if(this.state.isLoading){
     return <h1>Loading...</h1>   
    }
    return (

<React.Fragment>
<form method="POST" onSubmit={this.handleSubmit}>
    <div className="row">
    <input type="hidden" name="id" class="form-control" placeholder="Number 1" value={uuidv1()}/>
        <div className="col">
            <input type="text" name="number_1" class="form-control" placeholder="Number 1"/>
        </div>
        <div className="col">
            <input type="text" name="number_2" class="form-control" placeholder="Number 2"/>
        </div>
        <div className="col">
            <input type="text" name="number_3" class="form-control" placeholder="Number 3"/>
        </div>
        <div className="col">
            <input type="text" name="number_4" class="form-control" placeholder="Number 4"/>
        </div>
        <div className="col">
            <input type="text" name="number_5" class="form-control" placeholder="Number 5"/>
        </div>
    </div>
    <button type="submit" className="btn btn-primary">+</button>
</form>
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
