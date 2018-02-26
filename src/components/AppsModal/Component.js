import React,{Component} from 'react'

import { Modal} from 'react-bootstrap';
import {Button} from '../helpers'

export class AppsModalComponent extends Component{
    constructor(props){
        super(props);
        debugger
        this.handleChange = this.handleChange.bind(this);
        this.save= this.save.bind(this);
        this.state ={...props.modalData,modalOpen : props.modalOpen}
    }
    save(){
        console.log('save ',this.props)
        this.props.saveAppsModal(this.state.data)
    }
    closeModal(){
        this.props.closeModal()
    }
    handleChange(e){
        debugger
        this.setState({data:{...this.state.data,[e.target.name]: e.target.value}})
    }
    render(){
        const {modalOpen,typeAdd,data} = this.state;
        debugger
        return(
            <Modal className="modal-container" show={modalOpen} onHide={()=>this.closeModal()} animation>
                <Modal.Header>
                    <button type="button" className="close" data-dismiss="modal" onClick={()=>this.closeModal()}>&times;</button>
                    <h4 className="modal-title">Login Credentials</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-4">
                            App Name:
                        </div>
                        <div className="col-sm-4" id="modal-app-name">
                            <input type="text" size="30" name="app_name" value={data.app_name} onChange={ this.handleChange }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            App URL:
                        </div>
                        <div className="col-sm-4" id="modal-app-url">
                            <input type="text" size="30" name="url" value={data.url} onChange={ this.handleChange }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            Username:
                        </div>
                        <div className="col-sm-4" id="modal-username">
                            <input type="text" size="40" name="username" value={data.username} onChange={ this.handleChange }/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            Password:
                        </div>
                        <div className="col-sm-4" id="modal-password">
                            <input size="30" name="password" type="password" value={data.password} onChange={ this.handleChange }/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" name={typeAdd ? "Add" : "Save"} handleClick={()=>this.save()}/>
                    <Button className="btn btn-secondary" name={'Cancel'} handleClick={()=>this.closeModal()}/>
                </Modal.Footer>
            </Modal>
        )
    }
}
