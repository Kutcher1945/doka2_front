<template>
  <div class="lobby">
    <div class="lobby__container">
      <div class="lobby__column-1">
        <!-- Карточка лобби -->
        <LobbyCard
          :id="lobby.id"
          :name="lobby.name"
          :lobby-state="lobby.status"
          :slots="lobby.slots"
          :members="lobbyMembers"
          :bet="lobby.bet"
          @takeMembership="sendSocketNewMember"
          @reportPlayer="
            (userReportedId) => {
              reportPlayer(userReportedId)
            }
          "
        />

        <!-- Чат -->
        <div v-if="lobby.status !== 'Finished'" class="logs">
          <div class="logs__inner">
            <div v-for="i in 20" :key="i" class="logs__line">
              <div class="logs__time">
                12:23
              </div>
              <div class="logs__text">
                <span class="bold hashadona2" />
                Вступил в лобби
              </div>
            </div>
          </div>
          <div class="logs-form">
            <form action="">
              <input type="text" placeholder="Напишите сообщение..." />
              <div class="logs-form__actions">
                <button class="logs-form__smiles">
                  <picture>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.3717 8.62003C15.3573 8.75683 15.3357 8.88643 15.2997 9.01603C14.5509 8.38243 13.5789 8.00083 12.5205 8.00083C10.1373 8.00083 8.20054 9.93763 8.20054 12.3208C8.20054 13.3792 8.58214 14.3512 9.21574 15.1C9.08614 15.136 8.95654 15.1576 8.81974 15.172C8.20774 15.2296 7.58134 15.2008 6.93334 15.0928C3.97414 14.5888 1.59094 12.1912 1.10134 9.22483C0.287741 4.29283 4.49254 0.0880342 9.42454 0.901634C12.3909 1.39123 14.7885 3.77443 15.2925 6.73363C15.4005 7.38163 15.4293 8.00803 15.3717 8.62003Z"
                        stroke="#878787"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </picture>
                </button>

                <button class="logs-form__stickers">
                  <picture>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.79961 15.2003C11.7761 15.2003 14.9996 11.9767 14.9996 8.00029C14.9996 4.02384 11.7761 0.800293 7.79961 0.800293C3.82316 0.800293 0.599609 4.02384 0.599609 8.00029C0.599609 11.9767 3.82316 15.2003 7.79961 15.2003Z"
                        stroke="#878787"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.37305 10.8804C5.12905 11.9676 6.39625 12.6804 7.82185 12.6804C9.24745 12.6804 10.5074 11.9676 11.2706 10.8804"
                        stroke="#878787"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </picture>
                </button>

                <button class="logs-form__submit">
                  <picture>
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.97001 1.6827L10.2302 4.06082C12.5899 5.12765 12.5899 6.87235 10.2302 7.93918L4.97001 10.3173C1.43044 11.9175 -0.0136584 10.6062 1.75613 7.41132L2.29075 6.45007C2.42594 6.20559 2.42594 5.79997 2.29075 5.55549L1.75613 4.58868C-0.0136584 1.39376 1.43658 0.0824586 4.97001 1.6827Z"
                        stroke="white"
                        stroke-width="1.1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </picture>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Настройки -->
      <LobbySettings
        :lobby-id="lobby.id"
        :bet="lobby.bet"
        :percent="commissionPercent"
        :lobby-state="lobby.status"
      >
        <template #buttons>
          <button
            v-if="lobby.status === 'Created'"
            class="button-mode-3 button-mode-3_highlighted button-mode-3_medium button-mode-3_align_center"
            @click.prevent="searchLobby"
          >
            Список Лобби
          </button>
          <UIButton
            v-if="lobby.status === 'Created' && userHasTakenSlotInThisLobby"
            @click.native="sendSocketRemoveMember"
          >
            Освободить слот
          </UIButton>
<!--          <div id="tech">-->
<!--            <div>-->
<!--              userHasTakenSlotInThisLobby:-->
<!--              <span :style="{ 'text-decoration': 'underline' }">-->
<!--                {{ userHasTakenSlotInThisLobby }}-->
<!--              </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              Lobby status:-->
<!--              <span style="text-decoration: underline;">{{ lobbyState }}</span>-->
<!--            </div>-->
<!--            <button @click.prevent="showResultsModal">-->
<!--              Results modal-->
<!--            </button>-->
<!--            <button @click.prevent="showReadyModal">-->
<!--              Ready check modal-->
<!--            </button>-->
<!--          </div>-->
        </template>
      </LobbySettings>

      <!-- Похожие лобби -->
      <SimilarLobbies :lobbies="similarLobby" />

      <!-- Модалки -->
      <modal
        v-if="lobbySocket"
        class="lobby__modal-ready"
        name="lobby-ready"
        width="100%"
        height="100%"
      >
        <ModalReady
          :lobby="lobby"
          :lobby-members="lobbyMembers"
          :lobby-socket="lobbySocket"
          @close="$modal.hide('lobby-ready')"
        />
      </modal>
      <modal
        class="lobby__modal-results"
        name="lobby-results"
        width="100%"
        height="100%"
      >
        <ModalResults
          :lobby="lobby"
          :bet="lobby.bet"
          :slots="lobby.slots"
          :members="lobbyGameHistory ? lobbyGameHistory.players_info : ''"
          :win="lobbyGameHistory ? lobbyGameHistory.result : ''"
          @close="$modal.hide('lobby-results')"
        />
      </modal>
      <modal
      class="lobby__modal-results"
        name="lobby-users"
        width="100%"
        height="100%">
        <ModalUserLobby @close="$modal.hide('lobby-users')" />
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalReady from '@/components/Lobby/ModalReady'
// import LobbyPlayer from '@/components/Lobby/LobbyPlayer'
import ModalResults from '@/components/Lobby/ModalResults'

import SimilarLobbies from '@/components/Lobby/SimilarLobbies'
import ModalUserLobby from '@/components/Lobby/ModalUserLobby'
// TODO: Lobby level?
// TODO: READY CHECK on Lobby full
//

export default {
  components: {
    ModalReady,
    ModalResults,
    SimilarLobbies,
    ModalUserLobby
  },
  layout: 'cabinet-default',
  middleware: ['steam-auth'],
  async asyncData({ $axios, params }) {
    const lobby = await $axios.$get(`/dota/lobby/${params.id}/`)
    const lobbyMembers = await $axios.$get(
      `/dota/lobby/${params.id}/memberships`
    )
    // this.lobbyMembers = lobbyMembers
    // console.log('lobby members ', lobbyMembers, params.id)

    const similarLobby = await $axios
      .$get('/dota/lobby_similar', {
        params: { bet: lobby.bet, id: lobby.id }
      })
      .catch((error) => {
        console.log(error)
      })

    // console.log('Lobby: ', lobby)
    return { lobby, lobbyMembers, similarLobby }
  },
  data() {
    return {
      lobbySocket: null,
      readyCheckTimer: null,
      lobby: {},
      lobbyMembers: [],
      readyState: false,
      gameStarted: false,
      similarLobby: {},
      timer: null,
      timerTime: 0,
      userHasTakenSlotInThisLobby: false,
      lobbyGameHistory: {},
      commissionPercent: 1.7
    }
  },
  computed: {
    ...mapGetters(['GET_CURRENT_LOBBY']),
    members() {
      if (!this.lobby || !this.lobbyMembers) {
        return []
      }

      if (
        this.lobby.status === 'Finished' &&
        this.lobbyGameHistory
        // this.lobbyGameHistory.players_info.length
      ) {
        // this.lobby.status === 'Finished' &&
        // this.lobbyGameHistory &&
        // this.lobbyGameHistory.players_info.length
        // this.getLobbyGameHistory()
        return this.lobbyGameHistory.players_info
      }
      if (Object.keys(this.lobbyMembers).length) {
        return this.lobbyMembers
      }

      return []
    },
    lobbyState() {
      if (!this.lobby) {
        return ''
      }

      return this.lobby.status
    },
    timerTimeFormatted() {
      const time = parseInt(this.timerTime / 1000)

      const hours = parseInt(time / 3600)
      const minutes = parseInt((time - hours * 3600) / 60)
      const seconds = time - hours * 3600 - minutes * 60

      const timeFormatted =
        (hours.toString().length > 1 ? hours : '0' + hours) +
        ':' +
        (minutes.toString().length > 1 ? minutes : '0' + minutes) +
        ':' +
        (seconds.toString().length > 1 ? seconds : '0' + seconds)

      return timeFormatted
    }
  },
  watch: {
    readyState(newValue) {
      if (newValue) {
        this.showReadyModal()
      }
    }
  },
  beforeMount () {
    this.getCurrentPercent()
  },
  mounted() {
    // Timer
    // if (this.lobby.datetime_start_game && this.lobbyState !== 'Finished') {
    //   const lobbyGameStatedDatetime = new Date(
    //     new Date(this.lobby.datetime_start_game).toUTCString()
    //   ).getTime()
    //   this.timerTime =
    //     new Date(new Date().toUTCString()) - lobbyGameStatedDatetime
    //   this.startTimer()
    // }
    if (this.lobbyMembers.length > 0) {
      this.setUserLobbyRelation(this.lobbyMembers)
      /**
       * check is user in lobby, else route to lobby list
       * */
      this.checkCanUserInLobby()
    }
    // Sockets
    const vm = this

    const lobbySocketURL =
      (process.env.dev ? 'ws://' : 'wss://') +
      process.env.baseUrl.replace(/(^\w+:|^)\/\//, '') +
      '/ws/lobby/' +
      this.$route.params.id +
      '/'
    this.lobbySocket = new WebSocket(lobbySocketURL)

    this.lobbySocket.onmessage = function(event) {
      // Maybe it must not be here
      // vm.$auth.fetchUser()
      const data = JSON.parse(event.data)
      // console.log('Lobby socket data: ', data)

      if (data.data.success) {
        vm.updateLobby().then(() => {
          // Show Ready-Check on full Lobby
          if (data.data.full) {
            vm.readyState = true
          }

          if (data.data.status) {
            vm.gameStarted = true
            vm.$modal.hide('lobby-ready')
            vm.getGameResults()
          }
        })
      }
    }
    this.lobbySocket.onclose = function(event) {
      console.error('Lobby socket connection closed unexpectedly')
      console.log(event)
    }

    // Continue requesting even after page reload
    // console.log('Status: ', this.lobby.status)
    if (
      this.lobby.status === 'Pending' ||
      this.lobby.status === 'Game started'
    ) {
      this.getGameResults()
    }
  },
  methods: {
    ...mapActions(['CHANGE_CURRENT_LOBBY']),
    setUserLobbyRelation(membership) {
      this.userHasTakenSlotInThisLobby = Boolean(
        membership.find(member => +member.user_id === this.$auth.user.id)
      )
    },
    searchLobby() {
      this.$router.push({
        path: '/cabinet/lobby/'
      })
    },
    showReadyModal() {
      this.$modal.show(
        'lobby-ready',
        {},
        {
          clickToClose: false
        }
      )
    },
    showResultsModal() {
      // Update balance values
      this.$auth.fetchUser()
      this.$modal.show(
        'lobby-results',
        {
          lobby: this.lobby,
          bet: this.lobby.bet,
          slots: this.lobby.slots,
          // тут будет ошибка, TODO: нужно указать lobby members result
          members: this.lobbyMembers,
          win: this.lobbyGameHistory ? this.lobbyGameHistory.result : ''
        },
        {
          clickToClose: false
        }
      )
    },
    sendSocketNewMember({ team, position }) {
      // check is user is current lobby. If null = user is not in lobby
      console.log('send socket new member')
      if (this.GET_CURRENT_LOBBY === null) {
        console.log('this.GET_CURRENT_LOBBY === null', this.GET_CURRENT_LOBBY)
        this.lobbySocket.send(
          JSON.stringify({
            data: {
              command: 'new_membership',
              userID: this.$auth.user.id,
              lobbyID: this.$route.params.id,
              team,
              userPosition: position
            }
          })
        )
        this.getUserCurrentLobby()
      } else {
        console.log('user is in other lobby')
        // show modal
        this.$modal.show(
          'lobby-users',
          {},
          {
            clickToClose: false
          })
      }
      // console.log('sendSocketNewMember team, position ', team, position)
    },
    sendSocketRemoveMember() {
      this.lobbySocket.send(
        JSON.stringify({
          data: {
            command: 'remove_membership',
            userID: this.$auth.user.id,
            lobbyID: this.$route.params.id
          }
        })
      )
      this.getUserCurrentLobby()
    },
    async updateLobby() {
      this.lobby = await this.$axios.$get(
        `/dota/lobby/${this.$route.params.id}/`
      )
      this.lobbyMembers = await this.$axios.$get(
        `/dota/lobby/${this.$route.params.id}/memberships/`
      )
      this.setUserLobbyRelation(this.lobbyMembers)
    },
    async getGameResults() {
      return await new Promise((resolve) => {
        const interval = setInterval(() => {
          const lobby = this.$axios
            .$get(`/dota/lobby/${this.$route.params.id}/`)
            .then((response) => {
              this.lobby = response
              // если игра завершена
              if (response.status === 'Finished') {
                clearInterval(interval)
                resolve(lobby)

                this.gameStarted = false
                this.updateLobby()
                // - get game_history
                this.getLobbyGameHistory()
                // - get members
                this.getLobbyMembers()
                this.showResultsModal()
                // обнуляем текущее лобби пользователя, тк игра завершена
                this.CHANGE_CURRENT_LOBBY(null)

                // stopTimer?
                // this.stopTimer()
              }
            })
            .catch((error) => {
              console.log('Error: ', error)
            })
        }, 5000)
      })
    },
    async reportPlayer(userReportedId) {
      await this.$axios.post('/dota/report/report_new_player/', {
        user_id: this.$auth.user.id,
        user_reported_id: userReportedId,
        lobby_id: this.lobby.id,
        datetime_create_game_time: this.timerTimeFormatted
      })
    },
    startTimer() {
      if (this.lobbyState !== 'Finished') {
        this.timer = setInterval(() => {
          this.timerTime += 1000
          console.log('timer ', this.timer)
        }, 1000)
      }
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    // check is user in Lobby
    async getUserCurrentLobby() {
      try {
        const responseCurrentLobby = await this.$axios.$get(
          `/dota/lobby/${this.$auth.user.id}/current_lobby/`
        )
        this.CHANGE_CURRENT_LOBBY(responseCurrentLobby.lobby)
        // console.log('set current lobby', responseCurrentLobby.lobby)
      } catch {
        console.log('clear current lobby')
        this.CHANGE_CURRENT_LOBBY(null)
      }
    },
    // get game history
    async getLobbyGameHistory() {
      try {
        const responceLobbyGameHistory = await this.$axios.$get(`/dota/game_history/${this.lobby.id}/by_lobby_id/`)
        this.lobbyGameHistory = responceLobbyGameHistory
        console.log('get history ', this.lobbyGameHistory)
      } catch (err) {
        console.log('history err', err)
        this.lobbyGameHistory = {}
      }
    },
    // get members
    async getLobbyMembers() {
      try {
        const responcelobbyMembers = await this.$axios.$get(
          `/dota/lobby/${this.$route.params.id}/memberships`
        )
        this.lobbyMembers = responcelobbyMembers
      } catch (err) {
        console.log('get lobby member err', err)
      }
    },
    // check is user in lobby
    checkCanUserInLobby () {
      const filteredMembers = this.lobbyMembers.filter(user => parseInt(user.user_id) === this.$auth.user.id)
      if (filteredMembers.length < 1 && this.gameStarted) {
        // user is in not member of this lobby
        // console.log('user is not in this lobby')
        this.$router.push('/cabinet/lobby')
      }
      // console.log('filteredMembers.length ', this.lobbyMembers, filteredMembers, filteredMembers.length)
      // console.log('check is user in lobby members ', this.lobbyMembers, filteredMembers)
    },
    async getCurrentPercent () {
      try {
        // get percent
        const currentCommission = await this.$axios.$get(`/dota/get_user_game_current_commission/?user_id=${this.$auth.user.id}`)
        let commissionPercent = 1.7
        switch (currentCommission.commission) {
          case 15:
            this.commissionPercent = 1.7
            break
          case 10:
            this.commissionPercent = 1.8
            break
          case 5:
            this.commissionPercent = 1.9
            break
          default:
            this.commissionPercent = 1.7
            break
        }
      } catch (e) {
        console.log('err current percent', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lobby {
  flex-grow: 1;
}

.lobby__container {
  display: grid;
  grid-template-columns: minmax(0, 2.85fr) minmax(0, 1fr) minmax(0, 2fr);
  grid-gap: 1.2rem;
  height: 100%;

  background: #141415;
  border-radius: 1.1rem;
  padding: 1.6rem 2.4rem 3.2rem;

  @media screen and (max-width:767px){
    grid-template-columns: auto;
  }
}

.lobby__card {
  margin-bottom: 1.2rem;
}

.lobby__modal-ready ::v-deep .vm--modal {
  background: none;
  box-shadow: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.lobby__modal-results ::v-deep .vm--modal {
  background: none;
  box-shadow: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.lobby__modal-results ::v-deep .modal {
  flex-grow: 1;
}

/*
  ============================================================
  Logs
  ============================================================
*/
.logs {
  border: 0.1rem solid #323232;
  border-radius: 0.5rem;
  //padding: 1.2rem;
  padding: 8px 11px 6px 11px;
  margin-top: 14px;
}

.logs__inner {
  background: #282829;
  border-radius: 0.5rem;
  padding: 1rem 1.2rem;

  max-height: 20rem;
  overflow-y: auto;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 0.3rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.4rem;
    background-color: #754fe0;
  }
}

.logs__line {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.2rem;
  line-height: 116%;

  display: flex;
  align-items: center;
}

.logs__time {
  flex: 0 0 auto;
  color: #754fe0;
  margin-right: 1.2rem;
}

.logs__text {
  color: rgba(255, 255, 255, 0.31);

  .bold {
    color: rgba(255, 255, 255, 0.6);
  }
}

.logs-form {
  margin: 6px 0;

  form {
    display: flex;
    align-items: center;

    input {
      width: 100%;
      font-style: normal;
      font-weight: 350;
      font-size: 14px;
      line-height: 116.7%;
      /* or 16px */

      letter-spacing: 0.3px;

      color: #5a5a5a;
      background: #282829;
      border-radius: 0.5rem;
      padding: 4px 9px 5px 9px;
      border: none;
      box-shadow: none;

      &:focus {
        outline: 0.1rem solid #323232;
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-left: 18px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 3px;
    }
  }

  &__smiles,
  &__stickers {
    picture {
      height: 14.4px;
    }
  }

  &__submit {
    background: #754fe0;
    border-radius: 5px;
    height: 25px;
    width: 39px;

    picture {
      height: 12px;
    }
  }
}

#tech {
  border: 1px solid red;
  padding: 1.6rem 1rem 0.5rem;
  color: #ffffff;
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 0.4rem;
}

#tech:before {
  content: 'tech';

  position: absolute;
  left: 0.4rem;
  top: 0.2rem;
  color: red;
}

#tech button {
  display: block;
  color: #ffffff;
  padding: 0;
  text-align: left;
  text-decoration: underline;
}
</style>
