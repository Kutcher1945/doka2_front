<template lang="pug">
  .settings__section
    h4.settings__title Личные данные
    // Username form
    .settings__field
      FieldUsername
    .settings__field
      FieldCodeConfirm(
        :changing-value="$auth.user.phone_number"
        changing-value-name="phone"
        label="Номер телефона"
      )
    .settings__field
      FieldCodeConfirm(
        :changing-value="$auth.user.email"
        changing-value-name="email"
        label="E-Mail"
      )
    h4.settings__title.settings__title_margin_4 Пароль
    // Password change
    FieldPassword()
</template>

<script>
import Integration from '@/components/Profile/Integration.vue'
import FieldUsername from '@/components/Profile/FieldUsername'
import FieldCodeConfirm from '@/components/Profile/FieldCodeConfirm'
import FieldPassword from '@/components/Profile/FieldPassword'

export default {
  name: 'PersonalSettings',
  components: {
    FieldPassword,
    FieldCodeConfirm,
    FieldUsername,
    Integration
  }
}
</script>

<style lang="scss">
.settings__title {
  font-weight: 350;
  font-variation-settings: 'wght' 350;
  font-size: 1.3rem;
  line-height: 135.2%;
  letter-spacing: 0.03rem;
  color: #fff;

  margin-bottom: 2rem;

  &_margin_4 {
    margin-bottom: .4rem;
  }
}
.settings__field {
  margin-bottom: 1.2rem;
}
</style>
