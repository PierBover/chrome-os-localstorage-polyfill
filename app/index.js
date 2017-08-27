initStoragePolyfill().then(() => {
	console.log('localStorage polyfill ready!');
	console.log('\n');

	console.log('Testing...');
	window.localStorage.setItem('hello', 'world');
	console.log('should be "world":', window.localStorage.getItem('hello'));
	window.localStorage.removeItem('hello');
	console.log('should be null:', window.localStorage.getItem('hello'));
	console.log('\n');

	console.log('Testing persistence...');
	let counter = window.localStorage.getItem('counter') || 0;
	console.log('This number should increase every time you open this app.');
	console.log(counter);
	counter ++;
	window.localStorage.setItem('counter', String(counter));
});