export const Cookie = {cookie_name: '', cookie_path: '', cookie_domain: '', cookie_value: ''};
export const Credentials = {param: '', value: ''};
export const Selenium = {sel_cmd: ''};

export const is_valid_url=(url)=>{
    return (/^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url))
}
export const getValues=(object,itemNumber)=>{
    let k ={}
    Object.keys(object).map(prop => {
        // noinspection JSAnnotator
        k[`${prop}${itemNumber}`] = object[prop]
    });
    console.log(k)
    return k
}
export const formAndAddStep3Object=()=>{
    return {
        Cookie:[getValues(Cookie,1)],
        Credentials:[getValues(Credentials,1)],
        Selenium:[getValues(Selenium,1)]
    }
}
export const formAndAddStep3ObjectForAPI=()=>{
    return {...formAndAddStep3Object(),path:''}
}