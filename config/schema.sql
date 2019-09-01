-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
--
-- ---

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  `password` VARCHAR NULL DEFAULT NULL,
  `nickname` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'topics'
--
-- ---

DROP TABLE IF EXISTS `topics`;

CREATE TABLE `topics` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` VARCHAR NULL DEFAULT NULL,
  `topic_text` MEDIUMTEXT NULL DEFAULT NULL,
  `publish_allow` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'article'
--
-- ---

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `topic_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `title` INTEGER NULL DEFAULT NULL,
  `article_text` INTEGER NULL DEFAULT NULL,
  `created_at` INTEGER NULL DEFAULT NULL,
  `will_public_at` INTEGER NULL DEFAULT NULL,
  `burn_date` INTEGER NULL DEFAULT NULL,
  `publish` INTEGER NULL DEFAULT NULL,
  `tags_1` INTEGER NULL DEFAULT NULL,
  `tags_2` INTEGER NULL DEFAULT NULL,
  `tags_3` INTEGER NULL DEFAULT NULL,
  `stash` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'read'
--
-- ---

DROP TABLE IF EXISTS `read`;

CREATE TABLE `read` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `article_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `rating` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'burn_date'
--
-- ---

DROP TABLE IF EXISTS `burn_date`;

CREATE TABLE `burn_date` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `article_title` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `topics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `article` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `read` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `burn_date` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`id`,`email`,`password`,`nickname`) VALUES
-- ('','','','');
-- INSERT INTO `topics` (`id`,`user_id`,`topic_text`,`publish_allow`) VALUES
-- ('','','','');
-- INSERT INTO `article` (`id`,`topic_id`,`user_id`,`title`,`article_text`,`created_at`,`will_public_at`,`burn_date`,`publish`,`tags_1`,`tags_2`,`tags_3`,`stash`) VALUES
-- ('','','','','','','','','','','','','');
-- INSERT INTO `read` (`id`,`article_id`,`user_id`,`rating`) VALUES
-- ('','','','');
-- INSERT INTO `burn_date` (`id`,`user_id`,`article_title`) VALUES
-- ('','','');