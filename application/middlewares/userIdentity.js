/**
 * UserIdentity middleware.
 *
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

module.exports = function(req, res, next) {
	if (!req.middlewares) {
		req.middlewares = {};
	}

	if (req.middlewares.request.isPostRequest()) {
		var postAuth = req.middlewares.request.get('auth');
		if (postAuth) {
			var userIdentity = new Cube.UserIdentityComponent(postAuth.login, postAuth.password);
			userIdentity.authenticate(function(err, errCode, user) {
				if (err) {
					//	TODO: Throw
					console.error(err);
				}
				else if (errCode && errCode.length) {
					console.error(errCode);
				}
				else {
					req.middlewares.session.set('userId', userIdentity.getId());
					req.middlewares.user.set('name', user.get('name'));
				}

				next();
			});

			return;
		}
	}

	next();
};