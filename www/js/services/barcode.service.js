(function () {
	'use strict';

	angular
		.module('ecomapss.services')
		.service('BarcodeService', BarcodeService)

	/**
	 *  Service to call scan method of barcode scanner and decide whats will happens
	 * with the string result
	 *  
	 * @autor Matheus Lacerda
	 *  
	 */

	/** @ngInject */
	function BarcodeService($cordovaBarcodeScanner, $q, ecConstants) {
		this.scan = scan;
		var identifier = ecConstants.IDENTIFIERS.QR_CODE_IDENTIFIER;
		var isScanning = false;


		function _normalizeID(string = '') {
			try{
				string = string.split(identifier)
	
				switch(string.length){	
					case 1: return string[0]  
					case 2: return string[1]
					default: return string
				}
			}catch(e){
				alert(e)
			}
		}

		/**
		 * @method
		 * @name scan
		 * @param {Object} options 
		 * @return {String} ID Of an entitie
		 * @throws {CANNOT_SCAN_QRCODE}
		 */
		function scan(options) {

			return $q(function (resolve, reject) {
				if (isScanning) return resolve();
				isScanning = true;

				$cordovaBarcodeScanner.scan(options).then(function (result) {
					isScanning = false;
					
					var response = _normalizeID(result.text)
					return resolve(response)
				}, function (err) {
					isScanning = false;

					console.log(err, ' -- errors');
					alert('err ->', err.toString());
					return reject(ecConstants.ERRORS.CANNOT_SCAN_QRCODE)
				})
			})
		}
	}
})();