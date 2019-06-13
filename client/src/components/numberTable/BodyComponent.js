import React from 'react';

class BodyComponent extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        const contents = this.props.numbersArray.forEach(item => {
            return <tr>
              <td>{item.id}</td> 
              <td>{item.number}</td>
            </tr>
            })
        return (<React.Fragment>
            <tbody>
            {
                this.props.numbersArray.map(item =>
                    <tr key={item.id}>
                    <td>{item.id}</td> 
                    <td>{item.number}</td>
                  </tr>
          )}
            </tbody>
            </React.Fragment>
            )
    }

}

export default BodyComponent;
