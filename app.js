var http = require('http');
var url = require('url');
var fs = require('fs');
var gm = require('gm');

var server = http.createServer(function(request, response){
	var url_parts = url.parse(request.url).path.substring(1).split("/");

	var width = parseInt(url_parts[0]);
	var height = parseInt(url_parts[1]);
    var txt = url_parts[2]?url_parts[2]:new Date();
    var max = Math.max(width, height);

	if(!isNaN(width) && !isNaN(height)){
        response.writeHead(200, {'content-type': 'image/png'});
        gm(width, height, "#eeeeee00")
          .fontSize(width/8)
          .fill("#666")
          .drawText(10, height/2, txt)
            //.drawText(10, 50, txt)
            .stream('png', function(err, stdout, stderr){
                if(err) {
                    console.log(err)
                } else {
                    stdout.pipe(response);
                }
            });
	} else {
        response.writeHead(400, {'content-type' : 'text/plain'});
        response.end("params incorrect. /height/width/txt");
    }
})
.listen(1337, '127.0.0.1');