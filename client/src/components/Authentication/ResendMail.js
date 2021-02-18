import React from 'react';
import Spinners from '../Spinner/Spinner';
import { reSendVerficationEmail } from '../../apis';
import { Alert } from 'react-bootstrap';

class ResendMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            success: false,
            faliuer: false
        }
    }
    componentDidMount = () => {
        const { user_name } = this.props;
        reSendVerficationEmail({ user_name })
            .then(res => {
                if (res.data.message === "failure") {
                    this.setState({
                        isLoading: false,
                        success: false,
                        faliuer: true,
                        error: res.data.error
                    })
                } else {

                    this.setState({
                        isLoading: false,
                        success: true,
                        faliuer: false
                    })
                }

                setTimeout(()=>{
                    window.location.reload();
                },3000)
            }).catch(err => {
                console.log('err', err)
                this.setState({
                    isLoading: false,
                    success: false,
                    faliuer: true,
                    error: "Network error."
                })
            })
    }

    render() {
        const { success, error, faliuer } = this.state;
        if (this.state.isLoading) return <Spinners />;
        return (
            <div className="container dashboard teamstats_header UserDashboarForAdmin-page-navigation brain-simlation-details" style={{ marginBottom: '50px', minHeight: '600px' }}>
                <div className="container" style={{'margin-top': '12%'}}>
                    {success &&
                        <Alert variant="success">
                            <Alert.Heading>Success</Alert.Heading>
                            <hr />
                            <p className="mb-0">
                                verfication mail sended successfully please check your inbox to verify your account.
                        </p>
                        </Alert>
                    }

                    {faliuer &&
                        <Alert variant="danger">
                            <Alert.Heading>Failed</Alert.Heading>
                            <hr />
                            <p className="mb-0">
                                {error}
                            </p>
                        </Alert>
                    }
                </div>
            </div>
        )
    }
}

export default ResendMail