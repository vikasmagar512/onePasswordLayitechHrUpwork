export default {
	loginResponse : {
		success:false ,
		message:'',
		errors:{
			email:'',
			password:''
		}
	},
	session: !!sessionStorage.jwt
}