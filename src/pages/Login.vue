<template>
  <q-page padding>
    <login-form @onLogin="loginApi" />
  </q-page>
</template>

<script>
import LoginForm from '../components/LoginForm'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  computed: {
    ...mapState('app', ['isOnline']),
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['login']),
    ...mapActions('news', ['allNews']),
    ...mapMutations('auth', ['setUser', 'setIsLogged']),
    ...mapMutations('news', ['setOfflineNews']),
    async loginApi (user) {
      this.$q.loading.show()
      if (this.isOnline) {
        setTimeout(async () => {
          try {
            const {data} = await this.login(user)
            this.setUser(data.user)
            this.setIsLogged(true)
            const news = await this.allNews()
            this.setOfflineNews(news.data)
            this.$q.notify({
              type: 'positive',
              message: data.res,
              position: 'top'
            })
            this.$router.push('/')
          } catch (e) {
            this.$q.notify({
              type: 'negative',
              message: e.response.data.message,
              position: 'top'
            })
          } finally {
            this.$q.loading.hide()
          }
        }, 2000)
      } else {
        setTimeout(() => {
          if (this.user) {
            if (user.email === this.user.email && user.password === this.user.password) {
              this.setIsLogged(true)
              this.$q.notify({
                type: 'positive',
                message: this.$t('login_offline_success'),
                position: 'top'
              })
              this.$router.push('/')
            } else {
              this.$q.notify({
                type: 'negative',
                message: this.$t('login_error'),
                position: 'top'
              })
            }
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Debes haber iniciado sesión la primera vez para acceder offline',
              position: 'top'
            })
          }

          this.$q.loading.hide()
        }, 2000)
      }
    }
  }
}
</script>
