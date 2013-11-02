/**
 * evildev.ru
 *
 * @author Dmitriy Yurchenko <feedback@evildev.ru>
 */

/* global $, CKEDITOR */

$(function() {
	'use strict';

	$('.gridCheckAll').on('click', function() {
		$(this).closest('table').find('tbody :checkbox').prop('checked', $(this).is(':checked'));
	});

	$('button[data-loading-text]')
		.on('click', function () {
			var btn = $(this);
			btn.button('loading');
			setTimeout(function () {
				btn.button('reset');
			}, 3000);
		});
});