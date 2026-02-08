<template>
  <div class="history-line">
    <div class="history-line__cell">
      <div class="history-line__date">
        {{ (new Date(data.finish_game)).toLocaleDateString() }} <br>
        {{ (new Date(data.finish_game)).toLocaleTimeString() }}
      </div>
    </div>
    <div class="history-line__cell history-line__cell_align-left">
      <img
        :src="'/images/' + games['dota'].logo"
        :alt="games['dota'].name"
        class="history-line__game-logo"
      >
      {{ games['dota'].name }}
    </div>
    <div class="history-line__cell history-line__cell_padding-smaller">
      <div
        :class="{'history-line__budget_negative': !win}"
        class="history-line__budget"
      >
        {{ !win ? 'Проигрыш' : 'Выигрыш' }}
        {{ $currencyFormatter(!win ? Math.abs(data.lobby.bet) : Math.abs(data.lobby.bet) * 1.7, $auth.user.user_wallet.currency, 2) }}
      </div>
    </div>
    <div class="history-line__cell history-line__cell_align-left">
      {{ data.lobby.name }}
    </div>
    <div class="history-line__cell history-line__cell_align-left">
      {{ data.lobby.is_block ? 'В блоке' : 'Завершен' }}
    </div>
    <div class="history-line__cell">
      <UIButton class="button-history" @click.native.prevent="showResultsModal()">
        Посмотреть список
      </UIButton>
    </div>
  </div>
</template>

<script>
import ModalLobbyResults from '../Lobby/ModalResults'
export default {
  props: {
    data: {
      type: Object
    }
    // battle: {
    //   type: String
    // },
    // budget: {
    //   type: Number
    // },
    // date: {
    //   type: String
    // }
  },
  data () {
    return {
      games: {
        cs: {
          logo: 'game-logo-cs.png',
          name: 'CS:GO'
        },
        dota: {
          logo: 'game-logo-dota.png',
          name: 'Dota 2'
        },
        lol: {
          logo: 'game-logo-lol.png',
          name: 'League of Legends'
        },
        wot: {
          logo: 'game-logo-wot.png',
          name: 'World of Tanks'
        },
        pubg: {
          logo: 'game-logo-pubg.png',
          name: 'PUBG'
        }
      }
    }
  },
  computed: {
    win () {
      if (!this.data) {
        return false
      }
      let isUserWon = false
      const teamWon = this.data.result

      this.data.players_info.forEach((player) => {
        if (player.username === this.$auth.user.username) {
          /**
           * изменил проверку, т.к player.id не является id игрока
           * player.id === this.$auth.user.id
           * */
          isUserWon = (player.team === '1' && teamWon === 'DOTA_GC_TEAM_GOOD_GUYS') || (player.team === '2' && teamWon === 'DOTA_GC_TEAM_BAD_GUYS')
        }
      })
      return isUserWon
    },
    members () {
      if (!this.data) {
        return false
      }

      const members = []

      this.data.players_info.forEach((player) => {
        members.push({
          user: {
            id: player.id,
            username: player.username
          },
          team: player.team
        })
      })

      return members
    }
  },
  methods: {
    showResultsModal () {
      // this.$auth.fetchUser()
      this.$modal.show(ModalLobbyResults,
        {
          // lobby: this.data.lobby_link,
          bet: this.data.lobby.bet,
          // slots: this.data.lobby_link.slots,
          members: this.members,
          win: this.data.result
        },
        {
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.history-line {
  display: grid;
  grid-template-columns:
    minmax(150px, 6fr)
    minmax(150px, 8fr)
    minmax(150px, 6fr)
    minmax(150px, 7fr)
    minmax(150px, 6fr)
    minmax(150px, 11fr);

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #878787;
}
.history-line__game-logo {
  width: 2.7rem; // TODO: individual sizes for all logos
  height: 2.7rem;

  margin-right: 1.5rem;
}
.history-line__players {
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 128%;
  text-decoration-line: underline;
  color: #FFFFFF;
}
.history-line__cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1.2rem 1rem;

  border-bottom: .1rem solid rgba(255, 255, 255, 0.15);
  border-right: .1rem solid rgba(255, 255, 255, 0.15);

  &:last-child {
    border-right: none;
  }

  &_align-left {
    justify-content: flex-start;
  }
  &_padding-smaller {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.history-line__budget {
  width: 14rem;
  padding: 1.2rem 0;
  text-align: center;

  background: #29D96F;
  border-radius: .4rem;

  font-weight: 500;
  font-size: 1.4rem;
  color: #FFFFFF;

  &_negative {
    background: red;
  }
}

.button-history {
  line-height: 1.2;
  height: auto;
  padding: 0.6rem 1.2rem;
}
</style>
