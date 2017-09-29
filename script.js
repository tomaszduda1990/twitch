let usernames = ["HardlyDifficult", "ESL_SC2", "OgamingSC2", "adobe", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb"];
const clientID = {
   'Client-ID': 'qpbx2exc1zgqa6ddbzdygqaex8yg39'
 }
const url = 'https://api.twitch.tv/kraken/';
const imgUrl = 'imgs/Glitch_Purple_RGB.png';
let userData = [];
const list = document.querySelector('.list');

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
			   status = isOnline(data)[0];
			   game = isOnline(data)[1];
			   console.log(status);
			   if(status == "online"){
			   		list.innerHTML += populateList(data.stream.channel, game, status);
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
function populateList(data, game, status){
		console.log(status);
	if(status == "online"){
		return `<li class= "online">
					<img class="portrait" src = "${data.logo ? data.logo : imgUrl}" alt = "logo of ${data.display_name || data.name}">
					<a href = "${data.url}">
						<div class = 'item'>
							<h5>${data.display_name || data.name}</h5>
							<p>${game}</p>
						</div>
					</a>
					<div class ="activness">
						<img src ="imgs/active.png" alt = "active">
						<p>online</p>
					</div>
				</li>`;
	}else{
		return `<li class ="offline">
					<img class="portrait" src = "${data.logo ? data.logo : imgUrl}" alt = "logo of ${data.display_name}">
					<a href = "${data.url}">
						<div class = 'item'>
							<h5>${data.display_name}</h5>
							<p>Offline</p>
						</div>
					</a>
					<div class ="activness">
						<img src ="imgs/inactive.png" alt = "inactive">
						<p>offline</p>
					</div>
				</li>`;	
	}
}
apiCall(usernames);
