CREATE DATABASE  IF NOT EXISTS `users` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `users`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: users
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `users_table`
--

DROP TABLE IF EXISTS `users_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(30) DEFAULT NULL,
  `userName` varchar(30) DEFAULT NULL,
  `userPassword` varchar(200) DEFAULT NULL,
  `userRole` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_table`
--

LOCK TABLES `users_table` WRITE;
/*!40000 ALTER TABLE `users_table` DISABLE KEYS */;
INSERT INTO `users_table` VALUES (36,'Lavanya','Lavanya@gmail.com','$2b$10$oHsKN5AIkLpIaCsTkR0fX.p5YJ499e8m./A7QR4CV7SMqdrtkG5B.','user'),(39,'Krishh','krish@gmail.com','$2b$10$PGqXzGBMFUS65AHML3CjdeetG0uWbenEfNBvXrai9v1DQgAuPMnf6','user'),(42,'Durga','durga@gmail.com','$2b$10$45W5a3kNFu9AGy6/BQV5a.qteu8/aXhUNW5HaGMPQj5dfRbiRzo9C','admin'),(43,'Divya','divya@gamil.com','$2b$10$fnTIT3ygW2j7tE.AU0vm4u8h6.ShjAukJpNd3t3/6l2WIg5axx81e','user'),(52,'vidhyaaa','vidhya@gmail.com','$2b$10$Sx4eOEeFjicRiMbxePGaoO2gynRNGljg9MQM/sL2z0z.aJPvhAj4K','user'),(53,'Reena','reena@gmail.com','$2b$10$iGeDrUXH32EmM4szZiwtpuvoe/X8qvVYRphT1oJAfk8KtMJ26ltTq','user'),(54,'Tom','tom@gmail.com','$2b$10$.l1/XRLlilbcOqn62Jn7qeDDes9G6/6jJoMjCA.Hwsiy4sTfJacru','admin'),(55,'Pandu','pandu@gmail.com','$2b$10$0XiB1zbpA2DWP3GNTFNBFuMAP55m1VNnmOYYXVRimQnOkVLqWsryu','admin');
/*!40000 ALTER TABLE `users_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-20 10:12:12
