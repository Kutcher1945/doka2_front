const middleware = {}

middleware['steam-auth'] = require('../middleware/steam-auth.js')
middleware['steam-auth'] = middleware['steam-auth'].default || middleware['steam-auth']

middleware['wallet'] = require('../middleware/wallet.js')
middleware['wallet'] = middleware['wallet'].default || middleware['wallet']

export default middleware
