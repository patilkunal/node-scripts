var sleep = require('sleep');
const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log((new Date()).toUTCString() + ' : client connected');
  c.on('end', () => {
    console.log((new Date()).toUTCString() + ' : client disconnected');
  });
  //c.write('hello\r\n');

  //c.pipe(c);
  c.on('data', (str) => {
	  let request = str.toString();
	  console.log((new Date()).toUTCString() + ' : ICOMS message: ' + str.toString());
	  
	  let resp = "I001ITT,000,IR:";
	  
	  let token = request.match(/IR:(.*?),/);
	  if(token != null) {
		  console.log((new Date()).toUTCString() + ' : Purchase Token: ' + token[1]);
		  resp = resp + token[1];
	  } else {
		  resp = resp + "                                ";
	  }
	  
	  let account = request.match(/AN:(\d+)/);
	  
	  if(account != null) {
		  console.log((new Date()).toUTCString() + ' : Account: ' + account[1]);
		  resp = resp + ",AN:" + account[1] + ".";
	  } else {
		  resp = resp + ",AN:         .";
	  }

        let site = request.match(/SI:(\d+),/);
        if(site != null) {
		  console.log((new Date()).toUTCString() + ' : Site: ' + site[1]);
        }
    
    sleep.sleep(5);
	  //c.write('I001ITT,000,IR:EB618984DE2A464B90CB6313B0DB7191,AN:039140001.');
	  //resp = '';
	  c.write(resp + "\n");
  });
});
server.on('error', (err) => {
  console.log((new Date()).toUTCString() + ' : ' + err);
  // throw err;
});

//this is same as net.createServer() and passing a callback function
//server.on('connection', function(sock) {
// console.log('Connected', + sock.remoteAddress + ':' + sock.remotePort);
// });

server.listen(8484, () => {
  console.log((new Date()).toUTCString() + ' : server bound');
});
