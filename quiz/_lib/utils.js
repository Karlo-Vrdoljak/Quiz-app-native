export function fetcher(url, options = null) {
	return fetch(url, options)
		.then((response) => response.json())
		.then((data) => data)
		.catch((err) => console.error(err));
}
export function correctAnswerText() {
	const praises = ['Well done!', 'Nice!', 'Good job!', 'Keep it up!', 'Yay!', 'Great!'];
	const selected = Math.floor(Math.random() * praises.length);
	return praises[selected];
}
export function wrongAnswerText() {
	const praises = ['Nope!', 'Not quite!', 'Wrong!', 'No way!', 'Nah!', 'Unlucky!'];
	const selected = Math.floor(Math.random() * praises.length);
	return praises[selected];
}
