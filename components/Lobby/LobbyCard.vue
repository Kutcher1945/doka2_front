<template>
  <div class="lobby-card">
    <div class="header lobby-card__header">
      <div class="header__field">
        <div class="header__label">
          Название лобби:
        </div>
        {{ name }}
      </div>
      <div class="header__field">
        <div class="header__label">
          ID лобби:
        </div>
        {{ id }}
      </div>
    </div>
    <div class="lobby-card__body">
      <div v-if="lobbyState === 'Finished'" class="results lobby-card__results">
        <div class="results__label results__label_win">
          Победа
        </div>
        <div class="results__amount">
          {{ isUserWinner ? 'Выигрыш' : 'Проигрыш' }}<br>
          <span class="results__amount-value">{{ isUserWinner ? bet * 1.7 : bet }}₽</span>
        </div>
        <div class="results__label">
          Поражение
        </div>
      </div>
      <div class="teams">
        <div v-for="(i, index) in [0,1]" :key="i" class="team">
          <div class="team__header">
            <div class="team__name">
              {{ index+1 === 1 ? 'Силы Света' : 'Силы Тьмы' }}
            </div>
            <div class="team__header-label">
              рейтинг
            </div>
            <div class="team__header-label">
              позиция
            </div>
          </div>
          <div class="team__members">
            <LobbyPlayer
              v-for="(n, position) in (slots/2)"
              :key="n"
              :member="getMemberByTeamAndPosition(index + 1, position + 1) || {}"
              :team="index+1"
              :position="position"
              :is-report-active="userTeam != (index+1) && lobbyState === 'Game started'"
              :finished="lobbyState === 'Finished'"
              :user-team="userTeam"
              class="team__member"
              @takeMembership="$emit('takeMembership', $event)"
              @reportPlayer="reportConfirm"
            />
          </div>
        </div>
      </div>
      <NuxtLink v-if="lobbyState === 'Finished'" to="/cabinet/lobby" class="button-mode-3 button-mode-3_highlighted button-mode-3_medium button-mode-3_align_center lobby-card__button">
        Поиск лобби
      </NuxtLink>
    </div>
    <modal class="report-modal" name="report" width="100%" height="100%">
      <ModalService :title="'Пожаловаться на игрока ' + 'player' + '?'" @close="$modal.hide('report')" @confirm="$emit('reportPlayer', userReportedId)" />
    </modal>
  </div>
</template>

<script>
import ModalService from '@/components/Lobby/ModalService'

export default {
  components: {
    ModalService
  },
  props: {
    id: Number,
    name: String,
    lobbyState: String,
    slots: Number,
    members: {
      type: Array,
      default () {
        return []
      }
    },
    bet: Number
  },
  data () {
    return {
      userReportedId: 0,
      isUserWinner: false
    }
  },
  computed: {
    membersParsed () {
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
    },
    userTeam () {
      for (let i = 0; i < this.members.length; i++) {
        if (parseInt(this.members[i].user_id) === this.$auth.user.id) {
          return this.members[i].team
        }
      }

      return ''
    }
  },
  methods: {
    getMemberByTeamAndPosition (team, positionCell) {
      const members = this.membersParsed[team - 1]
      // console.log('members ', members)
      if (!members.length) { return undefined }
      const currentMember = members.find(member => member.position === positionCell)

      return currentMember
    },
    showReportConfirmationModal () {
      this.$modal.show('report')
    },
    reportConfirm (data) {
      console.log('reportConfirm data', data)
      this.userReportedId = data.user_reported_id
      this.showReportConfirmationModal()
    }
  }
}
</script>

<style lang="scss" scoped>

.report-modal ::v-deep .vm--modal {
  background: none;
  box-shadow: none;

  display: flex;
  align-items: center;
  justify-content: center;
}
.lobby-card {

}
.lobby-card__results {
  margin-bottom: 1.4rem;
}
.lobby-card__header {
  margin-bottom: .5rem;
}
.lobby-card__body {
  //width: 55rem;
  padding: 1rem;

  border: .1rem solid #323232;
  border-radius: .5rem;
}
/*
  ============================================================
  Results
  ============================================================
*/
.results {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 8.5rem minmax(0, 1fr);
  align-items: center;
}
.results__label {
  font-weight: 400;
  font-size: 2rem;
  line-height: 120%;
  color: #FFFFFF;
  text-align: center;
  text-transform: uppercase;

  background: #D94747;
  border-radius: .5rem;
  padding: .4rem 1.2rem;

  &_win {
    background: #34B788;
  }
}
.results__amount {
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1;
  color: #FFFFFF;
  text-align: center;

  &-value {
    font-size: 2rem;
  }
}
.lobby-card__button {
  width: 15rem;
  margin: 0 auto;
  margin-top: 2rem;
}
/*
  ============================================================
  Header
  ============================================================
*/
.header {
  padding-left: 1.2rem;
  display: flex;
  flex-wrap: wrap;

  //font-weight: 600;
  font-variation-settings: 'wght' 600;
  font-size: 1.6rem;
  line-height: 118%;
  color: #754FE0;
}
.header__field {
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 3.2rem;
  }
}
.header__label {
  color: #FFFFFF;

  margin-right: .25em;
}
/*
  ============================================================
  Teams
  ============================================================
*/
.teams {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 4rem;
}
.team {
}
.team__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 2.5rem 2.5rem;
  grid-gap: .2rem;
  align-items: flex-end;
  padding-right: .5rem;

  margin-bottom: .4rem;
}
.team__name {
  font-weight: 300;
  font-variation-settings: 'wght' 300;
  font-size: 1.3rem;
  line-height: 123%;
  color: #FFFFFF;
}
.team__header-label {
  font-weight: 300;
  font-size: .6rem;
  line-height: 116%;
  color: #606060;
}
.team__members {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: .5rem;
}
.team__member {
}
</style>
