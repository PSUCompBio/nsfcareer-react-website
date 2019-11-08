import React from 'react';

import { Button } from 'reactstrap';

class ToggleToken extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isActive : false
        }

    }
    handleClick = (state) => {
        console.log(state);
        this.setState({
            isActive : state
        })
    }
    render() {
        return (
        <React.Fragment>
        {!this.state.isActive ?
            <button type="button" style={{
                background: "white",
                borderRadius: "50px",
                color : "#0f81dc"
            }}
            onClick={()=> this.handleClick(!this.state.isActive)} class="btn btn-primary">{this.props.buttonText}</button>
            :
            <button type="button" style={{
                borderRadius: "50px",
                color : "white",
                borderColor : "white",
                background : "#6c757d",
                borderWidth: "2px"
            }}

            type="button" onClick={()=> this.handleClick(!this.state.isActive)} class="btn btn-outline-primary">{this.props.buttonText}</button>
        }
        </React.Fragment>
    )
    }
}

export default ToggleToken;
