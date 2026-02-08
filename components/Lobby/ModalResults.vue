<template lang="pug">
.modal
  .modal__body.modal-results

    | {{ rates }}

    .modal-results__header
      h2.modal-results__title.modal-results__title_win(:style="!isUserWinner ? 'order: 1': ''") Победа
      h2.modal-results__title.modal-results__title_lose Поражение
      .modal-results__amount {{ isUserWinner ? 'Выигрыш' : 'Проигрыш' }}:  {{ $currencyFormatter(isUserWinner ? toInt(bet) * 1.7 : toInt(bet),  $auth.user.user_wallet.currency, 2) }}

    .modal-results__body
      .team.modal-results__team(
        v-for="(team, index) in teams"
        :key="index"
        :class="['team-' + team.side, {'team-users': team.user_team }]"
      )
        .team__header
          .team__side(
            :class="{ 'team__side_light': team.side === 'light', 'team__side_dark': team.side === 'dark' }"
          ) {{ team.side === 'light' ? 'Свет' : 'Тьма' }}
          .team__name(
            :class="{ 'team__name_winner': winner(team.side) }"
          ) {{ team.name }}
            img(
              v-if="winner(team.side)"
              src="/images/cup.png" alt="winner"
            ).team__name-win-icon
        .team__members
          //@changeRate="(value) => { rates[member.user.id] = value }"
          ModalResultsPlayer.team__member(
            v-for="member in membersParsed[index]"
            :key="member.user.id"
            :name="member.user.username"
            :id="member.user.id"

            :is-rate-active="team.user_team && member.user.id !== $auth.user.id ? true : false"
            :rate="rates[member.user.id] ? rates[member.user.id] : null"
            @changeRate="(value) => { rates[member.user.id] = value }"
          )

    button.button-mode-1.button-mode-1_negative.modal-results__button(
      @click="resultsClose"
    ) Закрыть
</template>

<script>
import ModalResultsPlayer from './ModalResultsPlayer'

export default {
  components: {
    ModalResultsPlayer
  },
  props: {
    // lobby: {
    //   type: Object
    // },
    bet: {
      type: [String, Number]
    },
    // slots: {
    //   type: Number
    // },
    members: {
      type: Array
    },
    win: {
      type: String,
      default: 'DOTA_GC_TEAM_BAD_GUYS'
      // default: "DOTA_GC_TEAM_GOOD_GUYS" "DOTA_GC_TEAM_BAD_GUYS" "Unknown"
    }
  },
  data () {
    return {
      teams: [
        {
          side: 'light',
          name: 'Команда 1',
          members: []
        },
        {
          side: 'dark',
          name: 'Команда 2',
          members: []
        }
      ],
      isUserWinner: false,
      rates: {}
    }
  },
  computed: {
    membersParsed () {
      if (!this.members) {
        return {}
      }

      if (this.members && this.members.length) {
        const membersParsed = [[], []]
        this.members.forEach((member) => {
          if (member.team === '1') {
            membersParsed[0].push(member)
          }
          if (member.team === '2') {
            membersParsed[1].push(member)
          }
        })

        return membersParsed
      }

      return [[], []]
    }
  },
  mounted () {
    if (!this.members) {
      return false
    }

    for (let i = 0; i < this.members.length; i++) {
      const member = this.members[i]

      if (member.user.id === this.$auth.user.id) {
        // set isUserWinner variable
        this.isUserWinner = (member.team === '1' && this.win === 'DOTA_GC_TEAM_GOOD_GUYS') || (member.team === '2' && this.win === 'DOTA_GC_TEAM_BAD_GUYS')
        // set user_team
        if (member.team === '1') {
          this.teams[0].user_team = true
          this.setInitialRates(this.membersParsed[0])
        } else if (member.team === '2') {
          this.teams[1].user_team = true
          this.setInitialRates(this.membersParsed[1])
        }
      }
    }

    return false
  },
  methods: {
    toInt (x) {
      return parseInt(x)
    },
    winner (side) {
      return (side === 'light' && this.win === 'DOTA_GC_TEAM_GOOD_GUYS') || (side === 'dark' && this.win === 'DOTA_GC_TEAM_BAD_GUYS')
    },
    // teammates members
    setInitialRates (members) {
      members.forEach((member) => {
        if (member.user.id !== this.$auth.user.id) {
          this.$set(this.rates, member.user.id, 5)
        }
      })
    },
    async resultsClose () {
      // console.log('this.rates', this.rates)
      await this.$axios.$post('dota/rate_user/', {
        id: this.$auth.user.id,
        rates: this.rates
      }).then(() => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-results {
  background: #373E65;
  border-radius: .8rem;
  max-width: 98rem;
  overflow: hidden;

  padding: 0;

  position: relative;
}
.modal-results__header {
  display: flex;
  align-items: stretch;

  position: relative;
}
.modal-results__title {
  width: 50%;

  font-family: 'Franklin Gothic Demi', sans-serif;
  font-size: 2.5rem;
  line-height: 112%;
  text-align: center;
  text-transform: uppercase;
  color: #FFFFFF;

  padding: 2.8rem 0;

  &_win {
    background: #35B788;
  }
  &_lose {
    background: #FF5E5E;
  }
}
.modal-results__amount {
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #FFFFFF;

  background: #7D5AB5;
  border-radius: .7rem;

  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);

  padding: .8rem 1.1rem;
}
.modal-results__body {
  display: flex;
  align-items: stretch;
}
.modal-results__team {
  width: 50%;
}

/*
  ============================================================
  Team
  ============================================================
*/
.team {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2.4rem;
  padding-bottom: 10rem;
  &-light {
    background: #525A88;
  }
  &-dark {
    background: #373E65;
  }

  &-users {
    order: -1;
  }
}
.team__header {
  width: 21.5rem;

  display: flex;
  align-items: center;

  margin-bottom: 1.4rem;
}
.team__side {
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;

  width: 7.7rem;
  border-radius: .7rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: .8rem 0;

  &_light {
    color: #393535;
    background: #FFFFFF;
  }
  &_dark {
    color: #FFFFFF;
    background: #1C1F32;
  }
}
.team__name {
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #FFFFFF;

  border-radius: .7rem;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: .8rem 0;

  margin-left: 2rem;

  &_winner {
    background: #35B788;
    flex-grow: 1;
    margin-left: 1rem;
  }

  &-win-icon {
    width: 1.5rem;
    height: 1.5rem;

    margin-left: 1rem;
  }
}
.team__members {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 1.3rem;
}
.team__member {

}

.modal-results__button {
  position: absolute;

  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
