
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Adatbázis: `autoberles`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `autok`
--

CREATE TABLE `autok` (
  `id` int(11) NOT NULL,
  `rendszam` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `tipus` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `evjarat` int(11) DEFAULT NULL,
  `szin` varchar(30) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `autok`
--

INSERT INTO `autok` (`id`, `rendszam`, `tipus`, `evjarat`, `szin`) VALUES
(1, 'ABC456', 'Ford Ka', 2003, 'Pink'),
(3, 'ABC123', 'Volkswagen Golf', 2011, 'Fehér'),
(4, 'ABC157', 'Ford Mondeo', 2015, 'Fekete'),
(5, 'ABC448', 'Volkswagen Golf', 2012, 'Kék');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlok`
--

CREATE TABLE `berlok` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `jogositvanyszama` varchar(15) COLLATE utf8_hungarian_ci NOT NULL,
  `telefonszam` varchar(20) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `szuletesiido` date NOT NULL,
  `lakcim` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `berlok`
--

INSERT INTO `berlok` (`id`, `nev`, `jogositvanyszama`, `telefonszam`, `szuletesiido`, `lakcim`) VALUES
(1, 'Kandúr Károly', 'LR337157', '06-41-334112', '0000-00-00', ''),
(2, 'Gipsz Jakab', 'VE445112', '06-41-555223', '0000-00-00', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `id` int(11) NOT NULL,
  `berloid` int(11) NOT NULL,
  `autoid` int(11) NOT NULL,
  `berletkezdete` date NOT NULL,
  `napokszama` int(11) DEFAULT NULL,
  `napidij` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kolcsonzes`
--

INSERT INTO `kolcsonzes` (`id`, `berloid`, `autoid`, `berletkezdete`, `napokszama`, `napidij`) VALUES
(1, 1, 4, '2017-04-23', 6, 12500),
(2, 2, 3, '2017-04-25', NULL, 9999);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `autok`
--
ALTER TABLE `autok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `berlok`
--
ALTER TABLE `berlok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `berloid` (`berloid`),
  ADD KEY `autoid` (`autoid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `autok`
--
ALTER TABLE `autok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT a táblához `berlok`
--
ALTER TABLE `berlok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD CONSTRAINT `kolcsonzes_ibfk_1` FOREIGN KEY (`autoid`) REFERENCES `autok` (`id`),
  ADD CONSTRAINT `kolcsonzes_ibfk_2` FOREIGN KEY (`berloid`) REFERENCES `berlok` (`id`);
COMMIT;

