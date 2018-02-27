import React,{Component,PropTypes} from 'react'
import { Modal} from 'react-bootstrap';
import {closeProfileModal, openProfileModal} from "../../actions/processActions";
import {connect} from "react-redux";
import {getProfileModalDataSelector} from "../../selectors/index";
import {Button} from "../helpers";

export class ProfileModal extends Component{
    constructor(props){
        super(props);
        this.state={...this.props.profileData}
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        debugger
        let name = e.target.name;
        let value = e.target.value;
        if(name.indexOf('question-')!==-1 || name.indexOf('answer-')!==-1){
            let qIndex = name.split('-')[1]
            debugger
            let userQuestions = this.state.userQuestions
            if(name.indexOf('question-')!==-1){
                let question = null
                this.state.questions.map((item,index)=>{
                    if(item.question_id===value){
                        question =item.question
                    }
                })
                userQuestions[qIndex]['question_id']=value
                userQuestions[qIndex]['question']=question
            }else{
                debugger
                userQuestions[qIndex]['answer']=value
            }
            debugger
            this.setState({...this.state,userQuestions:userQuestions})
        }else{
            this.setState({...this.state,[name]:value})
        }
    }
    handleClick() {
        let urlEncoded ='';

        // let formData = new FormData()
        Object.keys(this.state).map((key,index)=>{
            debugger
            if(['first_name','last_name','middle_name','phone'].indexOf(key)!==-1){
                // formData.append(key, this.state[key].trim());
                urlEncoded+= `${key}=${this.state[key].trim()}&`

            }else if(key==='userQuestions'){
                this.state.userQuestions.map((item,index)=>{
                    if(item.question_id!==''){
                        // formData.append(`question-${index+1}`, item.question_id.trim());
                        urlEncoded+= `question-${index+1}=${item.question_id.trim()}&`
                    }
                    urlEncoded+= `question-${index+1}-ans=${item.answer.trim()}&`
                })
            }
        });

        urlEncoded+= `op=update_user&`

        // formData.append(`op`,'update_user');
        let urlEncodeded = urlEncoded.slice(0,urlEncoded.length-1)
        debugger
        this.registerUser(urlEncodeded)

        /*first_name:
        last_name:
        middle_name:
        phone:5555555555
        question-1:7
        question-1-ans:lkll
        question-2:12
        question-2-ans:klllklkl
        question-3-ans:
        op:update_user*/
        // this.registerUser(formData)
    }
    // formData.append(`question-${index+1}-ans`, item.answer.trim());
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
        const {profileModalOpen,closeProfileModal} = this.props
        debugger
        let {first_name,last_name,middle_name,phone,questions,userQuestions} = this.state
        let noOfQuestions=  [0,1,2]

        return(
            <Modal className="modal-container" role="document" show={profileModalOpen}>
                <Modal.Header>
                    <h5 className="modal-title">Profile
                        <button type="button" className="close" aria-label="Close" onClick={closeProfileModal}>
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
                                    Middle Name:
                                </div>
                                <div className="col-sm-4">
                                    <input ref="middle_name" type="text" size="30" name="middle_name" value={middle_name} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    Phone No:
                                </div>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control bfh-phone" name="phone" value={phone} data-format="+1 (ddd) ddd-dddd" onChange={this.handleChange}/>
                                </div>
                            </div>
                            {
                                (noOfQuestions.map((item,j)=>
                                    (<div key={j} className="row">
                                        <div className="col-sm-4">
                                            Security question
                                        </div>
                                        <div className="col-sm-4">
                                            <select name={`question-${j}`} value={userQuestions[j].question_id} onChange={this.handleChange}>
                                                <option value="-1" selected="" disabled="">Please select</option>
                                                {
                                                    questions.map((q, i) => (
                                                        <option key={i} value={q.question_id}>{q.question}</option>
                                                    ))
                                                }
                                            </select>
                                            <input type="text" name={`answer-${j}`} value={userQuestions[j].answer} onChange={this.handleChange}/>
                                        </div>
                                    </div>)
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-secondary" value="Cancel" onClick={() => this.closeProfileModal()} />
                            <input type="button" className="btn btn-primary" value="Update" onClick={() => this.handleClick()} />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

ProfileModal.PropTypes={
    openProfileModal:PropTypes.func.isRequired,
    closeProfileModal:PropTypes.func.isRequired,
    loginUser:PropTypes.func.isRequired,
    profileModalOpen:PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        profileData:getProfileModalDataSelector(state)
    }
}
const mapDispatchToProps = {
    openProfileModal,
    closeProfileModal
}
const ProfileModalContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileModal);

export default ProfileModalContainer