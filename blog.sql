CREATE TABLE `article` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NULL DEFAULT NULL,
`create_time` datetime NULL DEFAULT NULL,
`modify_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
`markdown` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章markdown格式',
`content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章主体',
`title` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
`intro` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '简介',
`private` tinyint(1) NULL DEFAULT 1 COMMENT '是否私有',
`post_type` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'post' COMMENT '博客类型（post revision）',
`comment_count` int(10) NULL DEFAULT 0 COMMENT '评论数量',
`post_parent` int(11) NULL DEFAULT NULL COMMENT '父文档',
`classify_id` int(11) NULL DEFAULT NULL,
`click_num` int(10) NULL DEFAULT 0 COMMENT '阅览次数',
PRIMARY KEY (`id`) ,
INDEX `article_user` (`user_id` ASC) USING BTREE,
INDEX `article_classify` (`classify_id` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 20
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `classify` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`num` int(10) NULL DEFAULT 0,
PRIMARY KEY (`id`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 6
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `comment` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`address` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`comment` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`article_id` int(11) NULL DEFAULT NULL,
`father_id` int(11) NULL DEFAULT NULL,
`create_time` datetime NULL DEFAULT NULL,
`show` int(1) NULL DEFAULT NULL,
`son_num` int(10) NULL DEFAULT NULL,
PRIMARY KEY (`id`) ,
INDEX `comment_article` (`article_id` ASC) USING BTREE,
INDEX `comment_father` (`father_id` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `place` (
`article_id` int(11) NOT NULL,
`tag_id` int(11) NOT NULL,
PRIMARY KEY (`article_id`, `tag_id`) ,
INDEX `place_tag` (`tag_id` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 0
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `sessions` (
`session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
`expires` int(11) UNSIGNED NOT NULL,
`data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
PRIMARY KEY (`session_id`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 0
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `tag` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
PRIMARY KEY (`id`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 5
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`hashed_password` char(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`salt` char(13) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`create_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
`display_name` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '别名',
PRIMARY KEY (`id`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 2
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;


ALTER TABLE `article` ADD CONSTRAINT `article_classify` FOREIGN KEY (`classify_id`) REFERENCES `classify` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `article` ADD CONSTRAINT `article_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `comment` ADD CONSTRAINT `comment_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `comment` ADD CONSTRAINT `comment_father` FOREIGN KEY (`father_id`) REFERENCES `comment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `place` ADD CONSTRAINT `place_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `place` ADD CONSTRAINT `place_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE 
ALGORITHM=UNDEFINED
DEFINER=`root`@`localhost`
SQL SECURITY DEFINER
VIEW `article_post_public` AS 
select `article`.`id` AS `id`,`article`.`user_id` AS `user_id`,`article`.`create_time` AS `create_time`,`article`.`title` AS `title`,`article`.`intro` AS `intro`,`article`.`comment_count` AS `comment_count`,`article`.`click_num` AS `click_num`,`user`.`display_name` AS `display_name` from (`article` join `user` on((`article`.`user_id` = `user`.`id`)));

CREATE 
ALGORITHM=Undefined
DEFINER=`root`@`localhost`
SQL SECURITY Definer
VIEW `article_tags` AS 
select `place`.`article_id` AS `article_id`,group_concat(`tag`.`name` separator ',') AS `tags` from (`tag` join `place` on((`place`.`tag_id` = `tag`.`id`))) group by `place`.`article_id`;

