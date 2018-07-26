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
		var qrCodeID = ecConstants.IDENTIFIERS.QR_CODE_IDENTIFIER;

		function _extractID(string = '', indexOfIdentifier = 0) {
			var endOfSubstring = indexOfIdentifier;
			return string.substring(indexOfIdentifier, string.length);
		}

		function _normalizeID(string = '') {
			var indexOfIdentifier = string.indexOf(qrCodeID);

			if (indexOfIdentifier === -1) {
				return string;
			} else {
				return _extractID(string, indexOfIdentifier)
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
				$cordovaBarcodeScanner.scan(options).then(function (result) {
					var response = _normalizeID(result.text)
					return resolve(response)
				}, function (err) {
					return reject(ecConstants.ERRORS.CANNOT_SCAN_QRCODE)
				})
			})
		}
	}
})();