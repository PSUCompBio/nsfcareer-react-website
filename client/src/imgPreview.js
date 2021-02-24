import React from 'react';
class imgPreview extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const { search } = this.props.location;
        console.log('prosps ',search.split("url=")[1])
        var imageUrl = search.split("url=")[1];
        return (
           <div
            style={{
                'width': '100%',
                'float': 'left',
                'display': 'flex'
            }}
           >
               <img 
                style={{
                    'width': '80%',
                    'margin': 'auto',
                    'margin-top': '28px'
                }}
               src={imageUrl} alt="brain image"/>
           </div>
        )
    }
}

export default imgPreview