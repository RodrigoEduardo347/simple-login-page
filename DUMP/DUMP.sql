-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 17-Fev-2023 às 18:12
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `password`) VALUES
(1, 'João Paulo Murmúrio', 'joaopaulo@gmail.com', '$2b$12$MRosywmB61qAwBsB.DwUiuQ7Ib7RMxO1iuQeuJDG60SjnMoUBLclO'),
(2, 'Rodrigo Eduardo Baptista', 'rodrigo@gmail.com', '$2b$12$W5xY4QnJRqg71ZSm43G46O9rCdrHfFEkFge0pAFrGksRzGAVTMWJK'),
(3, 'Marco Valência de Lima', 'marcovalencia@teste.com', '$2b$12$HJ8HQ3gSYvAd7GKheo6WpOm.z4716y92TKhDS2XRv6tjfKgZJdHwm'),
(4, 'Liliane Bonucchi de Lima', 'lilianegamer@hotmail.com', '$2b$12$.T4PjhV6iz5N3V5eYLQWDO7wa5oUMINCz5wvCA44bCbwUxkRRVuhm'),
(5, 'Mario Justus do Maro Lima', 'marioJustus@generic.test', '$2b$12$LhPOjOQa6HOKhQz88RfggeyzwPwaUUHnljl4cJ1yfRTcb8ItpH2I2');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
