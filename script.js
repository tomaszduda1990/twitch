$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/twitch',
 headers: {
   'Client-ID': 'qpbx2exc1zgqa6ddbzdygqaex8yg39'
 },
 success: function(data) {
   console.log(data);
   console.log('hello from the other side...');
 }
});
console.log('Is anyone theeeere ?!');