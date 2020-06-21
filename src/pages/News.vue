<template>
  <q-page>
    <q-infinite-scroll :handler="loadMore" ref="infiniteScroll">
      <q-list dark highlight v-if="arrayNews.length">

        <q-list-header class="bg-header">{{ $t('news') }}</q-list-header>
        <new-item
          :single-new="singleNew"
          v-for="singleNew in arrayNews"
          :key="singleNew.id"
          @onForward="goNewsDetail(singleNew)"
        />
      </q-list>

      <div slot="message" class="row justify-center">
        <div class="col-auto">
          <q-spinner :size="40" color="secondary" />
        </div>
      </div>

    </q-infinite-scroll>
  </q-page>
</template>

<script>
import NewItem from '../components/News/NewItem'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'NewsPage',
  components: {
    NewItem
  },
  async mounted () {
    this.setStart(0)
    this.$q.loading.show()
    setTimeout(async () => {
      try {
        const {data} = await this.paginatedNews()
        this.setNews(data)
      } catch (e) {
        this.$q.notify({
          type: 'negative',
          message: error.response.data.message,
          position: 'bottom'
        })
      } finally {
        this.$q.loading.hide()
      }
    })
  },
  computed: {
    ...mapState('news', ['news', 'start', 'limit', 'offlineNews']),
    ...mapState('app', ['isOnline']),
    arrayNews () {
      if (this.isOnline) {
        return this.news
      }
      return this.offlineNews
    }
  },
  watch: {
    isOnline (val) {
      if (val) {
        this.$refs.infiniteScroll.resume()
      }
    }
  },
  methods: {
    ...mapActions('news', ['paginatedNews']),
    ...mapMutations('news', ['setNews', 'setSingleNew', 'setStart', 'setOfflineNews']),
    loadMore (index, done) {
      this.setStart(this.news.length)
      if (this.isOnline) {
        setTimeout(() => {
          this.paginatedNews().then(news => {
            this.setNews(news.data)
            if ( ! news.data.length) {
              done(true)
            } else {
              done()
            }
          })
        }, 3000)
      } else {
        setTimeout(() => {
          done(true)
        }, 1500)
      }
    },
    goNewsDetail (singleNew) {
      this.setSingleNew(singleNew)
      this.$router.push({name: 'news-detail', params: {id: singleNew.id}})
    }
  }
}
</script>

<style lang="stylus">
  .dark
    background-color darkslategrey
    color: #fff

  .bg-header
    background-color crimson
    color: #000000

  .q-list
    padding 0 !important

  .q-item
    border-bottom 1px solid white
</style>
