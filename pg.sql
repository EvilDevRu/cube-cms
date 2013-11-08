CREATE TABLE articles
(
  id serial NOT NULL,
  category_id integer,
  user_id integer NOT NULL,
  name character varying(255) NOT NULL,
  alias character varying(255) NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  date_create timestamp without time zone NOT NULL,
  date_update timestamp without time zone NOT NULL,
  is_publish boolean DEFAULT false,
  CONSTRAINT articles_pkey PRIMARY KEY (id)
);

CREATE TABLE categories
(
  id serial NOT NULL,
  name character varying(32) NOT NULL,
  alias character varying(32) NOT NULL,
  description text,
  meta_desc text,
  meta_keys character varying(255),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_name_key UNIQUE (name)
);

CREATE TABLE menu
(
  id serial NOT NULL,
  pid integer,
  name character varying(128) NOT NULL,
  url character varying(64) NOT NULL,
  pull smallint,
  sort integer NOT NULL,
  CONSTRAINT menu_pkey PRIMARY KEY (id)
);

INSERT INTO menu (id, pid, name, url, pull, sort) VALUES
(1, NULL, '<i class="glyphicon glyphicon-home"></i>&nbsp;&nbsp;Главная', '/', NULL, 0),
(2, NULL, '<i class="glyphicon glyphicon-book"></i>&nbsp;&nbsp;Контент <b class="caret"></b>', '#', NULL, 0),
(3, 2, '<i class="glyphicon glyphicon-briefcase"></i>&nbsp;&nbsp;Статьи', '/articles/', NULL, 0),
(4, 2, '<i class="glyphicon glyphicon-list"></i>&nbsp;&nbsp;Категории', '/categories/', NULL, 0),
(5, NULL, '<i class="glyphicon glyphicon-user"></i>&nbsp;&nbsp;{{USER_NAME}} <b class="caret"></b>', '#', 2, 1),
(6, 5, '<i class="glyphicon glyphicon-log-out"></i>&nbsp;&nbsp;Выйти', '/user/logout/', NULL, 0),
(7, NULL, '<i class="glyphicon glyphicon-new-window"></i>&nbsp;&nbsp;{{SITE_NAME}}', '{{SITE_URL}}', 2, 2),
(8, NULL, '<i class="glyphicon glyphicon-shopping-cart"></i>&nbsp;&nbsp;Интернет-магазин <b class="caret"></b>', '#', NULL, 0),
(9, 8, '<i class="glyphicon glyphicon-th-large"></i>&nbsp;&nbsp;Товар', '/shop/products/', NULL, 0);

CREATE TABLE users
(
  id serial NOT NULL,
  login character varying(32) NOT NULL,
  password character varying(128) NOT NULL,
  name character varying(16) NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);