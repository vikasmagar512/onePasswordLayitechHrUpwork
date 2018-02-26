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
        this.closeModal=this.closeModal.bind(this)
    }
   /* save(){
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
    }*/
    closeModal(){
        this.setState({modalOpen:false})
    }
    openAppsModal(appItem=emptyApp,typeAdd=true){
        debugger
        this.setState({modalOpen:true,modalData:{data:appItem,typeAdd}})
    }
    render(){
        const {modalOpen}=this.state
        let style={
            displayNone:{display:'none'},
            marginBottom:{marginBottom: '10px'}
        }
        let apps=[
            {"app_name":"Facebook","logo_url":null,"username":"patta35@gmail.com","url":"https://wwww.facebook.com","app_id":"6","password":"x"},
            {"app_name":"facebook1","logo_url":"/logos/logo_gmail_64px.png","username":"patta@gmail.com","url":"null","app_id":"7","password":"test123"},
            {"app_name":"facebook2","logo_url":null,"username":"patta@gmail.com","url":null,"app_id":"8","password":"test123"},
            {"app_name":"facebook3","logo_url":"/logos/FB-fLogo-Blue-broadcast-2.png","username":"patta@gmail.com","url":"https://wwww.facebook.com","app_id":"9","password":"test123"},{"app_name":"fb1","logo_url":"/logos/logo_gmail_64px.png","username":"patta6@gmail.com","url":null,"app_id":"11","password":"test123"},
            {"app_name":"fb2","logo_url":"/logos/logo_gmail_64px.png","username":"patta3@gmail.com","url":"www.facebook.com","app_id":"13","password":"test123"},
            {"app_name":"fb6","logo_url":null,"username":"patta6@gmail.com","url":"facebookk.com","app_id":"14","password":"test123"},
            {"app_name":"fb7","logo_url":null,"username":"patta6@gmail.com","url":null,"app_id":"15","password":"test123"},
            {"app_name":"fb8","logo_url":null,"username":"patta6@gmail.com","url":"www.facebookk.com","app_id":"16","password":"test123"},
            {"app_name":"fb89","logo_url":null,"username":"patta6@gmail.com","url":"www.facebookk.com","app_id":"17","password":"test123"},
            {"app_name":"facebook12","logo_url":null,"username":"patta@gmail.com","url":"https://www.facebook.com","app_id":"19","password":"test123"},
            {"app_name":"asdfasfasdfasdf","logo_url":null,"username":"patta@gmail.com","url":"","app_id":"22","password":"test123"}
        ]

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
                        {
                            createAppBoxes(apps)
                        }
                    </div>
                </div>
                {modalOpen && <AppsModalComponent {...this.props} modalOpen={modalOpen} modalData={this.state.modalData} saveAppsModal={this.props.saveAppsModal} closeModal = {this.closeModal}/>}
            </div>
        )
    }
}