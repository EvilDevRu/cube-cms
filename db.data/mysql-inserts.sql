-- admin_menu
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (1, NULL, 'Главная', '/','{ "icon": "dashboard" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (2, NULL, 'Материалы', NULL,'{ "icon": "book" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (3, 2, 'Статьи', '/articles/', '{ "icon": "file" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (4, 2, 'Категории', '/categories/', '{ "icon": "th-list" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (5, NULL, '{USER_NAME}', NULL, '{ "icon": "user", "pull": "right" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (6, 5, 'Настройки', '/user/settings/', '{ "icon": "cog" }');
INSERT INTO `admin_menu` (`id`,`parent_id`,`name`,`url`,`params`) VALUES (7, 5, 'Выход', '/user/logout/','{ "icon": "log-out" }');
