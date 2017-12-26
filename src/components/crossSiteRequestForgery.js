import React,{PropTypes,Component} from 'react'

import {connect} from 'react-redux'
import {closeModal, onModalInputChange, openModal, editLoginCredentials, inputChange,backButtonHandle,nextButtonHandle,addMoreParams,setErrorStep
} from '../actions/sessionActions'
import {getModalPropsSelector} from '../selectors/index'
import {is_valid_url} from "../helperFunc";
import {ModalComponent} from "./ProcessModal";
import { setCrossSiteRequestForgery} from "../actions/actions";

export class CSRFComponent extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount(){
        this.props.setCrossSiteRequestForgery()
    }
    handleChange(e){
        /*this.setState({
            [e.target.name]: e.target.name==='login_required' ? !this.state[e.target.name] : e.target.value
        })*/
        this.props.inputChange({
            [e.target.name]: e.target.name==='login_required' ? !this.props.modal[e.target.name] : e.target.value
        })
    }
    getObjectArraySerialized(arrayOfSimpleObjects){
        let str = '';
        arrayOfSimpleObjects.map((item)=>{
            str+=this.getObjectSerialized(item)
        })
        return str
    }
    getObjectSerialized(structure){
        let str=''
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if(Object.keys(this.props.modal.crosssite).indexOf(item)===-1){
                    str+= `${item}=${structure[item]}&`
                }
            }}
        )
        return str
    }
    serialize(structure){
        let l =''
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if (typeof structure[item] !== "object") {
                    if(['modalOpen','login_required'].indexOf(item)===-1){
                        l+=`${item}=${structure[item]}&`
                    }
                }else{
                    if(item==='crosssite'){
                        l+=this.getObjectSerialized(structure[item])
                    }else if(item==='steps'){

                        console.log('structure[item] ',structure[item])
                        structure[item].map((j,i)=> {
                            if ([0,1,2].indexOf(i) !== -1) {
                                l += this.getObjectSerialized(j)
                            } else {
                                Object.keys(structure[item][3]).map((CookieCredSel, indo) => {
                                    if (structure[item][3].hasOwnProperty(CookieCredSel)) {
                                        if (Array.isArray(structure[item][3][CookieCredSel])) {
                                            l += this.getObjectArraySerialized(structure[item][3][CookieCredSel])
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
        return l
    }
    save(){
        alert('save')
        const state = {...this.props.modal}
        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1)
        console.log('hash is ',hash)
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        // xhr.open('post', 'http://35.167.23.92/scan/save_loginnew');
        xhr.open('post', '/scan/save_loginnew');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                console.log(xhr.response)
                console.log('The form is valid');
                alert('The Login Credentials are saved');
                // this.setState({...this.state,url_id:data.scan_id})
            } else {
                // failure
                console.log(xhr.response)
                console.log(xhr.response.message)
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
        console.log('close event');
        this.setState({...this.state,steps:steps})
        //current = 1; Not Needed, otherwise back button wont work
    })*/
    show(){
        if (!(is_valid_url(this.props.modal.url))) {
            alert('Enter a valid URL to scan');
            return false;
        }
        this.props.openModal()
        // this.setState({...this.state,modalOpen:true})
    }
    render(){
        console.log('render props ',this.props.modal)
        const userRoleValues={admin:'Admin',non_admin:'Non Admin',custom_role_1:'Custom Role 1',custom_role_2:'Custom Role 2',no_login:'No Login'}
        const {url,url_id,login_required,service,modalOpen,steps,crosssite}=this.props.modal
        let activeRole = crosssite.activeRole
        // alert(activeRole)
        let login_type = activeRole ? steps[1]['login_type'][crosssite.activeRole] : ''
        let success_url = activeRole ? steps[2]['success_url'][crosssite.activeRole] : ''
        // let success_url= steps[2]['success_url'][crosssite.activeRole]
        let cookieSelCred =  activeRole ? steps[3][crosssite.activeRole] : {}
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
        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <label htmlFor="urlid" className="control-label">URL</label>
                        <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={this.handleChange }/>
                        <input type="hidden" name="url_id" value={url_id} id="urlid1" onChange={ this.handleChange }/>
                        <input type="hidden" name="userrole" value={activeRole} onChange={ this.handleChange }/>
                        <input type="hidden" name="service" value={service} onChange={ this.handleChange }/>
                        <h>{login_required}</h>
                        <input type="checkbox" label={login_required} name="login_required" id="loginrequired" checked={login_required} onChange={ this.handleChange }/>Login Required?
                        {login_required && (
                            <button type="button" className="btn btn-primary" onClick={()=>this.show()}>Add Login Credentials</button>
                            // <button type="button" className="btn btn-primary" id="mainmodalbutton" data-toggle="modal" data-target="#mainModal" onClick={ this.openModal }>Add Login Credentials</button>
                        )}
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    <ModalComponent {...this.props}/>
                </div>
            </div>
        )
    }
}

CSRFComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    openModal:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
    modalInputChange:PropTypes.func.isRequired,
    editLoginCredentials:PropTypes.func.isRequired,
    inputChange:PropTypes.func.isRequired,
    backButtonHandle:PropTypes.func.isRequired,
    addMoreParams:PropTypes.func.isRequired,
    nextButtonHandle:PropTypes.func.isRequired,
    setErrorStep:PropTypes.func.isRequired

}
const mapStateToProps=state=> {
    console.log('mapStateToProps(state)  is ',state)
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
        setCrossSiteRequestForgery:()=>{
            dispatch(setCrossSiteRequestForgery())
        },
        setErrorStep:(data)=>{
            dispatch(setErrorStep(data))
        }

    }
}
export const CSRF = connect(mapStateToProps, mapDispatchToProps)(CSRFComponent);
export default CSRF
