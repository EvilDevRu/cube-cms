/**
 * Controller of the categories.
 * 
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

module.exports = Cube.Class({
	extend: Cube.CWebController,

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
			rules: [
				['deny', { actions: '*', users: '?' }]
			]
		};
	},
	
	/**
	 * Returns pathes for bind a functions.
	 * 
	 * @return {Object}
	 */
	routes: function() {
		return {
			index: '/categories/',
			create: '/categories/create/',
			edit: '/categories/edit/:id/',
			delete: '/categories/delete/',
			view: '/categories/view/:id/'
		};
	},
	
	/**
	 * Index.
	 */
	actionIndex: function(it) {
		Cube.models.postgresql('Categories').find().all(function(err, categories) {
			it.render(this, 'index', {
				location: it.request.getLocation(),
				rubrics: categories
			});
		}.bind(this));
	},

	/**
	 * Add category.
	 */
	actionCreate: function(it) {
		var model = Cube.models.postgresql('Categories');

		if (!it.request.isPostRequest()) {
			it.render(this, 'create', {
				model: model
			});
			return;
		}

		model.set(it.request.get('Categories'))
			.save(function(err, model) {
				if (err) {
					it.render(this, 'create', {
						model: model
					});
					return;
				}

				it.request.redirect('/categories/view/' + model.get('id') + '/');
			}.bind(this));
	},

	/**
	 * Edit category.
	 */
	actionEdit: function(it) {
		var id = it.request.getParam('id'),
			model = Cube.models.postgresql('Categories');

		model.find(id).one(function(err, model) {
			if (err) {
				console.error('fuck1');
				return;
			}

			if (!it.request.isPostRequest()) {
				it.render(this, 'edit', {
					model: model
				});
				return;
			}

			model.set(it.request.get('Categories'))
				.save(function(err, model) {
					if (err) {
						console.error(err);
						it.render(this, 'edit', {
							model: model
						});
						return;
					}

					it.request.redirect('/categories/view/' + model.get('id') + '/');
				}.bind(this));
		}.bind(this));
	},

	/**
	 * Delete category\ies
	 *
	 * @param it
	 */
	actionDelete: function(it) {
		var id = it.request.get('id');

		if (!it.request.isDeleteRequest() || _.isUndefined(id)) {
			throw 'Request error!';
		}

		var ids = _.isArray(id) ? id : id.split(',');
		if (!ids.length) {
			throw 'Empty items!';
		}

		Cube.models.postgresql('Categories').delete(ids).all(function(err, count) {
			if (err) {
				throw err;
			}

			it.request.send(200);
		});
	},

	/**
	 * View category.
	 */
	actionView: function(it) {
		var id = it.request.getParam('id'),
			model = Cube.models.postgresql('Categories');

		model.find(id).one(function(err, model) {
			if (err) {
				console.error('fuck!');
				return;
			}

			it.render(this, 'view', {
				model: model
			});
		}.bind(this));
	}
});
