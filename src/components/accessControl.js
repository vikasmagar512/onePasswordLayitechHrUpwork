import React,{PropTypes,Component} from 'react'
import { Modal} from 'react-bootstrap';

import {connect} from 'react-redux'
import {
    closeModal, onModalInputChange, openModal, editLoginCredentials, inputChange, backButtonHandle, nextButtonHandle,
    addMoreParams, setErrorStep
} from '../actions/sessionActions'
import {getModalPropsSelector} from '../selectors/index'
import {is_valid_url} from "../helperFunc";
import {ModalComponent} from "./ProcessModal";
import {setAccessControl} from "../actions/actions";

export class AccessCtrlComponent extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount(){
        this.props.setAccessControl()
    }
    handleChange(e){
        /*this.setState({
            [e.target.name]: e.target.name==='login_required' ? !this.state[e.target.name] : e.target.value
        })*/
        this.props.inputChange({
            [e.target.name]: e.target.name==='login_required' ? !this.props.modal[e.target.name] : e.target.value
        })
    }

    /*getObjectSerialized(structure){
        let str=''
        Object.keys(structure).map((item,index)=>{
            console.log('structure item is ',item)
            if(structure.hasOwnProperty(item)) {
                console.log('item is ',item)
                if(Object.keys(this.props.modal.crosssite).indexOf(item)===-1){
                    str+= `${item}=${structure[item]}&`
                    console.log('here str is ',str)
                }
            }}
        )
        return str
    }*/
    getObjectSerialized(structure){
        let str=''
        Object.keys(structure).map((item,index)=>{
            console.log('structure item is ',item)
            if(structure.hasOwnProperty(item)) {
                console.log('item is ',item)
                // if(Object.keys(this.props.modal.crosssite).indexOf(item)===-1){
                str+= `${item}=${structure[item]}&`
                console.log('here str is ',str)
                // }
            }}
        )
        return str
    }
    getLoginTypeUserRoleSuccessURLObjectSerialized(structure,activeRole){
        let str=''
        Object.keys(structure).map((item,index)=>{
            console.log('structure item is ',item)
            if(structure.hasOwnProperty(item)) {
                console.log('item is ',item)
                if(item==='userrole'){
                    str += `${item}=${activeRole}&`
                }else if (['success_url','login_type'].indexOf(item)!==-1){
                    str += `${item}=${structure[item][activeRole]}`
                }
                console.log('here str is ',str)
            }}
        )
        return str
    }
    serialize(structure){
        let l =''
        let activeRole = structure.crosssite.activeRole
        Object.keys(structure).map((item,index)=>{
            if(structure.hasOwnProperty(item)) {
                if (typeof structure[item] !== "object") {
                    debugger
                    if(['modalOpen','login_required'].indexOf(item)===-1){
                        debugger
                        l+=`${item}=${structure[item]}&`
                    }
                    console.log('l is ',l)
                }else{
                    if(item==='steps'){
                        console.log('item===steps')
                        console.log('structure[item] ',structure[item])
                        structure[item].map((j,i)=> {
                            debugger
                            if(i===0){
                                l += `userrole=${activeRole}&`
                            }else if(i===1) {
                                l += `login_type=${j['login_type'][activeRole]}&`
                            }else if(i===2) {
                                l += `success_url=${j['success_url'][activeRole]}&`
                            }else if(i===3) {
                                Object.keys(structure[item][3][activeRole]).map((CookieCredSel, indo) => {
                                    if (structure[item][3][activeRole].hasOwnProperty(CookieCredSel)) {
                                        if (Array.isArray(structure[item][3][activeRole][CookieCredSel])) {
                                            l += this.getObjectArraySerialized(structure[item][3][activeRole][CookieCredSel])
                                        }else{
                                            //api handler "path"
                                            l+=`${CookieCredSel}=${structure[item][3][activeRole][CookieCredSel]}&`
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
        const state = this.props.modal
        let hash = this.serialize(state);

        hash = hash.slice(0,hash.length-1)
        console.log('hash is ',hash)
        // crosssite.edit_login = 0;

        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://35.167.23.92/scan/save_loginnew');
        // xhr.open('post', '/scan/save_loginnew');
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
                    <h4>Compare Access Privilege between different Roles</h4>

                    <form action="" method="post" className="form-inline">
                        <div className="container">
                            <div className="row">
                                <label htmlFor="urlid" className="control-label">Login URL</label>
                                <input type="text" size="50" name="url" id="urlid" value={url} placeholder="https://www.google.com" className="form-control" onChange={this.handleChange }/>
                            </div>
                            <div className="row">&nbsp;</div>
                            <div className="row">
                                <button type="button" className="btn btn-primary" id="mainmodalbutton" onClick={()=>this.show()}>Add Login Credentials</button>
                                <input type="submit" className="btn btn-primary" value="Compare Access Privilege"/>
                            </div>
                        </div>
                    </form>
                    <ModalComponent {...this.props}/>
                </div>
            </div>
        )
    }
}

AccessCtrlComponent.propTypes = {
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
    setAccessControl:PropTypes.func.isRequired

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
        setAccessControl:()=>{
            dispatch(setAccessControl())
        },
        setErrorStep:(data)=>{
            dispatch(setErrorStep(data))
        }
    }
}
export const AccessCtrl = connect(mapStateToProps, mapDispatchToProps)(AccessCtrlComponent);
export default AccessCtrl
