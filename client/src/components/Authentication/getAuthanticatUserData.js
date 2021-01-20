

const userData = () =>{
	var localstore = localStorage.getItem('state');
	localstore = JSON.parse(localstore);
	console.log('localstore',localstore)
	return localstore;
}
export const User =  userData();

const userLevel = () =>{
	let userdata = userData();
	return userdata['userInfo']['level'];
}

export const Level = userLevel();