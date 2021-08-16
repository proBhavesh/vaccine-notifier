const fetch = require("node-fetch");
const https = require("https");
const DOMAIN = process.env.MAIL_DOMAIN;
const mailgun = require("mailgun-js")({
	apiKey: process.env.API_KEY,
	domain: DOMAIN,
});

const mailNotifier = async (pincode, date) => {
	const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;

	const res = await fetch(url);
	const status = await res.status;
	// console.log(data);
	const data = await res.json().then((res) => {
		console.log(status);
		console.log(res.sessions[0]);
		const vaccineAvail = res.sessions[0];
		const mailData = {
			from: "probhavsh@gmail.com",
			to: "bhaveshjat9950@gmail.com",
			subject: `This is vaccine notifier`,
			text: `Vaccine centres available , ${JSON.stringify(res)}`,
		};
		if (status == 200 && vaccineAvail) {
			mailgun.messages().send(mailData, function (error, body) {
				console.log(body);
			});
		}
	});

	return await res;
};

module.exports = { mailNotifier };

// .then((res) => {
// 	console.log(res.status);
// 	res.json();
// })
// .then((data) => {
// 	console.log(data);

// });

// const options = {
// 	hostname: "cdn-api.co-vin.in",
// 	port: 443,
// 	path: `/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`,
// 	method: "GET",
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// };

// const req = https.request(options, (res) => {
// 	const status = res.statusCode;
// 	console.log(status);

// 	if (status == 200) {
// 		res.on("data", (data) => {
// 			process.stdout.write(data);
// 			console.log(data);

// });
// }
// });
// req.on("error", (error) => {
// 	console.error(error);
// });

// req.end();
