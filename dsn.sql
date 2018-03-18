-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: switch_app
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `User_image`
--

DROP TABLE IF EXISTS `User_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_image` (
  `img_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_name` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `user_id` int(125) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_image`
--

LOCK TABLES `User_image` WRITE;
/*!40000 ALTER TABLE `User_image` DISABLE KEYS */;
INSERT INTO `User_image` VALUES (1,'user.png',59,'user.png'),(3,'android.png',59,'android.png'),(4,'tick.png',59,'tick.png'),(5,'ic_reject_red.png',59,'ic_reject_red.png'),(6,'android.png',59,'android.png'),(7,'android.png',59,'android.png'),(8,'user.png',59,'user.png'),(9,'user.png',59,'user.png'),(10,'android.png',59,'android.png'),(11,'bg_trasparent.png',59,'bg_trasparent.png'),(12,'user.png',59,'user.png'),(13,'profile.png',59,'profile.png');
/*!40000 ALTER TABLE `User_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `floor_id` int(11) NOT NULL,
  `channel` varchar(25) NOT NULL,
  `user_id` int(125) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (150,171,'ac',321,'channel 1',0),(151,174,'light',321,'channel 2',0),(152,174,'ac',321,'channel 3',0),(153,174,'light',321,'channel 4',0),(154,174,'ac',321,'channel 3',0),(155,171,'light',321,'channel 3',0),(156,174,'light',321,'channel 1',0),(157,171,'ac',321,'channel 4',0),(158,171,'light',321,'channel 1',0),(159,171,'ac',321,'channel 4',0),(160,171,'ac',321,'channel 4',0),(161,171,'light',321,'channel 1',0),(162,174,'ac',321,'channel 3',0),(163,171,'ac',321,'channel 5',0),(164,171,'ac',321,'channel 5',0),(165,174,'ac',321,'channel 5',0),(166,174,'light',321,'channel 5',0),(167,171,'ac',321,'channel 4',0),(168,171,'ac',321,'channel 3',0),(169,171,'ac',321,'channel 2',0),(170,174,'ac',321,'channel 2',0),(171,174,'light',321,'channel 1',0),(172,171,'ac',321,'channel 4',0),(173,171,'ac',321,'channel 1',0),(174,174,'ac',321,'channel 1',0),(175,171,'light',321,'channel 3',0),(176,171,'light',321,'channel 5',0),(177,174,'light',321,'channel 5',0),(178,174,'ac',321,'channel 4',0),(179,171,'light',321,'channel 3',0),(180,174,'light',321,'channel 3',0),(181,171,'light',321,'channel 1',0),(182,174,'light',321,'channel 5',0),(183,171,'light',321,'channel 4',0),(184,174,'light',321,'channel 4',0),(185,174,'ac',321,'channel 1',0),(186,171,'ac',321,'channel 3',59);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floors`
--

DROP TABLE IF EXISTS `floors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `floors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `floor_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floors`
--

LOCK TABLES `floors` WRITE;
/*!40000 ALTER TABLE `floors` DISABLE KEYS */;
INSERT INTO `floors` VALUES (321,59,'ground floor'),(322,59,'ground floor'),(323,59,'ground floor'),(324,59,'first floor'),(325,59,'second floor'),(326,59,'third floor'),(327,59,'third floor'),(328,59,'first floor'),(329,59,'third floor'),(330,59,'third floor'),(331,59,'third floor'),(332,59,'second floor'),(333,59,'third floor'),(334,59,'third floor'),(335,59,'fifth floor'),(336,59,'ground floor'),(337,59,'ground floor'),(338,59,'fifth floor'),(339,59,'first floor'),(340,59,'fifth floor'),(341,59,'third floor'),(342,59,'third floor'),(343,59,'first floor'),(344,59,'second floor'),(345,59,'first floor'),(346,59,'first floor'),(347,59,'ground floor'),(348,59,'tenth floor'),(349,59,'tenth floor'),(350,59,'fifth floor'),(351,59,'third floor'),(352,59,'second floor'),(353,59,'second floor'),(354,59,'tenth floor'),(355,59,'second floor'),(356,59,'second floor'),(357,59,'second floor'),(358,59,'fifth floor'),(359,59,'second floor'),(360,59,'fifth floor'),(361,59,'first floor');
/*!40000 ALTER TABLE `floors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `register` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `phone` varchar(150) DEFAULT NULL,
  `login_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (3,'req.body.name','123456','req.body.email','Delhi','req.body.phone',NULL),(59,'Ajit Singhania','123456','ajit@sandstrom.com','Delhi','9875432569',NULL),(60,'Tejas','123','tejas@sandstrom.com','Noida','9897654213',NULL),(61,'pihu','123','pihu@sandstrom.com','gurgaon','9897563214',NULL),(62,'sonu','123','sonu@gmail.com','agra','9635874125',NULL),(63,'jitendra','123456','ajit@sandstrom.com','Delhi','9632145878',NULL),(64,'rohit','123','ajit@gmail.com','noida','9632145875',NULL),(65,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `floor_id` int(11) NOT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `user_id` int(125) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `floor_id` (`floor_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (171,321,'guest room',0),(172,321,'guest room',0),(173,321,'guest room',0),(174,321,'mater room',0),(175,321,'mater room',0),(176,321,'mater room',0),(177,321,'mater room',0),(178,321,'guest room',0),(179,321,'mater room',0),(180,321,'guest room',0),(181,321,'guest room',0),(182,321,'guest room',0),(183,321,'guest room',0),(184,321,'guest room',0),(185,321,'mater room',0),(186,321,'guest room',0),(187,321,'mater room',0),(188,321,'guest room',0),(189,321,'guest room',0),(190,321,'mater room',0),(191,321,'mater room',0),(192,321,'guest room',0),(193,321,'guest room',0),(194,321,'guest room',0),(195,321,'mater room',0),(196,321,'mater room',0),(197,321,'guest room',0),(198,321,'guest room',0),(199,321,'mater room',0),(200,321,'guest room',0),(201,321,'guest room',0),(202,321,'mater room',0),(203,321,'mater room',0),(204,321,'guest room',0),(205,321,'mater room',0),(206,321,'guest room',0),(207,321,'mater room',0),(208,321,'guest room',0),(209,321,'mater room',0),(210,321,'mater room',0),(211,321,'guest room',59);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-15 17:13:59
