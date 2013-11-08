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

	/**
	 * Post request.
	 */
	$('body').on('click', '.request-post', function() {
		$.ajax({
			type: 'POST',
			dataType: 'JSON',
			data: {},
			url: $(this).attr('href'),
			success: function(req) {
				if (!req || req.status !== 'OK') {
					alert(req.error || 'Ошибка');
					return;
				}

				if ($(this).data('action') === 'reload') {
					window.location.href = window.location.href;
				}
			}.bind(this)
		});

		return false;
	});
});