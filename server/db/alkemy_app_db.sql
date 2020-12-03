-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2020 at 03:49 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alkemy_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `transacciones`
--

CREATE TABLE `transacciones` (
  `ID` int(11) NOT NULL,
  `fk_userID` int(11) NOT NULL,
  `Concepto` text NOT NULL,
  `Monto` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Tipo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transacciones`
--

INSERT INTO `transacciones` (`ID`, `fk_userID`, `Concepto`, `Monto`, `Fecha`, `Tipo`) VALUES
(1, 1, 'compra', 100, '2020-11-02', 'egreso'),
(2, 1, 'compra', 20, '2020-11-10', 'egreso'),
(3, 1, 'pago', 500, '2020-11-10', 'ingreso'),
(4, 1, 'compra', 100, '2020-11-10', 'egreso'),
(5, 1, 'transferencia', 3000, '2020-11-13', 'ingreso'),
(6, 1, 'pago', 1000, '2020-11-13', 'ingreso'),
(7, 1, 'compra tarjeta', 1000, '2020-11-17', 'egreso'),
(8, 1, 'compra', 20, '2020-11-17', 'egreso'),
(9, 1, 'salario', 10000, '2020-11-17', 'ingreso'),
(10, 1, 'compra online', 30, '2020-11-20', 'egreso'),
(11, 1, 'transferencia', 500, '2020-11-24', 'ingreso'),
(12, 1, 'debito tarjeta', 300, '2020-11-27', 'egreso'),
(13, 1, 'compra', 60, '2020-11-29', 'egreso'),
(15, 1, 'compras', 1000, '2020-12-01', 'egreso'),
(16, 1, 'compras', 10000, '2020-12-01', 'egreso');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nombre`, `Apellido`, `Email`, `Password`) VALUES
(1, 'Matías', 'González', 'matug@gmail.com', '$2b$10$xy8.Wah/3heIPTb3VVMZeupUnA6BxehZ15ZpS0ciy5nHZxnxMqyVm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_userID` (`fk_userID`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`fk_userID`) REFERENCES `usuarios` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
