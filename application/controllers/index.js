/**
 * Controller of a index page.
 * 
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

/* global Cube */

module.exports = Cube.Class({
	extend: Cube.CWebController,
	
	/**
	 * Returns pathes for bind a functions.
	 * 
	 * @return {Object}
	 */
	routes: function() {
		return {
			index: '/',
			login: '/login/',
			logout: '/user/logout/'
		};
	},

	/**
	 * Returns filters.
	 *
	 * @return {Object}
	 */
	filters: function() {
		return ['AccessControl'];
	},

	/**
	 * Access rules for access control.
	 */
	filterAccessControl: function() {
		return {
			/*beforeFilter: function(callback) {
				console.log('f1');
				callback();
			},
			afterFilter: function(callback) {
				console.log('f2');
				callback();
			},*/
			rules: [
				['allow', { actions: 'login', users: '?' }],
				['deny', { actions: '*', users: '?' }],
				['deny', { actions: 'login', users: '@' }],
				['allow', { actions: '*', users: '@' }]
			]
		};
	},
	
	/**
	 * Emit all posts.
	 */
	actionIndex: function(it) {
		it.render(this, 'index');
	},

	/**
	 * Login page.
	 */
	actionLogin: function(it) {
		it.render(this, 'login');
	},

	/**
	 * Logout
	 */
	actionLogout: function(it) {
		it.user.logout();
		it.request.redirect('/login/');
	}
});
