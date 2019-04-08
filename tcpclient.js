var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8484;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT + ' ' + new Date());
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('000,IR:kp-purchase1                    ,SI:007,EA:0000013146964118                ,I$:000000027,II:22521     ,IM:001440,DT:1160429,TM:100000,ID:10,000 KM movie                    ,IT:Y,IU:Y,IC:GRAVITASHD,UP.\n');

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    
    console.log('Response: ' + data + ' ' + new Date());
    // Close the client socket completely
    client.destroy();
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
