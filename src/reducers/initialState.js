export default {
	success:false ,
	message:'',
	errors:{
		email:'',
		password:''
	},
	isFetching: false,
	isAuthenticated: localStorage.getItem('id_token') ? true : false
}