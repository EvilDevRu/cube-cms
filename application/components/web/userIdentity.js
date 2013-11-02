/**
 * User identity base component class.
 *
 * @see https://github.com/ttezel/twit
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

module.exports = Cube.Class({
	extend: Cube.UserIdentityBaseComponent,

	/**
	 * Auth user.
	 */
	authenticate: function(callback) {
		Cube.models.pg('Users').find({ login: this.username.trim() }).one(function(err, user) {
			if (err) {
				callback(err);
				return;
			}

			var errorCode = '';

			if (user.isNewRecord()) {
				errorCode = this.ERROR_USERNAME_INVALID;
			}
			else if (_.isUndefined(user.get('password')) || user.get('password') !== this.password) {
				errorCode = this.ERROR_PASSWORD_INVALID;
			}
			else {
				this.setId(user.get('id'));
			}

			callback(null, errorCode, user);
		}.bind(this));
	}
});