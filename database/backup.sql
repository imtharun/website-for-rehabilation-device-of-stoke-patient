-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: abc
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `salt` varchar(100) DEFAULT NULL,
  `cat` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--
-- ORDER BY:  `user_id`

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'patient1@gmail.com','12345678','123412345678','patient'),(2,'doctor1@gmail.com','12345678','123412345678','doctor'),(3,'caretaker1@gmail.com','12345678','123412345678','caretaker'),(5,'doctor2@gmail.com','12345678','123456781234','doctor'),(6,'patient2@gmail.com','12345678','1234567890','patient'),(7,'patient3@gmail.com','12345678','1234567890','patient'),(8,'caretaker2@gmail.com','12345678','1234567890',NULL);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `care_pat`
--

DROP TABLE IF EXISTS `care_pat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `care_pat` (
  `caretaker_id` varchar(100) NOT NULL,
  `patient_id` varchar(100) DEFAULT NULL,
  KEY `caretaker_id` (`caretaker_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `care_pat_ibfk_1` FOREIGN KEY (`caretaker_id`) REFERENCES `caretaker` (`caretaker_id`),
  CONSTRAINT `care_pat_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `care_pat`
--

LOCK TABLES `care_pat` WRITE;
/*!40000 ALTER TABLE `care_pat` DISABLE KEYS */;
INSERT INTO `care_pat` VALUES ('caretaker1@gmail.com','patient1@gmail.com'),('caretaker1@gmail.com','patient2@gmail.com'),('caretaker2@gmail.com','patient1@gmail.com'),('caretaker2@gmail.com','patient2@gmail.com'),('caretaker2@gmail.com','patient3@gmail.com');
/*!40000 ALTER TABLE `care_pat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caretaker`
--

DROP TABLE IF EXISTS `caretaker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caretaker` (
  `user_id` int NOT NULL,
  `caretaker_id` varchar(100) NOT NULL,
  `caretaker_name` varchar(100) NOT NULL,
  `caretaker_image` blob,
  `caretaker_address` varchar(100) DEFAULT NULL,
  `caretaker_dob` varchar(20) DEFAULT NULL,
  `caretaker_phonenumber` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`caretaker_id`),
  UNIQUE KEY `caretaker_id` (`caretaker_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caretaker`
--
-- ORDER BY:  `caretaker_id`

LOCK TABLES `caretaker` WRITE;
/*!40000 ALTER TABLE `caretaker` DISABLE KEYS */;
INSERT INTO `caretaker` VALUES (3,'caretaker1@gmail.com','abu',NULL,'chennai','23-09-22',NULL),(8,'caretaker2@gmail.com','sanjay',NULL,'coimbatore','23-09-88',NULL);
/*!40000 ALTER TABLE `caretaker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `user_id` int NOT NULL,
  `doctor_id` varchar(100) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctor_image` blob,
  `doctor_address` varchar(100) DEFAULT NULL,
  `doctor_dob` varchar(20) DEFAULT NULL,
  `doctor_phonenumber` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `doctor_id` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--
-- ORDER BY:  `doctor_id`

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (2,'doctor1@gmail.com','Yuvarraj',NULL,'chennai','17-08-02','1234567890'),(5,'doctor2@gmail.com','Sri',NULL,'Coimbatore','12-08-03','987654321');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_details`
--

DROP TABLE IF EXISTS `game_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_details` (
  `game_id` varchar(100) NOT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_details`
--
-- ORDER BY:  `game_id`

LOCK TABLES `game_details` WRITE;
/*!40000 ALTER TABLE `game_details` DISABLE KEYS */;
INSERT INTO `game_details` VALUES ('Bird Dodge'),('Block & Ball'),('Burst'),('Car Dodge'),('Copter Block'),('Drop balls'),('Hit catch'),('Hurdles'),('Newton Balls'),('Trace'),('Veggie Pick'),('Windows');
/*!40000 ALTER TABLE `game_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levelcompleted`
--

DROP TABLE IF EXISTS `levelcompleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levelcompleted` (
  `level_id` int NOT NULL AUTO_INCREMENT,
  `level_no` int DEFAULT '0',
  `session_no` int DEFAULT NULL,
  `patient_id` varchar(100) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `game_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`level_id`),
  KEY `patient_id` (`patient_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `levelcompleted_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `levelcompleted_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game_details` (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levelcompleted`
--
-- ORDER BY:  `level_id`

LOCK TABLES `levelcompleted` WRITE;
/*!40000 ALTER TABLE `levelcompleted` DISABLE KEYS */;
INSERT INTO `levelcompleted` VALUES (1,1,1,'patient1@gmail.com','20','Bird Dodge'),(2,1,1,'patient1@gmail.com','30','Burst'),(3,3,1,'patient1@gmail.com','40','Block & Ball'),(4,2,2,'patient1@gmail.com','30','Bird Dodge'),(5,5,4,'patient1@gmail.com','20','Burst'),(6,2,2,'patient1@gmail.com','10',NULL),(7,4,3,'patient1@gmail.com','20','Bird Dodge');
/*!40000 ALTER TABLE `levelcompleted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `user_id` int NOT NULL,
  `patient_id` varchar(100) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_image` blob,
  `patient_address` varchar(100) DEFAULT NULL,
  `patient_dob` varchar(20) DEFAULT NULL,
  `patient_phonenumber` varchar(13) DEFAULT NULL,
  `doctor_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `patient_id` (`patient_id`),
  UNIQUE KEY `patient_name` (`patient_name`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--
-- ORDER BY:  `patient_id`

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'patient1@gmail.com','tharun',NULL,'pollachi','09-09-08','1234543216','doctor1@gmail.com'),(6,'patient2@gmail.com','ss',NULL,'sss','09-09-09','1234567890','doctor2@gmail.com'),(7,'patient3@gmail.com','asas',NULL,'aaaaaa','08-11-99','1234567890','doctor1@gmail.com');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 16:55:41
