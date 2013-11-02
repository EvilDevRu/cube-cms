/**
 * Controller of the articles.
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
			index: '/articles/',
			create: '/articles/create/',
			edit: '/articles/edit/:id/',
			delete: '/articles/delete/',
			view: '/articles/view/:id/'
		};
	},

	/**
	 * Index.
	 */
	actionIndex: function(it) {
		Cube.models.postgresql('Categories').find().all(function(err, categories) {
			//	TODO: Err
			Cube.models.postgresql('Articles').find().all(function(err, articles) {
				//	TODO: Err
				it.render(this, 'index', {
					articles: articles,
					categories: categories
				});
			}.bind(this));
		}.bind(this));
	},

	/**
	 * Add articles.
	 */
	actionCreate: function(it) {
		var model = Cube.models.postgresql('Articles');

		if (!it.request.isPostRequest()) {
			Cube.models.postgresql('Categories').find().all(function(err, categories) {
				if (err) {
					throw 'Could\'t get categories!';
				}

				it.render(this, 'create', {
					model: model,
					categories: categories
				});
			}.bind(this));
			return;
		}

		model.set(it.request.get('Articles'))
			.save(function(err, model) {
				if (err) {
					console.error(err);
					it.render(this, 'create', {
						model: model
					});
					return;
				}

				it.request.redirect('/articles/view/' + model.get('id') + '/');
			}.bind(this));
	},

	/**
	 * Edit category.
	 */
	actionEdit: function(it) {
		var id = it.request.getParam('id'),
			model = Cube.models.postgresql('Articles');

		model.find(id).one(function(err, model) {
			if (err) {
				throw err;
			}

			if (!it.request.isPostRequest()) {
				Cube.models.postgresql('Categories').find().all(function(err, categories) {
					if (err) {
						throw 'Could\'t get categories!';
					}

					it.render(this, 'edit', {
						model: model,
						categories: categories
					});
				}.bind(this));
				return;
			}

			model.set(it.request.get('Articles'))
				.unset(['date_create', 'date_update'])//	FIXME: Какой то косяк с сохранением дат
				.save(function(err, model) {
					if (err) {
						console.log(err);
						Cube.models.postgresql('Categories').find().all(function(err, categories) {
							if (err) {
								throw 'Could\'t get categories!';
							}

							it.render(this, 'edit', {
								model: model,
								categories: categories
							});
						}.bind(this));

						return;
					}

					it.request.redirect('/articles/view/' + model.get('id') + '/');
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

		Cube.models.postgresql('Articles').delete(ids).all(function(err) {
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
			model = Cube.models.postgresql('Articles');

		model.find(id).one(function(err, model) {
			if (err) {
				console.error('fuck!!');
				return;
			}

			it.render(this, 'view', {
				model: model
			});
		}.bind(this));
	}
});
