CREATE TABLE `user` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` char(10) NULL,
`hashed_password` char(40) NULL,
`salt` char(13) NULL,
`email` varchar(40) NULL,
`create_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`display_name` char(10) NOT NULL COMMENT '别名',
PRIMARY KEY (`id`) 
);

CREATE TABLE `article` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NULL,
`create_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`modify_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`markdown` longtext NULL,
`content` longtext NULL,
`title` varchar(40) NULL,
`place_id` int(11) NULL,
`private` tinyint(1) NULL DEFAULT 0 COMMENT '是否私有',
`post_type` varchar(10) NULL COMMENT '博客类型（post revision）',
`comment_count` int(10) NULL DEFAULT 0 COMMENT '评论数量',
`post_parent` int(11) NULL COMMENT '父文档',
`classify_id` int(11) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `tag` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` char(10) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `place` (
`artice_id` int(11) NOT NULL,
`tag_id` int(11) NOT NULL,
PRIMARY KEY (`artice_id`, `tag_id`) 
);

CREATE TABLE `comment` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` char(10) NULL,
`email` varchar(40) NULL,
`address` varchar(40) NULL,
`comment` varchar(200) NULL,
`article_id` int(11) NULL,
`father_id` int(11) NULL,
`create_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`show` int(1) NULL,
`son_num` int(10) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `classify` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(10) NULL,
`num` int(10) NULL DEFAULT 0,
PRIMARY KEY (`id`) 
);


ALTER TABLE `article` ADD CONSTRAINT `article_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `place` ADD CONSTRAINT `place_article` FOREIGN KEY (`artice_id`) REFERENCES `article` (`id`);
ALTER TABLE `place` ADD CONSTRAINT `place_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`);
ALTER TABLE `comment` ADD CONSTRAINT `comment_article` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);
ALTER TABLE `comment` ADD CONSTRAINT `comment_father` FOREIGN KEY (`father_id`) REFERENCES `comment` (`id`);
ALTER TABLE `article` ADD CONSTRAINT `article_classify` FOREIGN KEY (`classify_id`) REFERENCES `classify` (`id`);

