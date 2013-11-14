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
		if (this.isNewRecord()) {
			this.set('date_create', new Date());
		}

		this.set('date_update', new Date());
		callback();
	}
});