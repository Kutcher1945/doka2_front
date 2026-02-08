<template lang="pug">
  .cabinet
    Nuxt()
</template>

<style lang="scss" scoped>
.cabinet {
  //font-family: 'Gotham Pro', sans-serif;

  background: radial-gradient(61.2% 109.21% at 100.59% 100%, rgba(117, 79, 224, 0.23) 0%, rgba(30, 30, 32, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #1E1E20;

  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  padding: 2.4rem;

  @media screen and (max-width: 767px) {
    padding: 1.6rem;
  }
}
</style>
