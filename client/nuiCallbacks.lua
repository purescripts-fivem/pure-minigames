function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
  -- SendReactMessage('startGame')
end

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('getConfig', function(_, cb)
  debugPrint('getConfig')
  cb(Config)
end)

RegisterNUICallback('getLanguage', function(_, cb)
  local lang = Config.language
  if not Language[lang] then
      lang = 'en'
  end
  debugPrint('getLanguage', lang)
  cb(Language[lang].nui)
end)

local games = {
  numberCounter = function (success)
    numberCounterResult(success)
  end
}

RegisterNUICallback('gameFinished', function(data, cb)
  debugPrint('Game finished', json.encode(data))
  games[data.game](data.success)
end)