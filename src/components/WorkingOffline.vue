<template>
  <div
    v-if="!isOnline"
    class="q-pa-sm bg-negative text-white round-borders row flex-center"
  >
    {{ $t('working_offline') }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WorkingOfflineComponent',
  computed: {
    ...mapState('app', ['isOnline'])
  }
}
</script>

<style>
</style>
