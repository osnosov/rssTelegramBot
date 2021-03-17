DROP TABLE IF EXISTS `link`;
CREATE TABLE IF NOT EXISTS `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feed` varchar(255) DEFAULT NULL,
  `channel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

DELETE FROM `link`;
INSERT INTO `link` (`id`, `feed`, `channel`) VALUES
	(1, 'https://mysku.ru/rss', '-1001098878421'),
	(2, 'https://habr.com/ru/rss/all/all/?fl=ru', '-1001087401089');

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `pubdate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `post`;