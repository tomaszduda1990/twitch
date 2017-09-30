let usernames = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];
const clientID = {
   'Client-ID': 'qpbx2exc1zgqa6ddbzdygqaex8yg39'
 }
const url = 'https://api.twitch.tv/kraken/';
const imgUrl = 'imgs/Glitch_Purple_RGB.png';
const list = document.querySelector('.list');
const buttons = document.querySelectorAll('.btn');
const onlineBtn = document.querySelector('.online');
const allBtn = document.querySelector('.all');
const offlineBtn = document.querySelector('.offline');
console.log(buttons);
let filtered = [];


function apiCall(arr, type){
	type = 'streams/';
	let status, game;
	list.innerHTML = "";
	arr.forEach(name => {
		$.ajax({
	 		type: 'GET',
	 		url: url+type+name,
	 		headers: clientID,
	 		success: function(data) {
	 			console.log(data);
			   status = isOnline(data)[0];
			   game = isOnline(data)[1];
			   if(status == "online"){
			   		list.innerHTML += populateList(data.stream.channel, game, status, data.stream.viewers);
			   }else{
			   	$.ajax({
					type: 'GET',
					url: url+'channels/'+name,
					headers: clientID,
					success: function(data){
							list.innerHTML += populateList(data, game, status);
					}
				})
			   }
			   status = "";
			   game = "";
			 },
		 	error: function(){
		 		console.log('error!')
		 	}
		});
	})
}
function isOnline(data){
	let status, game;
	if(data['stream'] == null) {
        game = "Offline";
        status = "offline";
      }else{
        game = data.stream.channel.game;
        status = "online";
      };
      return [status, game];
}
function populateList(data, game, status, viewers){
	if(status == "online"){
		return `<li class= "online" >
					<a href = "${data.url}" target = "_blank">
						<img class="portrait" src = "${data.logo ? data.logo : imgUrl}" alt = "logo of ${data.display_name || data.name}">
						<div class = 'item'>
							<h5>${data.display_name || data.name}</h5>
							<p>${game}</p>
						</div>
					</a>
					<div class ="activness">
						<img src ="imgs/active.png" alt = "active">
						<p>${viewers} viewers</p>
					</div>
				</li>`;
	}else{
		return `<li class ="offline">
					<a href = "${data.url}" target = "_blank">
						<img class="portrait" src = "${data.logo ? data.logo : imgUrl}" alt = "logo of ${data.display_name}">
						<div class = 'item'>
							<h5>${data.display_name}</h5>
						</div>
					</a>
					<div class ="activness">
						<img src ="imgs/inactive.png" alt = "inactive">
						<p>offline</p>
					</div>
				</li>`;	
	}
}
function switchClass(item){
	buttons.forEach(button =>{
		button.removeAttribute('id');
	});
	item.setAttribute('id', 'active');
}

function sortList(){
	switchClass(this);
	const classCheck = this.classList.value;
	const nodeList = list.querySelectorAll('li');
	if(classCheck.includes('all')){
		list.innerHTML = "";
		apiCall(usernames);
	}else if(classCheck.includes('on')){
		nodeList.forEach(node => {
			if(node.classList.contains('offline')){
				node.classList.add('sortedOut');
			}else{
				node.classList.remove('sortedOut');
			}
		});
	}else if(classCheck.includes('off')){
		nodeList.forEach(node => {
			if(node.classList.contains('online')){
				node.classList.add('sortedOut');
			}else{
				node.classList.remove('sortedOut');
			}
		});
	}
	
	
}
buttons.forEach(button => button.addEventListener('click', sortList));


apiCall(usernames);
