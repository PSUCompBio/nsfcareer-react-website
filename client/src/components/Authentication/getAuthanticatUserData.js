

const userData = () =>{
	var localstore = localStorage.getItem('state');
	localstore = JSON.parse(localstore);
	// console.log('localstore',localstore)
	return localstore;
}
export const User =  userData();

const userLevel = () =>{
	let userdata = userData();
	if(userdata){
		return userdata['userInfo']['level'];
	}else{
		return false;
	};
}

export const Level = userLevel();

const userSensor = () =>{
	let userdata = userData();
	if(userdata){
		return userdata['userInfo']['sensor'];
	}else{
		return false;
	};
}



export const Sensor = userSensor();

const userEmail = () =>{
	let userdata = userData();
	if(userdata){
		return userdata['userInfo']['email'];
	}else{
		return false;
	};
}



export const Email = userEmail();
