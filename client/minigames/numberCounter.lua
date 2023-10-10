local p = nil

function numberCounter(data)
    p = promise.new()
    toggleNuiFrame(true)
    Wait(250)
    local gameData = {
        totalNumbers = data and data.totalNumbers or Config.defaultGameData.totalNumbers,
        seconds = data and data.seconds or Config.defaultGameData.seconds,
        timesToChangeNumbers = data and data.timesToChangeNumbers or Config.defaultGameData.timesToChangeNumbers,
        amountOfGames = data and data.amountOfGames or Config.defaultGameData.amountOfGames,
        incrementByAmount = data and data.incrementByAmount or Config.defaultGameData.incrementByAmount,
        game = 'numberCounter'
    }
    SendReactMessage('startGame', gameData)
    local result = Citizen.Await(p)
    return result
end

function numberCounterResult(success)
    p:resolve(success)
    p = nil
    toggleNuiFrame(false)
end

RegisterCommand('numberCounter', function()
    local gameData = {
        totalNumbers = 15,
        seconds = 20,
        timesToChangeNumbers = 4,
        amountOfGames = 2,
        incrementByAmount = 5,
    }
    local result = exports['pure-minigames']:numberCounter(gameData)
    print('Result - Command', result)
end)

exports('numberCounter', numberCounter)