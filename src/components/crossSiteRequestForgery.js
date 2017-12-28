import React,{PropTypes,Component} from 'react'
import {connect} from 'react-redux'
import {openModal, inputChange, saveUser} from '../actions/sessionActions'

import {getModalPropsSelector} from '../selectors/index'
import {is_valid_url} from "../helperFunc";
import { setCrossSiteRequestForgery} from "../actions/actions";
import {login_required, login_type, modalOpen, steps, success_url, userrole} from "./helpers";
import {CROSS_SITE_RQ_FORGERY} from "../actions/actionTypes";
import ProcessModal from "./ProcessModal";

export class CSRFComponent extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.save= this.save.bind(this)
    }
    componentWillMount(){
        this.props.setCrossSiteRequestForgery()
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
        let activeRole = structure.crosssite.activeRole;
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if (typeof structure[item] !== "object") {
                    if([modalOpen,login_required].indexOf(item)===-1){
                        l+=`${item}=${structure[item]}&`
                    }
                }else{
                    if(item===steps){
                        structure[item].map((j,i)=> {
                            if(i===0){
                                l += `${userrole}=${activeRole}&`
                            }else if(i===1) {
                                l += `${login_type}=${j[login_type][activeRole]}&`
                            }else if(i===2) {
                                l += `${success_url}=${j[success_url][activeRole]}&`
                            }else if(i===3) {
                                Object.keys(structure[item][3][activeRole]).map((CookieCredSel, indo) => {
                                    if (structure[item][3][activeRole].hasOwnProperty(CookieCredSel)) {
                                        if (Array.isArray(structure[item][3][activeRole][CookieCredSel])) {
                                            l += this.getObjectArraySerialized(structure[item][3][activeRole][CookieCredSel])
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            }
        });
        return l
    }
    save(){
        const state = this.props.modal;
        const activeRole = state.crosssite.activeRole
        this.props.saveUser({activeRole})

        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1);
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://35.167.23.92/scan/save_loginnew');
        // xhr.open('post', '/scan/save_loginnew');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // this.props.saveUser(state.crosssite.activeRole)
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
        return(
            <div className="col-sm-9">
                <div className="form-group">
                    <form action="" method="post" className="form-inline">
                        <label htmlFor="urlid" className="control-label">URL</label>
                        <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={this.handleChange }/>
                        <input type="hidden" name="url_id" value={url_id} id="urlid1" onChange={this.handleChange}/>
                        <input type="hidden" name="userrole" value={activeRole} onChange={this.handleChange}/>
                        <input type="hidden" name="service" value={service} onChange={this.handleChange}/>
                        <label>
                            <input type="checkbox" label={login_required} name="login_required" id="loginrequired" checked={login_required} onChange={ this.handleChange }/><span>Login Required ?</span>
                        </label>
                        {login_required && (
                            <button type="button" className="btn btn-primary" onClick={()=>this.show()}>Add Login Credentials</button>
                        )}
                        <input type="submit" className="btn btn-primary" value="Scan"/>
                    </form>
                    <ProcessModal {...this.props} componentType={CROSS_SITE_RQ_FORGERY} save={this.save}/>
                </div>
            </div>
        )
    }
}

CSRFComponent.propTypes = {
    modal:PropTypes.object.isRequired,
    inputChange:PropTypes.func.isRequired,
    openModal:PropTypes.func.isRequired,
    setCrossSiteRequestForgery:PropTypes.func.isRequired,
    saveUser:PropTypes.func.isRequired
};
const mapStateToProps=state=> {
    return {
        modal:getModalPropsSelector(state)
    }
};
const mapDispatchToProps = (dispatch,getState) => {
    return {
        openModal:(creds)=>{
            dispatch(openModal(creds))
        },
        inputChange:(data)=>{
            dispatch(inputChange(data))
        },
        setCrossSiteRequestForgery:()=>{
            dispatch(setCrossSiteRequestForgery())
        },
        saveUser:(data)=>{
            dispatch(saveUser(data))
        }
    }
};
export const CSRF = connect(mapStateToProps, mapDispatchToProps)(CSRFComponent);
export default CSRF
