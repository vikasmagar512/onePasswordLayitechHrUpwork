import React,{Component} from 'react'

export class LastLoginComponent extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getLastLoginLogs()
    }
    /*getLogs(){
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://52.38.226.152/onepassword/log');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('status',xhr.status)
                // this.props.saveUser(state.crosssite.activeRole)
                // success
                alert('The Login Credentials are saved');
            } else {
                console.log('status',xhr.status)
                // failure
                // const errors = xhr.response.errors ? xhr.response.errors : {};
                // errors.summary = xhr.response.message;
            }
        });
        xhr.send();
    }*/
    render() {
        const {logs} = this.props
        let style = {
            border:'2px black solid',
            paddingRight: '15px'
        }
        return (
            <div className="col-sm-9" id="content-div">
                <div className="log">
                    <span className="ip" style={style}>IP Address</span>
                    <span className="date" style={style}>Date</span>
                    <span className="location" style={style}>Location</span>
                </div>
                {logs.map((item,i) => (
                    <div key={i} className="log">
                        <span className="ip" style={style}>{item.ip_address}</span>
                        <span className="date" style={style}>{item.date}</span>
                        <span className="location" style={style}>{item.location ? item.location : 'null'}</span>
                    </div>
                ))}
            </div>
        )
    }
}