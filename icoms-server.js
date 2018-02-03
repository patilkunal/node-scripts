const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  //c.write('hello\r\n');

  //c.pipe(c);
  c.on('data', (str) => {
	  let request = str.toString();
	  console.log("ICOMS message: " + str.toString());
	  
	  let resp = "I001ITT,000,IR:";
	  
	  let token = request.match(/IR:(.*?),/);
	  if(token != null) {
		  console.log("Purchase Token: " + token[1]);
		  resp = resp + token[1];
	  } else {
		  resp = resp + "                                ";
	  }
	  
	  let account = request.match(/AN:(\d+)/);
	  
	  if(account != null) {
		  console.log("Account: " + account[1]);
		  resp = resp + ",AN:" + account[1] + ".";
	  } else {
		  resp = resp + ",AN:         .";
	  }
	  //c.write('I001ITT,000,IR:EB618984DE2A464B90CB6313B0DB7191,AN:039140001.');
	  c.write(resp + "\n");
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(8484, () => {
  console.log('server bound');
});