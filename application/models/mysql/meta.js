/**
 * Model of the meta tags.
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
		return 'meta_tags';
	},

	/**
	 * Labels.
	 */
	attributeLabels: function() {
		/* jshint camelcase: false */
		return {
			title: 'Заголовок',
			description: 'Описание',
			keys: 'Ключевые слова'
		};
	}
});