import React from 'react';
import HeaderComponent from '../numberTable/HeaderComponent'
import BodyComponent from '../numberTable/BodyComponent'
import { getNumbersFromDb, putNumbersToDb } from '../../apis';
import { formDataToJson } from '../../utilities/utility'
import uuidv1 from 'uuid/v1';


const numberFormStyle = {
    marginBottom : '18px'
  };

class NumberTableComponent extends React.Component {
    constructor() {
        super();

        // numbers => Array of items received from DynamoDB table `numbers`
        // isLoading => Flag to check if Data is fetched and load component accordingly
        // headerCount => No. Of header items in Table to be displayed 
        // 1st heading is always 'id' then consecutive heading is 'number_1 ... number_5'

        this.state = {
            numbers: [],
            isLoading: false,
            headerCount: 5
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        // converting formData to JSON 
        const formJsonData = formDataToJson(formData)
        putNumbersToDb(formJsonData).then((data) => {
            this.refs.addNumbersForm.reset();
            // Now update the state with data that we added
            this.setState((prevState) => ({ numbers: prevState.numbers.concat(JSON.parse(formJsonData)), isLoading: false }));
            
        }).catch((err) => {
            e.target.reset();
            // catch error 
            console.log("error : ",err);
            
        })
    }

    render() {

        if (this.state.isLoading) {
            return <h3>Loading...</h3>
        }
        return (

            <React.Fragment>
                <form  style={numberFormStyle} onSubmit={this.handleSubmit} ref="addNumbersForm">
                    <div className="row">
                        <input type="hidden" name="id" className="form-control" placeholder="Number 1" value={uuidv1()} />
                        <div className="col">
                            <input type="text" name="number_1" className="form-control" placeholder="Number 1" />
                        </div>
                        <div className="col">
                            <input type="text" name="number_2" className="form-control" placeholder="Number 2" />
                        </div>
                        <div className="col">
                            <input type="text" name="number_3" className="form-control" placeholder="Number 3" />
                        </div>
                        <div className="col">
                            <input type="text" name="number_4" className="form-control" placeholder="Number 4" />
                        </div>
                        <div className="col">
                            <input type="text" name="number_5" className="form-control" placeholder="Number 5" />
                        </div>
                    </div>
                    <button className="btn btn-primary">+</button>
                </form>
                <table className="table table-bordered">
                    <HeaderComponent headerCount={this.state.headerCount}></HeaderComponent>
                    <BodyComponent numbersArray={this.state.numbers}></BodyComponent>
                </table>

            </React.Fragment>
        );
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        getNumbersFromDb().then((response) => {
            this.setState((prevState)=>({ numbers: prevState.numbers.concat(response.data), isLoading: false }));
        }).catch((error) => {
            this.setState({ numbers: [], isLoading: false });
        })
    }
}

export default NumberTableComponent;
