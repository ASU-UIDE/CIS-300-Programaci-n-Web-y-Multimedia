CREATE SCHEMA IF NOT EXISTS `myTraveldb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `myTraveldb` ;

-- -----------------------------------------------------
-- Table `myTraveldb`.`Agents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myTraveldb`.`Agents` (
  `idAgents` INT NOT NULL AUTO_INCREMENT,
  `First_Name` VARCHAR(45) NULL,
  `Last_Name` VARCHAR(45) NULL,
  `Phone_Number` VARCHAR(12) NULL,
  `Email` VARCHAR(45) NULL,
  PRIMARY KEY (`idAgents`))
ENGINE = InnoDB;
