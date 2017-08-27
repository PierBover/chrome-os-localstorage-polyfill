function initStoragePolyfill () {

	function Storage (ready) {
		// we use a custom key so that it won't clash with other items in chrome.storage.local
		this.name = "local-storage-polyfill";
		this.memoryStorage = {};

		// load from persistent storage
		chrome.storage.local.get(this.name, (items) => {
			if (items && items[this.name]) this.memoryStorage = JSON.parse(items[this.name]);
			if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
			ready();
		});
	}

	Storage.prototype.getItem = function (keyName) {
		// we return null to mimic real localStorage
		return this.memoryStorage[keyName] || null;
	};

	Storage.prototype.setItem = function (keyName, string) {
		// we convert to string to mimic localStorage
		if (typeof string !== 'string') string = JSON.stringify(string);
		this.memoryStorage[keyName] = string;
		this.updatePersistentStorage();
	};

	Storage.prototype.removeItem = function (keyName) {
		delete this.memoryStorage[keyName];
		this.updatePersistentStorage();
	};

	Storage.prototype.updatePersistentStorage = function () {
		const objectToSave = {
			[this.name]: JSON.stringify(this.memoryStorage)
		};

		chrome.storage.local.set(objectToSave, () => {
			if(chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError);
			}
		});
	};

	return new Promise((resolve, reject) => {
		window.localStorage = new Storage(resolve);
	});
}