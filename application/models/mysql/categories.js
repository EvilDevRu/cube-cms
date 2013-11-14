/**
 * Model of the users.
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
		return 'categories';
	},

	/**
	 * Labels.
	 */
	attributeLabels: function() {
		/* jshint camelcase: false */
		return {
			name: 'Название категории',
			description: 'Описание',
			alias: 'Псевдоним',
			meta_desc: 'Мета-тег "Описание"',
			meta_keys: 'Мета-тег "Ключевые слова"'
		};
	}
});