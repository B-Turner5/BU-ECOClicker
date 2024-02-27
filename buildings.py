class GameStats:
    def __init__(self):
        ledBulbPoints = 1
        ledBulbCost = 25
        solarPanelPoints = 25
        solarPanelCost = 500
        boilerPoints = 2500
        boilerCost = 15000
    def calculate(self):
        return None

class Building:
    def __init__(self):
        __ledBulbLevel = 0 ## Should Range from 1-20.
        __solarPanelLevel = 0
        __boilerUpgrade = False
        __groundSourceHeatPumpsUpgrade = False
        __insulationUpgrade = False

    def getLEDBulbLevel(self):
        return self.__ledBulbLevel
    
    def setLEDBulbLevel(self, level):
        try:
            if not (level <= 0 or level > 20):
                self.__ledBulbLevel == level
        except:
            print("Error, " + str(level) + " is not a valid level.")

    def getSolarPanelLevel(self):
        return self.__ledBulbLevel
    
    def setSolarPanelLevel(self, level):
        try:
            if not (level <= 0 or level > 20):
                self.__ledBulbLevel == level
        except:
            print("Error, " + str(level) + " is not a valid level.")

    def getBoilerUpgradeStatus(self):
        return self.__ledBulbLevel
    
    def setBoilerUpgradeStatus(self, level):
        try:
            if not (level <= 0 or level > 20):
                self.__ledBulbLevel == level
        except:
            print("Error, " + str(level) + " is not a valid level.")
