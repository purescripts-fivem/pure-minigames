fx_version "cerulean"

description "purescripts Minigames"
author "Blaze"
version '1.0.0'

lua54 'yes'

game 'gta5'

ui_page 'web/build/index.html'

client_scripts {
  'client/**/*',
}

server_scripts {
  'server/**/*',
}

shared_scripts {
  'config/*.lua',
  'locales/**/*',
}

files {
	'web/build/index.html',
	'web/build/**/*',
  'config/themes.json'
}

exports {
  'numberCounter',
}