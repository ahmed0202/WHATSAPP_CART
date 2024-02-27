CREATE DATABASE  IF NOT EXISTS `whatsapp_cart` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `whatsapp_cart`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: whatsapp_cart
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `category_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'WOMEN','2024-02-18 07:21:37','2024-02-19 11:12:53'),(3,'MEN','2024-02-18 07:26:53','2024-02-19 07:19:31'),(5,'KIDS','2024-02-18 07:27:40','2024-02-19 07:19:31'),(7,'BABY','2024-02-18 07:28:53','2024-02-19 07:19:31'),(8,'LCW HOME ','2024-02-18 07:29:42','2024-02-19 11:13:08'),(10,'SALE%','2024-02-18 07:33:27','2024-02-19 07:19:31');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_item_qty` int DEFAULT '1',
  `order_item_price` decimal(10,2) NOT NULL,
  `order_item_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_item_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  KEY `order_item_ibfk_1_idx` (`product_id`),
  KEY `order_item_ibfk_2_idx` (`order_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (6,1,2,5,10000.00,'2024-02-26 22:35:34','2024-02-18 08:42:23'),(15,32,22,4,2323.00,'2024-02-26 12:53:37','2024-02-24 23:31:35'),(45,39,28,13,6750.00,'2024-02-26 12:16:54','2024-02-26 07:40:54'),(47,39,19,11,15000.25,'2024-02-26 09:51:54','2024-02-26 08:19:30'),(48,39,27,6,25751.00,'2024-02-26 09:58:10','2024-02-26 09:20:59'),(51,32,24,4,123456.00,'2024-02-26 12:53:40','2024-02-26 12:53:28'),(60,48,18,5,23250.00,'2024-02-26 16:46:38','2024-02-26 16:34:20'),(61,49,18,1,23250.00,'2024-02-26 16:54:40','2024-02-26 16:54:40'),(62,50,27,1,25751.00,'2024-02-26 17:00:46','2024-02-26 17:00:46'),(65,52,19,1,15000.25,'2024-02-26 17:17:21','2024-02-26 17:17:21'),(66,52,28,1,6750.00,'2024-02-26 17:17:40','2024-02-26 17:17:40'),(74,60,26,3,494963.00,'2024-02-26 20:39:32','2024-02-26 20:37:53'),(75,60,24,2,123456.00,'2024-02-26 20:45:25','2024-02-26 20:45:20'),(76,1,12,1,10000.00,'2024-02-26 21:30:26','2024-02-26 21:30:26'),(77,1,19,1,15000.25,'2024-02-26 21:31:31','2024-02-26 21:31:31'),(79,61,18,1,23250.00,'2024-02-26 22:30:30','2024-02-26 22:30:30');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_subtotal` decimal(10,2) DEFAULT '0.00',
  `order_total_qty` int DEFAULT '0',
  `order_status` enum('pending','confirmed') DEFAULT 'pending',
  `order_city` varchar(45) DEFAULT NULL,
  `order_town` varchar(45) DEFAULT NULL,
  `order_delivery_address` varchar(250) DEFAULT NULL,
  `order_phonenumber` varchar(10) DEFAULT NULL,
  `order_comment` text,
  `order_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,75000.25,7,'confirmed','erbil','erbil center','middle of city','7501234567','tomorrow at noon in the middle of the city','2024-02-26 22:35:46','2024-02-18 07:18:24'),(32,503116.00,8,'confirmed','kirkuk','kirkuk center','Dhdhsh','7507250752','Dydhsh','2024-02-26 12:54:03','2024-02-24 23:31:35'),(39,407258.75,30,'confirmed','dhok','dhok center','defcewdcewcx','7507250752','ewsfdecwc','2024-02-26 12:21:44','2024-02-26 07:25:35'),(40,116250.00,5,'confirmed','erbil','prdi','qwxqxqxzwx','7507250752','sxwxqwsxzwwx','2024-02-26 12:44:25','2024-02-26 12:23:56'),(48,116250.00,5,'confirmed','dhok','dhok center','3wd32d3d3d','7507250752','d3wd33d3dsw','2024-02-26 16:51:51','2024-02-26 16:34:19'),(49,23250.00,1,'confirmed','dhok','zakho','edededed','7507250752','dewdwedwwdwd','2024-02-26 16:55:03','2024-02-26 16:54:40'),(50,25751.00,1,'confirmed','dhok','dhok center','wdwdwdw3','7507250752','wdwdwdwd','2024-02-26 17:00:56','2024-02-26 17:00:46'),(52,21750.25,2,'confirmed','dhok','zakho','2d2d2d2d2','7507250752','wdwdwdwdwddwwd','2024-02-26 17:18:08','2024-02-26 17:17:21'),(60,0.00,0,'pending',NULL,NULL,NULL,NULL,NULL,'2024-02-26 20:37:53','2024-02-26 20:37:53'),(61,0.00,0,'pending',NULL,NULL,NULL,NULL,NULL,'2024-02-26 22:30:16','2024-02-26 22:30:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `product_name` varchar(200) NOT NULL,
  `product_code` varchar(45) DEFAULT NULL,
  `product_file_uri` text,
  `product_price` decimal(10,2) NOT NULL,
  `product_status` bit(1) DEFAULT b'1',
  `product_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `products_ibfk_1_idx` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'nice photo','5989','/public/1708364163644-875441509.jpg',29000.00,_binary '','2024-02-18 07:50:17','2024-02-19 17:36:03'),(2,1,'nice photo v2','5990','/public/1708364213247-743012500.jpg',33000.00,_binary '','2024-02-18 07:55:31','2024-02-19 17:36:53'),(10,1,'nice photo v2','5990','/public/1708364242008-145552961.jpg',50000.00,_binary '','2024-02-18 08:06:47','2024-02-19 17:37:22'),(12,1,'nice photo v2','5990','/public/1708362984462-84700532.jpg',10000.00,_binary '','2024-02-19 17:16:24','2024-02-19 17:16:24'),(14,3,'nice photo v23','5990','/public/1708367833505-989463377.jpg',25000.00,_binary '','2024-02-19 18:37:13','2024-02-19 18:37:13'),(15,5,'nice photo v23','5990','/public/1708367859100-525610031.jpg',25000.00,_binary '','2024-02-19 18:37:39','2024-02-19 18:37:39'),(16,5,'nice photo v23','5990','/public/1708459208118-329191484.jpg',25000.00,_binary '','2024-02-20 20:00:08','2024-02-20 20:00:08'),(17,5,'nice photo v23','5990','/public/1708462165338-369144137.jpg',25000.00,_binary '','2024-02-20 20:49:25','2024-02-20 20:49:25'),(18,3,'updated as last test for product edit','black on white sheet','/public/1708585009734-577046083.jpg',23250.00,_binary '','2024-02-21 06:29:21','2024-02-22 06:56:49'),(19,8,'updated with status','new code','/public/1708535648982-737035115.jpg',15000.25,_binary '','2024-02-21 06:43:50','2024-02-21 17:56:30'),(20,3,'wfdwfdws','e2ddx','/public/1708499204894-58769026.jpg',2322.00,_binary '','2024-02-21 07:06:45','2024-02-21 07:06:45'),(21,1,'wdwdw33','f3ewfc','/public/1708499412452-667167308.jpg',2442.00,_binary '','2024-02-21 07:10:12','2024-02-21 07:10:12'),(22,1,'wdxwdx','dewddx','/public/1708499495207-202533184.jpg',2323.00,_binary '','2024-02-21 07:11:35','2024-02-21 07:11:35'),(23,1,'add new post','wdwd','/public/1708502980688-393954435.jpg',123456.00,_binary '','2024-02-21 08:09:40','2024-02-21 08:09:40'),(24,1,'add post v4','wdsdc','/public/1708503026057-192158792.jpg',123456.00,_binary '','2024-02-21 08:10:26','2024-02-21 08:10:26'),(26,1,'add post v99','ddsqsq','/public/1708503146165-704700729.jpg',494963.00,_binary '','2024-02-21 08:12:26','2024-02-21 08:12:26'),(27,3,'updated v61','baby package','/public/1708504883688-105217420.jpg',25751.00,_binary '','2024-02-21 08:41:23','2024-02-21 16:35:14'),(28,8,'LCW ECO Embroidered Mens Cap Hat','S41T52Z8 - GF2 - white','/public/1708522100101-415533869.jpg',6750.00,_binary '','2024-02-21 13:28:20','2024-02-21 13:28:20');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 10:27:05
