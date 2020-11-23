-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: b8nxnwyrhlgv0mcqzqul-mysql.services.clever-cloud.com:3306
-- Generation Time: Nov 17, 2020 at 12:16 AM
-- Server version: 8.0.15-5
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `b8nxnwyrhlgv0mcqzqul`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comentarios`
--

CREATE TABLE `Comentarios` (
  `ID_Comentar` int(11) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `Dislikes` int(11) DEFAULT NULL,
  `Respuestas` varchar(300) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `Usuario` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Juego`
--

CREATE TABLE `Juego` (
  `racha` int(11) DEFAULT NULL,
  `experiencia` int(11) DEFAULT NULL,
  `tiempo` int(11) DEFAULT NULL,
  `puntaje` int(3) NOT NULL,
  `fk_Usuario_Juego` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `correo` varchar(64) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `contraseña` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`correo`, `nombre`, `contraseña`) VALUES
('Juanito@gmail.com', 'Juan', 'e516f979536994a14d9b0500bca3a1287b9ea9fe'),
('LaMarravilla@gmail.com', 'Diego', '58486ccc831bbb9d1fab01a3f868b5d73f571902'),
('MeGustasMuchoLaura@gmail.com', 'Samuel', '6e3537a6f99b9c6c0e5ddecb22ce0f0a74bb2096');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD PRIMARY KEY (`ID_Comentar`),
  ADD KEY `nombre` (`Usuario`);

--
-- Indexes for table `Juego`
--
ALTER TABLE `Juego`
  ADD KEY `fk_Usuario_Juego` (`fk_Usuario_Juego`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Juego`
--
ALTER TABLE `Juego`
  ADD CONSTRAINT `fk_Usuario_Juego` FOREIGN KEY (`fk_Usuario_Juego`) REFERENCES `usuario` (`correo`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
