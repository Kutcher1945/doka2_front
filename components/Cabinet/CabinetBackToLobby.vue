<template>
  <NuxtLink
    v-if="
      typeof GET_CURRENT_LOBBY === 'object' &&
        GET_CURRENT_LOBBY !== null
    "
    class="button-mode-3 button-mode-3_highlighted lobby-return"
    :to="`/cabinet/lobby/${GET_CURRENT_LOBBY.id}`"
  >
    <svg-icon name="redesign/return" class="button-mode-3__icon" />
    Вернуться в лобби
  </NuxtLink>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CabinetBackToLobby',
  computed: {
    ...mapGetters(['GET_CURRENT_LOBBY'])
  }
}
</script>
