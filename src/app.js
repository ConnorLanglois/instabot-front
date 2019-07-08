const HTTP = require('http');
const FS = require('fs');
const QS = require('querystring');
const CP = require('child_process');

function onSubmit(type, input, amount) {
	const proc = CP.spawn('python', ['../lib/instabot/instabot.py', type, input, amount]);

	proc.stdout.on('data', data => {
		console.log(data.toString());
	});
}

const SERVER = HTTP.createServer((req, res) => {
	if (req.method === 'POST') {
		let data = '';

		req.on('data', chunk => {
			data += chunk;
		}).on('end', () => {
			onSubmit.apply(null, Object.values(QS.parse(data)));
		});
	} else if (req.method === 'GET') {
		const path = req.url === '/' ? '../public/index.html' : '../public' + req.url;

		res.end(FS.existsSync(path) ? FS.readFileSync(path) : FS.readFileSync('../public/index.html'));
	}
});

SERVER.listen(80);
