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
			view: '/articles/view/:id/',
			status: '/articles/status/:id/:status/'
		};
	},

	/**
	 * Index.
	 *
	 * @param it {Object}
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
	 *
	 * @param it {Object}
	 */
	actionCreate: function(it) {
		var model = Cube.models.postgresql('Articles');

		if (!it.request.isPostRequest()) {
			Cube.models.postgresql('Categories').find().all(function(err, categories) {
				if (err) {
					console.error('Could\'t get categories!');
					it.request.end();
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
	 *
	 * @param it {Object}
	 */
	actionEdit: function(it) {
		var id = it.request.getParam('id'),
			post = it.request.get('Articles', {}),
			model = Cube.models.postgresql('Articles');

		model.find(id).one(function(err, model) {
			if (err) {
				throw err;
			}

			if (!it.request.isPostRequest()) {
				Cube.models.postgresql('Categories').find().all(function(err, categories) {
					if (err) {
						console.error('Could\'t get categories!');
						it.request.end();
					}

					it.render(this, 'edit', {
						model: model,
						categories: categories
					});
				}.bind(this));
				return;
			}

			model.set(post)
				.unset(['date_create', 'date_update'])//	FIXME: Какой то косяк с сохранением дат
				.set('is_publish', post.is_publish ? true : false)
				.save(function(err, model) {
					if (err) {
						console.log(err);
						Cube.models.postgresql('Categories').find().all(function(err, categories) {
							if (err) {
								console.error('Could\'t get categories!');
								it.request.end();
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
	 * @param it {Object}
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
	 *
	 * @param it {Object}
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
	},

	/**
	 * To publish or draft article.
	 *
	 * @param it {Object}
	 */
	actionStatus: function(it) {
		var id = it.request.getParam('id'),
			status = it.request.getParam('status'),
			model = Cube.models.postgresql('Articles');

		if (!it.request.isPostRequest()) {
			it.request.end();
			return;
		}

		model.find(id).one(function(err, model) {
			if (err) {
				it.request.send('FAIL', err, true);
				return;
			}

			model.set('is_publish', status === 'publish').save(function(err) {
				if (err) {
					it.request.send('FAIL', err, true);
					return;
				}

				it.request.send('OK', '', true);
			});
		});
	}
});
