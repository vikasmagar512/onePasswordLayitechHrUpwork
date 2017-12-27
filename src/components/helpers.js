import React,{PropTypes,Component} from 'react'
export const UserRoleComponent= ({activeRole,userRoleValues,currentWarning,onModalInputChange})=>(
    <div className="step 1 step1">
        Role for which you are adding Login Credentials
        {currentWarning && (<div className="alert alert-danger fade in" id="loginTypeError">Please select a role</div>)}
        {Object.keys(userRoleValues).map((item,index)=>{
            return (
                <div className="radio" key={index}>
                    <label>
                        <input type="radio" name="userrole" value={item}
                               checked={activeRole===item}
                               onChange={onModalInputChange}/>{userRoleValues[item]}
                    </label>
                </div>
            )
        })}
    </div>
)

export const LoginTypeComponent=({login_type,currentWarning,onModalInputChange})=>{
    const loginTypeNames =['Password','Cookie','Xpath'];
    const loginTypeValues =["Credentials","Cookie","Selenium"];
    return(
        <div className="step 2 step2">
            Login Type
            {currentWarning && (<div className="alert alert-danger fade in" id="loginTypeError">Please select login type</div>)}
            {loginTypeValues.map((item,index)=>{
                return (
                    <div className="radio" key={index}>
                        <label>
                            <input type="radio" name="login_type" value={item}
                               checked={login_type===item}
                               onChange={onModalInputChange}/>{loginTypeNames[index]}</label>
                    </div>
                )
            })}
        </div>
    )
}
export const SuccessURLComponent=({success_url,currentWarning,onModalInputChange})=>(
    <div className="step 3 step3">
        {currentWarning && (<div className="alert alert-danger fade in" id="successURLError" >Please enter valid success URL</div>)}
        URL if the user logged in successfully
        {/*<input type="text" name="success_url" size="30" value={this.state.steps[1]['success_url']} className="form-control" onChange={this.onModalInputChange}/>*/}
        {/*<input type="text" name="success_url" size="30" value={"www.google.com"} className="form-control" onChange={onModalInputChange}/>*/}
        <input type="text" name="success_url" size="30" value={success_url} className="form-control" onChange={onModalInputChange}/>
    </div>
)
export const LoginDetailsComponent=({login_type,data,currentWarning,path,addMoreParams,onModalInputChange,save})=>{
    const cookiesArray=data['Cookie']
    const seleniumArray=data['Selenium']
    const credentialsArray=data['Credentials']
    console.log('path is ',path)
    return(
        <div className="step 4 step4">
            {login_type === "Credentials" && (<CredentialsComponent credentialsArray={credentialsArray} path={path} onModalInputChange = {onModalInputChange} />)}
            {login_type === "Cookie" && (<CookiesComponent cookiesArray={cookiesArray} onModalInputChange = {onModalInputChange}/>)}
            {login_type === "Selenium" && (<SeleniumComponent seleniumArray={seleniumArray} onModalInputChange = {onModalInputChange}/> )}
            <Button className = {"btn btn-primary"} name={"Add More Param"} id={"add-param"} handleClick={addMoreParams}/>
            <Button className = {"btn btn-primary"} name={"Save"} id={"add-param-save"} handleClick={save}/>
            <button className="btn btn-primary" id="add-another-login" style={{display:"none"}}>Add Another Login Credentials</button>
        </div>
    )
}
export const CredentialsComponent= ({credentialsArray,path,onModalInputChange} )=>(
    <div id="login-param-div">
        <p>Add Login Parameters: ie the username and password to login to the site. </p>
        <p>Enter the name of the parameter in login form in the param field, Enter the value
            of the parameter in value field). For example if the username parameter is named
            username in login form, enter username in param field, and actual username value
            in value field.</p>
        <ul id="login-param-list" className="list-unstyled">
            {
                path !== undefined &&
                (<li>
                        <label htmlFor={"param1"} className="control-label">Path</label>
                        <input type="text" size="10" name="path" value={path} className="form-control" id="pathid" onChange={onModalInputChange}/>
                </li>)
            }
            {credentialsArray.map((cookie, index) => {
                return (
                    <li key={index}>

                        <label htmlFor={"param" + (index + 1)} className="control-label">{"Param " + (index + 1)}</label>
                        <input type="text" size="10" name={"param" + (index + 1)} value={cookie['param']}
                               className="form-control" onChange={onModalInputChange}
                               id={"param-" + (index + 1)}/>
                        <label htmlFor={"value" + (index + 1)} className="control-label">{"Value " + (index + 1)}</label>
                        <input type="text" size="10" name={"value" + (index + 1)} value={cookie['value']}
                               className="form-control" onChange={onModalInputChange}
                               id={"value-" + (index + 1)}/>
                    </li>
                )
            })
            }
        </ul>
    </div>
)
export const CookiesComponent = ({cookiesArray,onModalInputChange})=>(
    <div id="cookie-param-div">
        <ul id="cookie-param-list" className="list-unstyled">
            {cookiesArray.map((cookie,index)=>{
                return (
                    <li key={index}>
                        <label htmlFor={!index ? "cookie_name" : "cookie_name" + (index + 1) + 1} className="control-label">{!index ? "Cookie" : "Cookie " + (index +1) }</label>
                        <input type="text" size="10" name={"cookie_name" + (index + 1)} value={cookie['cookie_name'+(index+1)]} className="form-control" id={!index ? "admin-cookie-name-" : "cookie-name-" + (index + 1) } onChange={onModalInputChange}/>
                        <label htmlFor={!index ? "admin_cookie_value" : "cookie_value" + (index + 1) + 1 } className="control-label">{!index ? "Value" : "Value " + (index+1) }</label>
                        <input type="text" size="10" name={"cookie_value"+(index + 1)} value={cookie[`cookie_value${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-value-" : "cookie-value-" + (index + 1) } onChange={onModalInputChange}/>
                        <label htmlFor={!index ? "admin_cookie_domain" : "cookie_domain" + (index + 1) + 1 } className="control-label">{!index ? "Domain" : "Domain " + (index+1) }</label>
                        <input type="text" size="10" name={"cookie_domain"+(index + 1)} value={cookie[`cookie_domain${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-domain-" : "cookie-domain-" + (index + 1) } onChange={onModalInputChange}/>
                        <label htmlFor={!index ? "admin_cookie_path" : "cookie_path" + (index + 1) + 1 } className="control-label">{!index ? "Path" : "Path " + (index+1) }</label>
                        <input type="text" size="10" name={"cookie_path"+(index + 1)} value={cookie[`cookie_path${(index+1)}`]} className="form-control" id={!index ? "admin-cookie-path-" : "cookie-path-" + (index + 1) } onChange={onModalInputChange}/>
                    </li>
                )
            })}
        </ul>
    </div>
)
export const SeleniumComponent=({seleniumArray,onModalInputChange})=>(
    <div id="selenium-param-div">
        <ul id="selenium-param-list" className="list-unstyled">
            {seleniumArray.map((sel,index)=>{
                return (
                    <li key={index}>
                        <label htmlFor={"sel_cmd" + (index + 1) + 1} className="control-label">{"Xpath " + (index +1) }</label>
                        <input type="text" size="10" name={"sel_cmd"+(index + 1)} value={sel[`sel_cmd${(index+1)}`]} className="form-control" id={"sel-cmd" + (index + 1) } onChange={onModalInputChange}/>
                    </li>
                )
            })}
        </ul>
    </div>
)
export const Button =(props)=> (<button className={props.className} id={props.id} onClick={props.handleClick}>{props.name}</button>)
