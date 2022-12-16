import flash from "./flasher-serial.js";

const connectButton = document.getElementById('connectButton');

document.addEventListener('DOMContentLoaded', () => {
  //connectButton.addEventListener('click', clickConnect);
});

async function connect() {
	flash();
}
  
async function parse_and_flash() {
	var code = exportJSON();
	const response = await axios.get('/parse_code', {
		params: {
			"Code": code
		}
	});
	connect();

}

export default function clickConnect() {
	parse_and_flash();
}