<template>
  <div class="player" :class="{ 'player_finished': finished }">
    <div class="player__main">
      <div v-if="positionTaken" class="player__data">
        <div class="player__avatar">
          <img src="/images/user.png" alt="" class="player__avatar-placeholder">
        </div>
        <div class="player__name-wrapper">
          <div class="player__name">
            {{ member.username }}
          </div>
          <Stars :value="member.service_rating" :small="true" class="player__rate-stars" />
          <div v-show="isReportActive && parseInt(member.team) !== parseInt(userTeam)">
            <button v-if="true" class="player__report" @click="reportPlayer">
              Пожаловаться
            </button>
          </div>
          <div class="player__report-warning">
            Нажимая кнопку пожаловаться, вы принимаете тот факт что лобби и деньги будут заморожены до выяснения обстоятельств и проверки игрока!
          </div>
        </div>
        <div class="player__rank">
          <span v-if="rating">
            <svg-icon :name="`redesign/${rating}`" class="player__rank-icon" />
          </span>
          <span v-else>
            <svg-icon name="redesign/level-icon" class="player__rank-icon" />
          </span>
        </div>
      </div>
      <button v-else class="player__join" @click="takeMembership">
        {{ finished ? 'игра завершена' : 'Занять место'}}
      </button>
      <div class="player__position">
        {{ position + 1 }}
      </div>
    </div>
    <div v-if="false" class="player__rate">
      <Stars :value="$auth.user.service_rating" :functional="true" class="player__rate-stars" @changeValue="(value) => { $emit('changeRate', value) }" />
      <button class="player__rate-button">
        Оценить игрока
      </button>
    </div>
    <div v-show="userDetails" class="player__details">
      <ul>
        <li>Добавить в друзья</li>
        <li>Пригласить в лобби</li>
        <li>Написать сообщение</li>
        <li>Поделиться</li>
        <li>Заблокировать</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Stars from '@/components/Cabinet/Stars.vue'

export default {
  components: {
    Stars
  },
  props: {
    position: {
      type: Number,
      required: true
    },
    member: {
      type: Object,
      required: false,
      default: () => ({})
    },
    team: {
      type: Number,
      required: true
    },
    isReportActive: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    userTeam: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userDetails: false,
      isLobby: null
    }
  },
  computed: {
    rating () {
      return this.getRatingSvgName(this.member.dota_mmr)
    },
    positionTaken () {
      return Object.keys(this.member).length !== 0
    }
  },
  mounted () {
    // this.getLobby() // зачем то запрашивает всю инфо по всем игрокам? TODO: проверить зачем и убрать
  },
  methods: {
    getRatingSvgName (mmr) {
      if (mmr < 201) {
        return '0-2'
      } else if (mmr < 401) {
        return '0-4'
      } else if (mmr < 601) {
        return '0-6'
      } else if (mmr < 801) {
        return '0-8'
      } else if (mmr < 1001) {
        return '1'
      } else if (mmr < 1201) {
        return '1-2'
      } else if (mmr < 1401) {
        return '1-4'
      } else if (mmr < 1601) {
        return '1-6'
      } else if (mmr < 1801) {
        return '1-8'
      } else if (mmr < 2001) {
        return '2'
      } else if (mmr < 2201) {
        return '2-2'
      } else if (mmr < 2401) {
        return '2-4'
      } else if (mmr < 2601) {
        return '2-6'
      } else if (mmr < 2801) {
        return '2-8'
      } else if (mmr < 3001) {
        return '3'
      } else if (mmr < 3201) {
        return '3-2'
      } else if (mmr < 3401) {
        return '3-4'
      } else if (mmr < 3601) {
        return '3-6'
      } else if (mmr < 3801) {
        return '3-8'
      } else if (mmr < 4001) {
        return '4'
      } else if (mmr < 4201) {
        return '4-2'
      } else if (mmr < 4401) {
        return '4-4'
      } else if (mmr < 4601) {
        return '4-6'
      } else if (mmr < 4801) {
        return '4-8'
      } else if (mmr < 5001) {
        return '5'
      } else if (mmr < 5201) {
        return '5-2'
      } else if (mmr < 5401) {
        return '5-4'
      } else if (mmr < 5601) {
        return '5-6'
      } else if (mmr < 5801) {
        return '5-8'
      } else if (mmr < 6001) {
        return '6'
      } else if (mmr < 6201) {
        return '6-2'
      } else if (mmr < 6401) {
        return '6-4'
      } else if (mmr < 6801) {
        return '6-8'
      } else if (mmr < 7001) {
        return '7'
      } else if (mmr < 7201) {
        return '7-2'
      } else if (mmr < 7401) {
        return '7-4'
      } else if (mmr < 7801) {
        return '7-8'
      } else if (mmr > 7999) {
        return '8'
      } else {
        return '8'
      }
    },
    /**
     * сбегать в лобии по ID, и получить список игроков
     * */
    async getLobby () {
      this.isLobby = await this.$axios.$get('/dota/player_info/', {
        params: {
          id_user: this.$auth.user.id
        }
      })
      // console.log('this. lobby', this.isLobby)
      return this.isLobby
    },
    takeMembership () {
      // console.log('click takeMembership')
      if (!this.positionTaken && !this.finished) {
        this.$emit('takeMembership', {
          team: this.team,
          position: this.position + 1
        })
      }
    },
    reportPlayer () {
      this.$emit('reportPlayer', {
        // user_reported_id: this.member.user.id,
        // user_reported_name: this.member.username
        user_reported_id: this.member.user_id,
        user_reported_name: this.member.username
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.player {
  height: auto;
  min-height: 3.7rem;
  background: #282829;
  border-radius: .5rem;
  padding: .5rem;

  display: flex;

  position: relative;
}
.player__main {
  width: 100%;
  display: flex;
  align-items: center;
}
.player__data {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: .2rem;
}
.player__avatar {
  flex: 0 0 auto;

  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50%;

  background: #141415;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 1rem;

  &-placeholder {
    width: 1rem;
    height: 1rem;
  }
}
.player__name-wrapper {
  margin-right: .2rem;
}
.player__name {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 1;
  letter-spacing: 0.03rem;
  color: #FFFFFF;

  display: flex;
  flex-direction: column;

  margin-right: .7rem;
}
.player__report {
  font-weight: 300;
  font-variation-settings: 'wght' 300, 'wdth' 87.5;
  font-size: 1rem;
  line-height: 120%;
  color: #BA98F0;

  padding: 0;
  margin: 0;
  outline: none;
  border: none;

  &:hover ~ .player__report-warning {
    display: block;
  }
}
.player__report-warning {
  display: none;

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 135.7%;
  color: #FFFFFF;

  background: #282829;
  border-radius: 0 0 .5rem .5rem;
  padding: 1rem .6rem .6rem;

  position: absolute;
  left: 0;
  top: calc(100% - .5rem);
  z-index: 1;

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, .125);

  &:before {
    content: '';

    width: 75%;
    height: .1rem;
    background: #686868;

    position: absolute;
    left: 50%;
    top: .5rem;
    transform: translateX(-50%);
  }
}
.player__rank {
  flex: 0 0 auto;
  width: 2.5rem;
  margin-left: auto;
  &-icon {
    width: 2.3rem;
    height: 2.3rem;
  }
}
.player__position {
  flex: 0 0 auto;
  width: 2.5rem;
  margin-left: auto;

  font-weight: 400;
  font-size: 1.3rem;
  line-height: 123%;
  color: #FFFFFF;
  text-align: center;
}
.player__join {
  background: none;
  border: none;
  padding: 0;
  outline: none;

  font-weight: 300;
  font-size: 1.3rem;
  line-height: 123%;
  color: #606060;
  text-align: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.player__rate {
  display: flex;
  align-items: center;
}
.player__rate-stars {
  margin-right: .6rem;
  margin-left: auto;
}
.player__rate-button {
  background: #573CA3;
  border-radius: .3rem;
  padding: .1rem .5rem;

  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1rem;
  line-height: 120%;
  color: #FFFFFF;
}

.player_finished {
  height: auto;
  cursor: not-allowed;
}
</style>
