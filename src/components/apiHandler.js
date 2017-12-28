import React,{PropTypes,Component} from 'react'

import {connect} from 'react-redux'
import {
    closeModal, onModalInputChange, openModal, editLoginCredentials, inputChange, backButtonHandle, nextButtonHandle,
    addMoreParams, setErrorStep, addAnotherLogin
} from '../actions/sessionActions'
import {getModalPropsSelector} from '../selectors/index'
import {is_valid_url} from "../helperFunc";
import {ModalComponent} from "./ProcessModal";
import {setAPIHandler} from "../actions/actions";
import {
    API_HANDLER_COMP,
    Credentials, CSRF_COMP, login_required, login_type, modalOpen, path, service, steps,
    success_url
} from "./helpers";
import {API_HANDLER} from "../actions/actionTypes";

export class APIHandlerComponent extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save= this.save.bind(this)
    }
    componentWillMount(){
        this.props.setAPIHandler()
    }
    handleChange(e){
        this.props.inputChange({
            [e.target.name]: e.target.name===login_required ? !this.props.modal[e.target.name] : e.target.value
        })
    }
    getObjectArraySerialized(arrayOfSimpleObjects){
        let str = '';
        arrayOfSimpleObjects.map((item)=>{
            str+=this.getObjectSerialized(item)
        });
        return str
    }

    getObjectSerialized(structure){
        let str='';
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                str+= `${item}=${structure[item]}&`
            }}
        );
        return str
    }
    serialize(structure){
        let l ='';
        let activeRole = structure.crosssite.activeRole
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if (typeof structure[item] !== "object") {
                    if([modalOpen,login_required,service].indexOf(item)===-1){
                        l+=`${item}=${structure[item]}&`
                    }
                }else{
                    if(item===steps){
                        l+=`${path}=${structure[item][3][activeRole][path]}&`
                        l += this.getObjectArraySerialized(structure[item][3][activeRole][Credentials])
                    }
                }
            }
        });
        return l
    }
    save(){
        const state = this.props.modal;
        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1);
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://35.167.23.92/scan/api_handler');
        // xhr.open('post', '/scan/save_loginnew');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                alert('The Login Credentials are saved');
            } else {
                // failure
                // const errors = xhr.response.errors ? xhr.response.errors : {};
                // errors.summary = xhr.response.message;
            }
        });
        xhr.send(hash);
    }
    /*handleSubmit :function (event) {
        event.preventDefault();
    },*/
    /*$('#mainModal').on('hidden.bs.modal', function(){
        // widget      = $(".step");
        // widget.not(':eq(0)').hide();
        // let steps={...this.state.steps}
        let steps=this.state.steps.map(item=>{
            item.visible = index===0
        })
        //current = 1; Not Needed, otherwise back button wont work
    })*/
    show(){
        if (!(is_valid_url(this.props.modal.url))) {
            alert('Enter a valid URL to scan');
            return false;
        }
        this.props.openModal()
    }
    render(){
        const userRoleValues={admin:'Admin',non_admin:'Non Admin',custom_role_1:'Custom Role 1',custom_role_2:'Custom Role 2',no_login:'No Login'}
        const {url,url_id,login_required,service,modalOpen,steps,crosssite}=this.props.modal;
        let activeRole = crosssite.activeRole;
        let request_type = this.props.modal.request_type;
        let loginType = activeRole ? steps[1][login_type][activeRole] : '';
        let successUrl = activeRole ? steps[2][success_url][activeRole] : '';
        let cookieSelCred = activeRole ? steps[3][activeRole] : {};
        /*let logincount;
        if ( crosssite.edit_login ) {
            logincount = crosssite.edit_login;
        }else {
            logincount = jQuery("ul#addedLoginList li").length;
            logincount++;
            (<li>
                <button type = "button" class = "btn btn-primary edit_login" id=`edit-login${logincount}`>`Edit ${activeRole} Login Credentials`</button>
                <div id=`login${logincount}`></div>
            </li>)
        }
        jQuery("#add-another-login").show();
*/
        const options=['GET','POST','PUT','DELETE'];
        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <div className="form-group">
                            <label className="col-sm-4" htmlFor="company">Request Type</label>
                            <div className="col-sm-6 col-md-4">
                                <select id="request-type" className="form-control" value={request_type} name="request_type" onChange={this.handleChange}>
                                    {
                                        options.map((item,index)=> <option key={index} value={item}>{item}</option> )
                                    }
                                </select>
                            </div>
                        </div>
                        <label htmlFor="urlid" className="control-label">End Point:</label>
                        <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={this.handleChange }/>
                        <button type="button" className="btn btn-primary" onClick={()=>this.show()}>Add Path / Params</button>
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    <ModalComponent {...this.props} componentType={API_HANDLER} save={this.save}/>
                </div>
            </div>
        )
    }
}

APIHandlerComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
    modalInputChange:PropTypes.func.isRequired,
    editLoginCredentials:PropTypes.func.isRequired,
    inputChange:PropTypes.func.isRequired,
    backButtonHandle:PropTypes.func.isRequired,
    addMoreParams:PropTypes.func.isRequired,
    nextButtonHandle:PropTypes.func.isRequired,
    setErrorStep:PropTypes.func.isRequired,
    setAPIHandler:PropTypes.func.isRequired

};
const mapStateToProps=state=> {
    return {
        modal:getModalPropsSelector(state)
    }
}
const mapDispatchToProps = (dispatch,getState) => {
    return {
        openModal:(creds)=>{
            dispatch(openModal(creds))
        },
        closeModal:()=>{
            dispatch(closeModal())
        },
        modalInputChange:(data)=>{
            dispatch(onModalInputChange(data))
        },
        editLoginCredentials:(data)=>{
            dispatch(editLoginCredentials(data))
        },
        inputChange:(data)=>{
            dispatch(inputChange(data))
        },
        backButtonHandle:(data)=>{
            dispatch(backButtonHandle(data))
        },
        nextButtonHandle:(data)=>{
            dispatch(nextButtonHandle(data))
        },
        addMoreParams:(data)=>{
            dispatch(addMoreParams(data))
        },
        setAPIHandler:()=>{
            dispatch(setAPIHandler())
        },
        setErrorStep:(data)=>{
            dispatch(setErrorStep(data))
        },
        addAnotherLogin:(data)=>{
            dispatch(addAnotherLogin(data))
        }
    }
};
export const APICtrl = connect(mapStateToProps, mapDispatchToProps)(APIHandlerComponent);
export default APICtrl
