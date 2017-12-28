import {Cookie, Credentials, Selenium, formAndAddStep3Object,  is_valid_url,getValues} from "../helperFunc";
import {
    UserRoleComponent, LoginDetailsComponent, LoginTypeComponent, SuccessURLComponent, Button,
    login_type, path, userrole, success_url, CSRF_COMP, API_HANDLER_COMP, ACCESS_CONTROL_COMP
} from './helpers'
import React,{PropTypes,Component} from 'react'
import { Modal} from 'react-bootstrap';
import {ACCESS_CONTROL, API_HANDLER, CROSS_SITE_RQ_FORGERY} from "../actions/actionTypes";
import {getAPIModifiedSteps, getModifiedSteps, INITIAL_CROSSSITE} from "../reducers/sessionReducer";

export class ModalComponent extends Component{
    constructor(props){
        super(props);
        this.onModalInputChange= this.onModalInputChange.bind(this);
        this.addMoreParams= this.addMoreParams.bind(this);
        this.EditLoginCredentials= this.EditLoginCredentials.bind(this)
        this.addAnotherLoginCred= this.addAnotherLoginCred.bind(this)
    }
    setUserRole(steps,crosssite,selectedUserrole){
        steps[0][userrole].add(selectedUserrole);
        steps[1][login_type][selectedUserrole]='';
        steps[2][success_url][selectedUserrole]='';
        crosssite.activeRole=selectedUserrole;
        steps[3][selectedUserrole] = formAndAddStep3Object(selectedUserrole);
        return {steps,crosssite}
    }
    onModalInputChange(e){
        let {steps,crosssite}=this.props.modal;
        let activeRole = crosssite.activeRole;

        if(crosssite.currentstep===4 ){
            let loginType = steps[1][login_type][activeRole];
            if(e.target.name===path){
                steps[3][activeRole][path] = e.target.value
            }else{
                steps[3][activeRole][loginType].map((item,index)=>{
                    if(item.hasOwnProperty(e.target.name)){
                        steps[3][activeRole][loginType][index][e.target.name]=e.target.value
                    }
                })
            }
        }else{
            if(e.target.name === userrole){
                let selectedUserrole = e.target.value;
                if(!(steps[0][userrole].has(selectedUserrole))){
                    steps[0][userrole].add(e.target.value);
                    steps[1][login_type][selectedUserrole]='';
                    steps[2][success_url][selectedUserrole]='www.google.com';
                    crosssite.activeRole=selectedUserrole;
                    steps[3][selectedUserrole] = formAndAddStep3Object(selectedUserrole)
                }else {
                    crosssite.activeRole=selectedUserrole
                }
            }else {
                //login_type
                //success_url
                steps[crosssite.currentstep-1][e.target.name][crosssite.activeRole]=e.target.value
            }
        }
        crosssite.currentWarning=false;
        this.props.modalInputChange({steps,crosssite})
    }
    closeModal(){
        this.props.closeModal()
    }
    backButtonHandle(){
        if(this.props.modal.crosssite.currentstep > 1){
            /*if(this.props.modal.crosssite.activeRole==='no_role'){
                if(this.props.modal.crosssite.currentstep <= 2) {
                    return
                }
            }*/
            this.props.backButtonHandle({...this.props.modal.crosssite,currentstep:this.props.modal.crosssite.currentstep - 1,currentWarning:false})
        }
    }
    nextButtonHandle(){
        const {currentstep,limit} = this.props.modal.crosssite;
        if (currentstep) {
            if (!this.canClickNext()) {
                this.props.setErrorStep({...this.props.modal.crosssite,currentWarning:true})
                return;
            }
        }
        if(currentstep < limit){
            this.props.nextButtonHandle({...this.props.modal.crosssite,currentstep:currentstep + 1,currentWarning:false})
        }
    }
    canClickNext(){
        const currentstep = this.props.modal.crosssite.currentstep;
        if ( currentstep === 1 ) return this.validate_login_role();
        if ( currentstep === 2 ) return this.validateLoginType();
        if ( currentstep === 3 ) return this.validateRedirectURL();
    }
    validateRedirectURL(){
        let activeRole = this.props.modal.crosssite.activeRole;
        return is_valid_url(this.props.modal.steps[2][success_url][activeRole])
    }
    addMoreParams(){
        let steps = [...this.props.modal.steps];
        const activeRole = this.props.modal.crosssite.activeRole;
        const loginType = steps[1][login_type][activeRole];
        const map = {'Credentials':Credentials,'Cookie':Cookie,'Selenium':Selenium};
        steps[3][activeRole][loginType].push(getValues(map[loginType],steps[3][activeRole][loginType].length+1));
        this.props.addMoreParams({steps})
    }
    addAnotherLoginCred(){
        const componentType = this.props.componentType
        console.log('here INITIAL_CROSSSITE ',INITIAL_CROSSSITE)
        switch (componentType){
            case CROSS_SITE_RQ_FORGERY:{
                break
            }
            case ACCESS_CONTROL:{
                console.log('here INITIAL_CROSSSITE ',INITIAL_CROSSSITE)
                const k ={activeRole:'', currentstep: 1, currentWarning: false, limit: 5, edit_login: 0}
                debugger
                this.props.addAnotherLogin(k)
                break
            }
            case API_HANDLER:{
                break
            }
            default:
        }
    }
    validate_login_role(){return this.props.modal.crosssite.activeRole !==''}
    validateLoginType(){
        const activeRole = this.props.modal.crosssite.activeRole;
        return  (this.props.modal.steps[1][login_type][activeRole]!=='')
    }
    EditLoginCredentials(e){
        let {crosssite} = this.props.modal;
        const userrole = e.target.id;
        this.props.editLoginCredentials({...crosssite,activeRole : userrole ,currentstep : 4 })
    }
    render(){
        const userRoleValues={admin:'Admin',non_admin:'Non Admin',custom_role_1:'Custom Role 1',custom_role_2:'Custom Role 2',no_login:'No Login'}
        const {modalOpen,steps,crosssite}=this.props.modal;
        const {activeRole,currentWarning}= crosssite;
        let loginType = activeRole ? steps[1][login_type][activeRole] : '';
        let successURL = activeRole ? steps[2][success_url][activeRole] : '';
        let cookieSelCred = activeRole ? steps[3][activeRole] : {};
        let path = activeRole ? (steps[3][activeRole]).hasOwnProperty('path') ? steps[3][activeRole]['path'] : undefined : undefined
        const componentType = this.props.componentType
        return(
            <Modal className="modal-container" show={modalOpen} onHide={()=>this.closeModal()} animation>
                <Modal.Header>
                    <button type="button" className="close" data-dismiss="modal" onClick={()=>this.closeModal()}>&times;</button>
                    <h4 className="modal-title">Add Login Credentials</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="addedLogin">
                        <ul id="addedLoginList" className="list-unstyled list-inline">
                            {[...steps[0]['userrole']].map((item,index)=>
                                (<li key={index}>
                                    <Button className = {"btn btn-primary edit_login"} id={item} name={`Edit ${userRoleValues[item]} Login Credentials`} handleClick={this.EditLoginCredentials}/>
                                </li>)
                            )}
                        </ul>
                    </div>
                    {crosssite.currentstep === 1 &&
                    (<UserRoleComponent activeRole={activeRole} userRoleValues={userRoleValues} currentWarning={currentWarning} onModalInputChange ={this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 2 &&
                    (<LoginTypeComponent login_type={loginType} currentWarning={currentWarning} onModalInputChange ={this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 3 &&
                    (<SuccessURLComponent success_url={successURL} currentWarning={currentWarning} onModalInputChange = {this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 4 &&
                    (<LoginDetailsComponent login_type={loginType} componentType={componentType} data = {cookieSelCred} currentWarning={currentWarning} path={path} addMoreParams={this.addMoreParams} addAnotherLoginCred={this.addAnotherLoginCred} onModalInputChange={this.onModalInputChange} save={this.props.save}/>)}
                </Modal.Body>
                <Modal.Footer>
                    {((crosssite.activeRole === 'no_role' && crosssite.currentstep > 2) ||
                        (crosssite.activeRole !== 'no_role'  && crosssite.currentstep > 1))
                    && <Button className="action back btn-primary" name={"Back"} handleClick={()=>this.backButtonHandle()}/>}
                    {((crosssite.currentstep < crosssite.limit) && (crosssite.currentstep !== crosssite.limit)) && <Button className="action next btn-primary" name={"Next"} handleClick={()=>this.nextButtonHandle()}/>}
                    {<button type="button" className="btn btn-default" onClick={()=>this.closeModal()}>Close</button>}
                    {/*{(this.state.crosssite.currentstep === this.state.crosssite.limit) && <button type="button" className="btn btn-default" data-dismiss="modal">Submit button created by vikas</button>}*/}
                </Modal.Footer>
            </Modal>
        )
    }
}
ModalComponent.PropTypes={
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
    componentType:PropTypes.string.isRequired
};
