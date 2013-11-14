SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


-- -----------------------------------------------------
-- Table `cube`.`users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `login` VARCHAR(16) NOT NULL ,
  `password` VARCHAR(64) NOT NULL ,
  `name` VARCHAR(128) NOT NULL ,
  `date_create` DATETIME NOT NULL ,
  `date_update` DATETIME NULL ,
  `last_visit` DATETIME NULL ,
  `is_banned` TINYINT(1) NOT NULL DEFAULT FALSE ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`meta_tags`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`meta_tags` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `title` VARCHAR(128) NULL ,
  `description` VARCHAR(128) NULL ,
  `keys` VARCHAR(128) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`categories`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `parent_id` INT UNSIGNED NULL DEFAULT NULL ,
  `meta_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(64) NOT NULL ,
  `alias` VARCHAR(64) NOT NULL ,
  `description` TEXT NULL ,
  `is_publish` TINYINT(1) NULL DEFAULT FALSE ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_categories_meta_tags1` (`meta_id` ASC) ,
  INDEX `fk_categories_categories1` (`parent_id` ASC) ,
  CONSTRAINT `fk_categories_meta_tags1`
    FOREIGN KEY (`meta_id` )
    REFERENCES `cube`.`meta_tags` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categories_categories1`
    FOREIGN KEY (`parent_id` )
    REFERENCES `cube`.`categories` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`articles`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `meta_id` INT UNSIGNED NOT NULL ,
  `user_id` INT UNSIGNED NOT NULL ,
  `category_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(128) NOT NULL ,
  `alias` VARCHAR(128) NOT NULL ,
  `description` TEXT NULL ,
  `content` TEXT NOT NULL ,
  `date_create` DATETIME NOT NULL ,
  `date_update` DATETIME NOT NULL ,
  `is_publish` TINYINT(1) NULL DEFAULT FALSE ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_articles_users` (`user_id` ASC) ,
  INDEX `fk_articles_categories1` (`category_id` ASC) ,
  INDEX `fk_articles_meta_tags1` (`meta_id` ASC) ,
  CONSTRAINT `fk_articles_users`
    FOREIGN KEY (`user_id` )
    REFERENCES `cube`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_articles_categories1`
    FOREIGN KEY (`category_id` )
    REFERENCES `cube`.`categories` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_articles_meta_tags1`
    FOREIGN KEY (`meta_id` )
    REFERENCES `cube`.`meta_tags` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_categories`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `meta_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(64) NOT NULL ,
  `alias` VARCHAR(64) NOT NULL ,
  `is_publish` TINYINT(1) NULL DEFAULT FALSE ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_shop_categories_meta_tags1` (`meta_id` ASC) ,
  CONSTRAINT `fk_shop_categories_meta_tags1`
    FOREIGN KEY (`meta_id` )
    REFERENCES `cube`.`meta_tags` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_products`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `category_id` INT UNSIGNED NOT NULL ,
  `meta_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(128) NOT NULL ,
  `alias` VARCHAR(128) NOT NULL ,
  `is_publish` TINYINT(1) NULL DEFAULT FALSE ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_shop_products_shop_categories1` (`category_id` ASC) ,
  INDEX `fk_shop_products_meta_tags1` (`meta_id` ASC) ,
  CONSTRAINT `fk_shop_products_shop_categories1`
    FOREIGN KEY (`category_id` )
    REFERENCES `cube`.`shop_categories` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shop_products_meta_tags1`
    FOREIGN KEY (`meta_id` )
    REFERENCES `cube`.`meta_tags` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_specifics_groups`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_specifics_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(64) NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_specifics`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_specifics` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `group_id` INT UNSIGNED NOT NULL ,
  `name` VARCHAR(64) NOT NULL ,
  `value` VARCHAR(64) NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_shop_specifics_shop_specifics_groups1` (`group_id` ASC) ,
  CONSTRAINT `fk_shop_specifics_shop_specifics_groups1`
    FOREIGN KEY (`group_id` )
    REFERENCES `cube`.`shop_specifics_groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_attributes_groups`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_attributes_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(64) NOT NULL ,
  `schema` TEXT NOT NULL COMMENT 'JSON Schema' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_attributes`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_attributes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `group_id` INT UNSIGNED NOT NULL ,
  `data` TEXT NOT NULL COMMENT 'JSON Data' ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_shop_attributes_shop_attributes_groups1` (`group_id` ASC) ,
  CONSTRAINT `fk_shop_attributes_shop_attributes_groups1`
    FOREIGN KEY (`group_id` )
    REFERENCES `cube`.`shop_attributes_groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_products_has_shop_attributes_groups`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_products_has_shop_attributes_groups` (
  `product_id` INT UNSIGNED NOT NULL ,
  `group_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`product_id`, `group_id`) ,
  INDEX `fk_shop_products_has_shop_attributes_groups_shop_attributes_g1` (`group_id` ASC) ,
  INDEX `fk_shop_products_has_shop_attributes_groups_shop_products1` (`product_id` ASC) ,
  CONSTRAINT `fk_shop_products_has_shop_attributes_groups_shop_products1`
    FOREIGN KEY (`product_id` )
    REFERENCES `cube`.`shop_products` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shop_products_has_shop_attributes_groups_shop_attributes_g1`
    FOREIGN KEY (`group_id` )
    REFERENCES `cube`.`shop_attributes_groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`shop_products_has_shop_specifics_groups`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`shop_products_has_shop_specifics_groups` (
  `product_id` INT UNSIGNED NOT NULL ,
  `group_id` INT UNSIGNED NOT NULL ,
  PRIMARY KEY (`product_id`, `group_id`) ,
  INDEX `fk_shop_products_has_shop_specifics_groups_shop_specifics_gro1` (`group_id` ASC) ,
  INDEX `fk_shop_products_has_shop_specifics_groups_shop_products1` (`product_id` ASC) ,
  CONSTRAINT `fk_shop_products_has_shop_specifics_groups_shop_products1`
    FOREIGN KEY (`product_id` )
    REFERENCES `cube`.`shop_products` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_shop_products_has_shop_specifics_groups_shop_specifics_gro1`
    FOREIGN KEY (`group_id` )
    REFERENCES `cube`.`shop_specifics_groups` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cube`.`admin_menu`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `cube`.`admin_menu` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
  `parent_id` INT UNSIGNED NULL ,
  `name` VARCHAR(32) NOT NULL ,
  `params` TEXT NULL COMMENT 'JSON Data' ,
  `url` VARCHAR(128) NULL DEFAULT '#' ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
