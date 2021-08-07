import { fetcher } from '../_lib/utils';

export default class QuizApi {
	constructor() {
		this.BASE = 'https://opentdb.com/api.php?encode=base64';
		this.CATEGORY_LIST = 'https://opentdb.com/api_category.php';
		this.QUIZ_URL = 'https://opentdb.com/api.php?'; //type=boolean&encode=base64&amount=50&category=27&difficulty=easy"
	}
	qs(obj) {
		const keyValuePairs = [];
		for (const key in obj) {
			keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
		}
		return keyValuePairs.join('&');
	}

	fetchCategories() {
		return fetcher(this.CATEGORY_LIST);
	}
	async createQuiz({ type = 'boolean', encode = 'base64', amount = '10', category }) {
		const params = { type, encode, amount, category };
		const result = await fetcher(this.QUIZ_URL + this.qs(params));
		const { results } = result;
		return results.map((r) => {
			for (const key in r) {
				if (typeof r[key] === 'string') {
					r[key] = this.base64Decode(r[key]);
				} else {
					const [i] = r[key];
					r[key] = this.base64Decode(i);
				}
			}
			return r;
		});
	}

	base64Decode(input = '') {
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var output = '';
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = ('' + input).replace(/[^A-Za-z0-9\+\/\=]/g, '');

		while (i < input.length) {
			enc1 = chars.indexOf(input.charAt(i++));
			enc2 = chars.indexOf(input.charAt(i++));
			enc3 = chars.indexOf(input.charAt(i++));
			enc4 = chars.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}

		output = this._utf8_decode(output);

		return output;
	}
	_utf8_decode(utftext) {
		let string = '';
		let i = 0;
		let c = 0;
		let c1 = 0;
		let c2 = 0;

		while (i < utftext.length) {
			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if (c > 191 && c < 224) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}

		return string;
	}
}
