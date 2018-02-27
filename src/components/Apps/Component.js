import React,{Component} from 'react'
import {AppsModalComponent} from "../AppsModal/Component";
import { Modal} from 'react-bootstrap';
import {
    UserRoleComponent, LoginDetailsComponent, LoginTypeComponent, SuccessURLComponent, Button, login_type, path,
    userrole, success_url, EditLoginComponent
} from '../helpers'
export const emptyApp ={"app_name":"","logo_url":null,"username":"","url":"","app_id":"","password":""}

export class AppsComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalData:{
                data:null,
                typeAdd:true
            }
        }
        this.closeModal=this.closeModal.bind(this)
    }
    closeModal(){
        this.setState({modalOpen:false})
    }
    openAppsModal(appItem=emptyApp,typeAdd=true){
        debugger
        this.setState({modalOpen:true,modalData:{data:appItem,typeAdd}})
    }
    render(){
        const {modalOpen}=this.state
        const {apps}=this.props
        let style={
            displayNone:{display:'none'},
            marginBottom:{marginBottom: '10px'}
        }
        const createAppBoxes = (apps=[])=>{
            return apps.map((item,i)=>(
                <div key={i} className="card" id={`app-${item.app_id}`}>
                    <h5 className="appname">
                        <span id={`app-name-${item.app_id}`}>Facebook</span>
                        <div className="edit_app" id={`card_${6}`}>
                            <a id={`edit_app_${item.app_id}`} onClick={()=>this.openAppsModal(item,false)} >Edit <span className="glyphicon glyphicon-pencil"/>
                            </a>
                        </div>
                    </h5>
                    <div className="carddetail">
                        <div className="whitebuttonusername">Show Username</div>
                        <span className="username" style={style.displayNone} id={`username-${item.app_id}`}>{item.username}</span>
                    </div>
                    <div className="carddetail">
                        <div className="whitebuttonpassword">Show Password</div>
                        <span className="password" style={style.displayNone} id={`password-${item.app_id}`}>{item.password}</span>
                    </div>
                    <h4 className="app-url">
                        <a id={`app-url-${item.app_id}`} href="https://wwww.facebook.com" target="_blank">{item.url}</a>
                    </h4>
                </div>
            ))
        }
        return(
            <div className="col-sm-9" id="content-div">
                <div>
                    <button id="create_app" className="btn btn-primary" style={style.marginBottom} onClick={()=>this.openAppsModal()} >Add App</button>
                    <div>
                        { createAppBoxes(apps) }
                    </div>
                </div>
                {modalOpen && <AppsModalComponent {...this.props} modalOpen={modalOpen} modalData={this.state.modalData} saveAppsModal={this.props.saveAppsModal} closeModal = {this.closeModal}/>}
            </div>
        )
    }
}