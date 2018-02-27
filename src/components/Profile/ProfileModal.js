import React,{Component,PropTypes} from 'react'
import { Modal} from 'react-bootstrap';

export default class ProfileModal extends Component{
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            middle_name:'',
            phone:'',
            seqQ:[],
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
        const {profileModalOpen,closeProfileModal} = this.props
        // let {first_name,last_name,middle_name,phone,seqQ} = this.state
        let {first_name,last_name,middle_name,phone} = this.state
        let questions=[{"question":"What was your childhood nickname?","question_id":"1"},
            {"question":"In what city did you meet your spouse/significant other?","question_id":"2"},
            {"question":"What is the name of your favorite childhood friend?","question_id":"3"},
            {"question":"What street did you live on in third grade?","question_id":"4"},
            {"question":"What is your oldest siblings birthday month and year? (e.g., January 1900)","question_id":"5"},
            {"question":"What is the middle name of your oldest child?","question_id":"6"},
            {"question":"What is your oldest sibling's middle name?","question_id":"7"},
            {"question":"What school did you attend for sixth grade?","question_id":"8"},
            {"question":"What was your childhood phone number including area code? (e.g., 000-000-0000)","question_id":"9"},
            {"question":"What is your oldest cousin's first and last name?","question_id":"10"},
            {"question":"What was the name of your first stuffed animal?","question_id":"11"},
            {"question":"In what city or town did your mother and father meet?","question_id":"12"},
            {"question":"Where were you when you had your first kiss?","question_id":"13"},
            {"question":"What is the first name of the boy or girl that you first kissed?","question_id":"14"},
            {"question":"What was the last name of your third grade teacher?","question_id":"15"},
            {"question":"In what city does your nearest sibling live?","question_id":"16"},
            {"question":"What is your oldest brothers birthday month and year? (e.g., January 1900)","question_id":"17"},
            {"question":"What is your maternal grandmother's maiden name?","question_id":"18"},
            {"question":"In what city or town was your first job?","question_id":"19"},
            {"question":"What is the name of the place your wedding reception was held?","question_id":"20"},
            {"question":"What is the name of a college you applied to but didn't attend?","question_id":"21"}]

        let user = {
            "phone":null,
            "last_name":"Muthu1",
            "first_name":null,
            "middle_name":null,
            "user_id":"1"
        }
        let userQuestions = [
            {"answer":"pattu","question":"What was your childhood nickname?","question_id":"1"},
            {"answer":"senthil","question":"What is the name of your favorite childhood friend?","question_id":"3"},
            {"answer":"rc school","question":"What school did you attend for sixth grade?","question_id":"8"}
        ]
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
                                    <input ref="middle_name" type="text" size="30" name="first_name" value={middle_name} onChange={this.handleChange}/>
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
                                ([1,2,3].map((j)=>
                                    (<div key={i} className="row">
                                        <div className="col-sm-4">
                                            Security question {{i}}
                                        </div>
                                        <div className="col-sm-4">
                                            <select name="question-1">
                                                <option value="" selected="" disabled="">Please select</option>
                                                (questions).map((q,i)=>(
                                                    <option value={q.id}>{q}</option>
                                                ))
                                            </select>
                                            <input type="text" ref={`ans-${j}`} name={`ans-${j}`}/>
                                        </div>
                                    </div>)
                                ))
                            }
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-primary" value="Register" onClick={() => this.handleClick()} />
                            <button type="button" className="btn btn-secondary" onClick={closeProfileModal}>Close</button>
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