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
		profiler: true,

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
		/*twitterApi: {
			consumerKey: '',
			consumerSecret: '',
			accessToken: '',
			accessTokenSecret: ''
		}*/
	},

	//	Database settings section.
	database: {
		default: 'mysql',
		mysql: {
			host: 'localhost',
			database: '',
			username: '',
			password: ''
		}
	},

	/**
	 * Before run!
	 *
	 * @param {Function} callback
	 */
	beforeRun: function(callback) {
		//	Read menu.
		Cube.models.get('Menu').find()/*.orderBy('sort DESC')*/.all(function(err, items) {
			if (err) {
				//	TODO: Throw
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
				if (item.parent_id) {
					return;
				}

				item.params = JSON.parse(item.params || '{}');
				item.submenu = [];

				_.each(_.where(items, { parent_id: item.id }), function(subItem) {
					subItem.params = JSON.parse(subItem.params || '{}');
					item.submenu.push(subItem);
				});

				Cube.app.config.navbar[ item.params.pull || 'left' ].push(item);
			}, this);

			callback(err);
		});
	}
};
