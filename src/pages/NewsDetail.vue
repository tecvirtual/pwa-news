<template>
  <q-page padding>
    <q-btn class="fabR fixed" round color="secondary" icon="arrow_back" @click.native="$router.back()" />
    <new-detail :single-new="$store.state.news.singleNew" />
  </q-page>
</template>

<script>
import NewDetail from '../components/News/NewDetail'
export default {
  name: 'NewsDetailPage',
  components: {
    NewDetail
  }
}
</script>

<style>
</style>
