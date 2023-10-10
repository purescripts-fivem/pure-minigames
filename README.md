# pure-minigames

A repo filled with minigames the team has worked on

This utilises the project-error boilerplate [here](https://github.com/project-error/fivem-react-boilerplate-lua/tree/master)

Current minigames:

## Number Counter

This is a game where the user has to click the numbers in the correct order from 1-x, and while they are clicking the numbers are randomising to make it harder

### How to use:

    local gameData = {
        totalNumbers = 15,
        seconds = 20,
        timesToChangeNumbers = 4,
        amountOfGames = 2,
        incrementByAmount = 5,
    }
    local result = exports['pure-minigames']:numberCounter(gameData)

Or

    -- when you send no data it will use the config data
    local result = exports['pure-minigames']:numberCounter()

This awaits the result and returns true or false
