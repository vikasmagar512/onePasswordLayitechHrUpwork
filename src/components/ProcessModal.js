import {Cookie, Credentials, Selenium, formAndAddStep3Object,  is_valid_url,getValues} from "../helperFunc";
import {UserRoleComponent,LoginDetailsComponent,LoginTypeComponent,SuccessURLComponent,Button} from './helpers'
import React,{PropTypes,Component} from 'react'
import { Modal} from 'react-bootstrap';

export class ModalComponent extends Component{
    constructor(props){
        super(props)
        this.onModalInputChange= this.onModalInputChange.bind(this)
        this.addMoreParams= this.addMoreParams.bind(this)
        this.EditLoginCredentials= this.EditLoginCredentials.bind(this)
    }
    setUserRole(steps,crosssite,selectedUserrole){
        steps[0]['userrole'].add(selectedUserrole)
        steps[1]['login_type'][selectedUserrole]=''
        steps[2]['success_url'][selectedUserrole]=''
        crosssite.activeRole=selectedUserrole
        steps[3][selectedUserrole] = formAndAddStep3Object(selectedUserrole)
        return {steps,crosssite}
    }
    onModalInputChange(e){
        console.log('onModalInputChange')
        console.log('e.target.name ',e.target.name)
        console.log('e.target.value ',e.target.value )
        let {steps,crosssite}=this.props.modal
        let activeRole = crosssite.activeRole
        console.log('steps are ',steps)
        if(crosssite.currentstep===4 ){
            let login_type = steps[1]['login_type'][activeRole]
            console.log('steps[3] ',steps[3])
            steps[3][activeRole][login_type].map((item,index)=>{
                if(item.hasOwnProperty(e.target.name)){
                    steps[3][activeRole][login_type][index][e.target.name]=e.target.value
                }
            })
            console.log('step[3]..... ',steps[3])
        }else{
            if(e.target.name === 'userrole'){
                let selectedUserrole = e.target.value
                if(!(steps[0]['userrole'].has(selectedUserrole))){
                    // let obj = this.setUserRole(steps,crosssite,selectedUserrole)
                    // steps = obj.steps
                    // crosssite = obj.crosssite
                    steps[0]['userrole'].add(e.target.value)
                    steps[1]['login_type'][selectedUserrole]=''
                    steps[2]['success_url'][selectedUserrole]=''
                    crosssite.activeRole=selectedUserrole
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
        console.log('onModalInputChange steps are ',steps)
        console.log('onModalInputChange crosssite is ',crosssite)
        this.props.modalInputChange({steps,crosssite})
        // this.setState({...this.state,steps:steps,crosssite:crosssite})
    }
    closeModal(){
        alert('close event')
        console.log('close event');
        this.props.closeModal()
        // this.setState({...this.state,modalOpen:false,crosssite:{...this.state.crosssite,currentstep:1,activeRole:""}})
    }
    backButtonHandle(){
        if(this.props.modal.crosssite.currentstep > 1){
            /*if(this.props.modal.crosssite.activeRole==='no_role'){
                if(this.props.modal.crosssite.currentstep <= 2) {
                    return
                }
            }*/
            // this.setState({...this.props.modal,crosssite:{...this.props.modal.crosssite,currentstep:this.props.modal.crosssite.currentstep - 1}})
            this.props.backButtonHandle({...this.props.modal.crosssite,currentstep:this.props.modal.crosssite.currentstep - 1})
        }
        console.log("Inside back button: ", this.props.modal.crosssite.currentstep);
    }
    nextButtonHandle(){
        const {currentstep,limit} = this.props.modal.crosssite
        console.log("Inside next button currentstep: ",currentstep);
        if (currentstep) {
            if (!this.canClickNext()) return;
        }
        if(currentstep < limit){
            this.props.nextButtonHandle({...this.props.modal.crosssite,currentstep:currentstep + 1})
            // this.setState({...this.state,crosssite:{...this.state.crosssite,currentstep:currentstep + 1}})
        }
    }
    canClickNext(){
        if ( this.props.modal.crosssite.currentstep === 1 ) return this.validate_login_role();
        if ( this.props.modal.crosssite.currentstep === 2 ) return this.validateLoginType();
        if ( this.props.modal.crosssite.currentstep === 3 ) return this.validateRedirectURL();
    }
    validateRedirectURL(){
        let activeRole = this.props.modal.crosssite.activeRole
        return is_valid_url(this.props.modal.steps[2]['success_url'][activeRole])
    }
    addMoreParams(){
        let steps= [...this.props.modal.steps]
        let activeRole = this.props.modal.crosssite.activeRole
        let login_type = steps[1]['login_type'][activeRole]
        let map = {'Credentials':Credentials,'Cookie':Cookie,'Selenium':Selenium}
        steps[3][activeRole][login_type].push(getValues(map[login_type],steps[3][activeRole][login_type].length+1))
        // this.setState({...this.props.modal,steps:steps})
        this.props.addMoreParams({steps})
        // this.setState({...this.props.modal,steps:steps})
    }
    validate_login_role(){return this.props.modal.crosssite.activeRole !==''}
    validateLoginType(){
        let activeRole = this.props.modal.crosssite.activeRole
        return  (this.props.modal.steps[1]['login_type'][activeRole]!=='')
    }
    EditLoginCredentials(e){
        let {crosssite} = this.props.modal
        let userrole = e.target.id
        console.log('userrole is ',userrole)
        // crosssite.activeRole = userrole
        // this.crosssite.currentstep = 4
        this.props.editLoginCredentials({...crosssite,activeRole : userrole ,currentstep : 4 })
        // this.setState({...this.state,crosssite:{...crosssite,activeRole : userrole ,currentstep : 4 }})
    }
    render(){
        console.log('render props ',this.props.modal)
        const userRoleValues={admin:'Admin',non_admin:'Non Admin',custom_role_1:'Custom Role 1',custom_role_2:'Custom Role 2',no_login:'No Login'}
        // const userRoleValues={no_role:'No Role'}
        const {modalOpen,steps,crosssite}=this.props.modal
        let activeRole = crosssite.activeRole
        let login_type = activeRole ? steps[1]['login_type'][crosssite.activeRole] : ''
        let success_url = activeRole ? steps[2]['success_url'][crosssite.activeRole] : ''
        // let success_url= steps[2]['success_url'][crosssite.activeRole]
        let cookieSelCred =  activeRole ? steps[3][crosssite.activeRole] : {}
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
                    {(crosssite.currentstep === 1) &&
                    (<UserRoleComponent activeRole={activeRole} userRoleValues={userRoleValues} onModalInputChange ={this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 2 &&
                    (<LoginTypeComponent login_type={login_type} onModalInputChange ={this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 3 &&
                    (<SuccessURLComponent success_url={success_url} onModalInputChange = {this.onModalInputChange}/>)}
                    {crosssite.currentstep  === 4 &&
                    (<LoginDetailsComponent login_type={login_type} data = {cookieSelCred} addMoreParams={this.addMoreParams} onModalInputChange={this.onModalInputChange} save={this.save}/>)}
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
    nextButtonHandle:PropTypes.func.isRequired
}
