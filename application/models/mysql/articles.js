/**
 * Model of the articles.
 *
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 * @link http://cubeframework.com/
 * @copyright Copyright &copy; Dmitriy Yurchenko 2013
 * @license http://cubeframework.com/license/
 */

'use strict';

module.exports = Cube.Class({
	extend: Cube.MyActiveRecord,

	/**
	 * Returns without formatted table name.
	 *
	 * @return {String} table name.
	 */
	tableName: function() {
		return 'articles';
	},

	/**
	 * Labels.
	 */
	attributeLabels: function() {
		/* jshint camelcase: false */
		return {
			user_id: 'Автор',
			category_id: 'Категория',
			name: 'Название статьи',
			alias: 'Псевдоним',
			description: 'Описание',
			content: 'Содержание',
			date_create: 'Дата создания',
			date_update: 'Дата последнего обновления',
			is_publish: 'Опубликовано'
		};
	},

	/**
	 * ###
	 */
	beforeSave: function(callback) {
		this.set('date_update', new Date());
		if (this.isNewRecord()) {
			this.set('date_create', new Date());
			this.set('user_id', 1);	//	FIXME: Remove
		}

		var meta = Cube.models.get('Meta');

		/**
		 * Save callback function.
		 */
		var Save = function() {
			meta.set('description', this.get('meta_desc'))
				.set('keys', this.get('meta_keys'))
				.save(function(err, model) {
					if (err) {
						callback(err);
						return;
					}

					this.unset(['meta_desc', 'meta_keys']);
					if (this.isNewRecord()) {
						this.set('meta_id', model.get('id'));
					}

					callback();
				}.bind(this));
		}.bind(this);

		//	If record is exist.
		if (this.get('meta_id') && !this.isNewRecord()) {
			meta.find(this.get('meta_id')).one(function(err) {
				if (err) {
					callback(err);
					return;
				}

				Save();
			});

			return;
		}

		//	If record is not exist.
		Save();
	}
});