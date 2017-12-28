import React,{Component,PropTypes} from 'react'
import { Modal} from 'react-bootstrap';

export default class RegisterModal extends Component{
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email_address:'',
            password:'',
            password1:'',
            error:'',
            waiting:false
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        let name =e.target.name;
        let value = e.target.value;
        console.log('e.target.name ',name);
        console.log('e.target.value ',value);
        this.setState({...this.state,[name]:value})
    }
    handleClick() {
        let payload ={};
        let urlEncoded ='';
        Object.keys(this.state).map((key,index)=>{
            if(['error','waiting'].indexOf(key)===-1){
                payload[key]=this.state[key].trim()
                urlEncoded+= `${key}=${this.state[key].trim()}&`
            }
        });
        let urlEncodeded = urlEncoded.slice(0,urlEncoded.length-1)
        debugger
        this.registerUser(urlEncodeded)
    }
    registerUser(data){
        let config = {
            method: 'POST',
            headers: { 'Content-Type':'application/x-www-form-urlencoded' },
            body: data
        }
        fetch('http://35.167.23.92/scan/register', config)
        .then(response =>{
            console.log('response is ',response )
                return response.json()
                .then(user => ({ user, response }))
            }
        ).then(({ user, response }) =>  {
            if (!response.ok) {
                // If there was a problem, we want to
                // dispatch the error condition
                return Promise.reject(user)
            }
            else {
                // If login was successful, set the token in local storage
                // localStorage.setItem('id_token', user.id_token)

                // Dispatch the success action
                // dispatch(receiveLogin(user))
            }
        }).catch(err => console.log("Error: ", err))
    }

    render(){
        const {registerModalOpen,closeRegisterModal,openRegisterModal,loginUser} = this.props
        let {first_name,last_name,email_address,password,password1} = this.state
        return(
            <Modal className="modal-container" role="document" show={registerModalOpen}>
                <Modal.Header>
                    <h5 className="modal-title">Register
                        <button type="button" className="close" aria-label="Close" onClick={closeRegisterModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <form id="register" ref={"registerForm"} action="/scan/register" method="post" className="form-inline">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    First Name:
                                </div>
                                <div className="col-sm-4">
                                    <input ref="first_name" type="text" size="30" name="first_name" value={first_name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    Last Name:
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" ref='last_name' size="30" name="last_name" value={last_name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    Email Address (username):
                                </div>
                                <div className="col-sm-4">
                                    <input type="email" ref="email_address" size="40" name="email_address" value={email_address} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    Password:
                                </div>
                                <div className="col-sm-4">
                                    <input size="30" ref="password" name="password" type="password" value={password} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    Retype Password:
                                </div>
                                <div className="col-sm-4">
                                    <input size="30" name="password1" type="password" value={password1} onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-primary" value="Register" onClick={() => this.handleClick()} />
                            <button type="button" className="btn btn-secondary" onClick={closeRegisterModal}>Close</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

RegisterModal.PropTypes={
    openRegisterModal:PropTypes.func.isRequired,
    closeRegisterModal:PropTypes.func.isRequired,
    loginUser:PropTypes.func.isRequired,
    registerModalOpen:PropTypes.bool.isRequired
}