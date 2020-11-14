-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema onepotdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `onepotdb` ;

-- -----------------------------------------------------
-- Schema onepotdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onepotdb` DEFAULT CHARACTER SET utf8 ;
USE `onepotdb` ;

-- -----------------------------------------------------
-- Table `recipe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `recipe` ;

CREATE TABLE IF NOT EXISTS `recipe` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `original_recipe` VARCHAR(1000) NULL,
  `actual_ingredients` VARCHAR(1000) NULL,
  `cost` DECIMAL(4,2) NULL,
  `actual_servings` INT NULL,
  `date` DATE NULL,
  `notes` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS opuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'opuser'@'localhost' IDENTIFIED BY 'opuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'opuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `recipe`
-- -----------------------------------------------------
START TRANSACTION;
USE `onepotdb`;
INSERT INTO `recipe` (`id`, `name`, `original_recipe`, `actual_ingredients`, `cost`, `actual_servings`, `date`, `notes`) VALUES (1, 'Beef Stew', 'https://thesaltymarshmallow.com/best-ever-instant-pot-beef-stew/', '2 potatoes, 1 small can tomato sauce, 1/2 lb beef, mixed vegetables.', 15.00, 7, '2020-11-01', 'Accidentally added lots of italian seasoning, worked out.');
INSERT INTO `recipe` (`id`, `name`, `original_recipe`, `actual_ingredients`, `cost`, `actual_servings`, `date`, `notes`) VALUES (2, 'Black Bean Soup', 'https://www.foodnetwork.com/recipes/food-network-kitchen/instant-pot-black-bean-soup-3649853', '1 lb black beans uncooked, bag frozen vegetables.', 2.00, 9, '2020-11-08', 'Really needs something else, a meat or maybe mushrooms. ');
INSERT INTO `recipe` (`id`, `name`, `original_recipe`, `actual_ingredients`, `cost`, `actual_servings`, `date`, `notes`) VALUES (3, 'Potato Soup', 'https://www.delish.com/cooking/recipe-ideas/a25238472/instant-pot-potato-soup/', '6 potatoes, 1 bag frozen vegetables, 1 cup milk, 1/4 cup heavy cream, seasoning', 12.00, 6, '2020-11-13', 'Was a good first try, needed more seasoning. Forgot salt/pepper.');

COMMIT;

