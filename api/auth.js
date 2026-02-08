const express = require('express')
const router = express.Router()
const passport = require('passport')
const axios = require('axios')
const cheerio = require('cheerio')

let token = ''

const API_1_HOST = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000' : 'https://api.cybert.online'
const HOST = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : 'https://cybert.online'

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/steam',
  function (req, res, next) {
    token = req.query.token
    next()
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/')
  })

// Map of rank_tier to mmr_number
const rankTierToMMR = {
  10: 0,
  11: 140,
  12: 280,
  13: 420,
  14: 560,
  15: 700,
  20: 840,
  21: 980,
  22: 1120,
  23: 1260,
  24: 1400,
  25: 1540,
  30: 1680,
  31: 1820,
  32: 1960,
  33: 2100,
  34: 2240,
  35: 2380,
  40: 2520,
  41: 2660,
  42: 2800,
  43: 2940,
  44: 3080,
  45: 3220,
  50: 3360,
  51: 3500,
  52: 3640,
  53: 3780,
  54: 3920,
  55: 4060,
  60: 4200,
  61: 4340,
  62: 4480,
  63: 4620,
  64: 4760,
  65: 4900,
  70: 5040,
  71: 5180,
  72: 5320,
  73: 5460,
  74: 5600,
  75: 5740
}

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
  function (req, res, next) {
    req.url = req.originalUrl
    next()
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      const steamId = req.user.id
      const url = `https://www.dotabuff.com/players/${steamId}`

      const { data } = await axios.get(url)
      const $ = cheerio.load(data)

      const rankTier = $('div.rank-tier-wrapper').attr('title')
      const rank = rankTier ? rankTier.split(': ')[1] : null
      console.log('rank', rank)

      const mmrNumber = getMMR(rank)
      console.log('mmrNumber', mmrNumber)

      const putData = {
        steam_id: req.user.id,
        connected_games: [{ id: '1', name: 'dota' }]
      }

      if (mmrNumber && mmrNumber > 0) {
        putData.dota_mmr = mmrNumber
      }

      await axios.put(`${API_1_HOST}/auth/data/`, putData, {
        headers: { Authorization: token },
        rejectUnauthorized: false
      }).catch((error) => {
        console.log('Error:', error.message)
      })

      if (mmrNumber && mmrNumber > 0) {
        res.redirect(`${HOST}/cabinet/`)
      } else {
        res.redirect(`${HOST}/cabinet/?mmr_error=1`)
      }
    } catch (error) {
      console.log('Error:', error.message)

      res.redirect(`${HOST}/cabinet?success=True`)
    }
  })

function getMMR (rankTierText) {
  let rating
  switch (rankTierText) {
    case 'Herald I':
      rating = rankTierToMMR[10]
      break
    case 'Herald II':
      rating = rankTierToMMR[11]
      break
    case 'Herald III':
      rating = rankTierToMMR[12]
      break
    case 'Herald IV':
      rating = rankTierToMMR[13]
      break
    case 'Herald V':
      rating = rankTierToMMR[14]
      break
    case 'Herald VI':
      rating = rankTierToMMR[15]
      break
    case 'Guardian I':
      rating = rankTierToMMR[20]
      break
    case 'Guardian II':
      rating = rankTierToMMR[21]
      break
    case 'Guardian III':
      rating = rankTierToMMR[22]
      break
    case 'Guardian IV':
      rating = rankTierToMMR[23]
      break
    case 'Guardian V':
      rating = rankTierToMMR[24]
      break
    case 'Guardian VI':
      rating = rankTierToMMR[25]
      break
    case 'Crusader I':
      rating = rankTierToMMR[30]
      break
    case 'Crusader II':
      rating = rankTierToMMR[31]
      break
    case 'Crusader III':
      rating = rankTierToMMR[32]
      break
    case 'Crusader IV':
      rating = rankTierToMMR[33]
      break
    case 'Crusader V':
      rating = rankTierToMMR[34]
      break
    case 'Crusader VI':
      rating = rankTierToMMR[35]
      break
    case 'Archon I':
      rating = rankTierToMMR[40]
      break
    case 'Archon II':
      rating = rankTierToMMR[41]
      break
    case 'Archon III':
      rating = rankTierToMMR[42]
      break
    case 'Archon IV':
      rating = rankTierToMMR[43]
      break
    case 'Archon V':
      rating = rankTierToMMR[44]
      break
    case 'Archon VI':
      rating = rankTierToMMR[45]
      break
    case 'Legend I':
      rating = rankTierToMMR[50]
      break
    case 'Legend II':
      rating = rankTierToMMR[51]
      break
    case 'Legend III':
      rating = rankTierToMMR[52]
      break
    case 'Legend IV':
      rating = rankTierToMMR[53]
      break
    case 'Legend V':
      rating = rankTierToMMR[54]
      break
    case 'Legend VI':
      rating = rankTierToMMR[55]
      break
    case 'Ancient I':
      rating = rankTierToMMR[60]
      break
    case 'Ancient II':
      rating = rankTierToMMR[61]
      break
    case 'Ancient III':
      rating = rankTierToMMR[62]
      break
    case 'Ancient IV':
      rating = rankTierToMMR[63]
      break
    case 'Ancient V':
      rating = rankTierToMMR[64]
      break
    case 'Ancient VI':
      rating = rankTierToMMR[65]
      break
    case 'Divine I':
      rating = rankTierToMMR[71]
      break
    case 'Divine II':
      rating = rankTierToMMR[72]
      break
    case 'Divine III':
      rating = rankTierToMMR[73]
      break
    case 'Divine IV':
      rating = rankTierToMMR[74]
      break
    case 'Divine V':
      rating = rankTierToMMR[75]
      break
    default:
      console.log('Rating not found')
      rating = null
      break
  }
  return rating
}

module.exports = router
