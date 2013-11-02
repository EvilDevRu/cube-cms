/**
 * Development configuration file.
 *
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

module.exports = {
	siteName: 'Your site name',			//	FIXME:
	siteUrl: 'http://cubeframework.com',

	application: {
		host: 'localhost',
		port: 3030,
		profiler: false,

		name: 'Your site name',	//	FIXME:
		url: 'http://cubeframework.com',

		//	Session storage (e.g. memory (by default), redis).
		session: {
			store: 'redis',
			password: '',
			prefix: ''
		}
	},

	autoload: {
		components: {
			twitterApi: false
		}
	},

	components: {
		twitterApi: {
			consumerKey: '',
			consumerSecret: '',
			accessToken: '',
			accessTokenSecret: ''
		}
	},

	//	Database settings section.
	database: {
		default: 'postgresql',
		postgresql: {
			host: 'localhost',
			database: '',
			username: '',
			password: ''
		}
	},

	/**
	 * Before bind actions!
	 *
	 * @param {Object} middlewares
	 * @param {Function} callback
	 */
	beforeRun: function(callback) {
		//	Read menu.
		Cube.models.postgresql('Menu').find().orderBy('sort DESC').all(function(err, items) {
			if (err) {
				console.error(err);
				Cube.app.end(1);
			}

			Cube.app.config.navbar = {
				left: [],
				middle: [],
				right: []
			};

			//	Build menu.
			_.each(items, function(item) {
				if (item.pid) {
					return;
				}

				var to = (item.pull === 2 ? 'right' : 'middle');
				if (item.pull === 1) {
					to = 'left';
				}

				item.submenu = [];
				_.each(_.where(items, { pid: item.id }), function(subitem) {
					item.submenu.push(subitem);
				});

				Cube.app.config.navbar[ to ].push(item);
			});

			callback(err);
		});
	}
};
