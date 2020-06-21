<template>
  <q-layout view="lHh Lpr lFf" v-if="isMobile">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          v-if="isLogged"
        >
          <q-icon name="menu"></q-icon>
        </q-btn>

        <q-toolbar-title>
         Vue PWA News APP
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn
          v-for="lang in languages"
          flat
          round
          :disable="lang.key !== language"
          :key="lang.key"
          dense
          icon="language"
          color="dark"
          @click.native="setLanguage(lang.key)"
        >
          {{ lang.label }}
        </q-btn>

      </q-toolbar>

      <working-offline />

    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      v-if="isLogged"
    >

      <q-list
        no-border
        link
        inset-delimiter
      >

        <q-list-header>
          {{ $t('welcome_user', {name: user.displayName}) }}
        </q-list-header>

        <q-item @click.native="$router.push('/news')">
          <q-item-side icon="burst_mode" />
          <q-item-main :label="$t('news')" />
          <q-item-side right icon="subdirectory_arrow_right" />
        </q-item>

        <q-item @click.native="logout">
          <q-item-side icon="account_circle" />
          <q-item-main :label="$t('logout')" />
          <q-item-side right icon="subdirectory_arrow_right" />
        </q-item>

      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-layout-footer>
      <q-tabs v-if="!isLogged">
        <q-route-tab
          default
          icon="home"
          to="/"
          name="home"
          slot="title"
        />
        <q-route-tab
          icon="input"
          to="/login"
          name="login"
          slot="title"
        />
        <q-route-tab
          icon="account_box"
          to="/register"
          name="register"
          slot="title"
          v-if="isOnline"
        />
      </q-tabs>

      <q-tabs v-else>
        <q-route-tab
          default
          icon="home"
          to="/"
          name="home"
          slot="title"
        />
        <q-route-tab
          icon="burst_mode"
          to="/news"
          name="news"
          slot="title"
        />
      </q-tabs>
    </q-layout-footer>

  </q-layout>

  <q-layout view="lHh Lpr lFf" v-else>
    <no-mobile-device />
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapMutations } from 'vuex'
import WorkingOffline from '../components/WorkingOffline'
import NoMobileDevice from '../components/NoMobileDevice'
export default {
  name: 'MyLayout',
  components: {
    WorkingOffline, NoMobileDevice
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      isMobile: this.$q.platform.is.mobile,
    }
  },
  mounted () {
    setTimeout(() => {
      this.$i18n.locale = this.language
    }, 100)

    window.addEventListener('online', () => {
      this.setIsOnline(true)
    })

    window.addEventListener('offline', () => {
      this.setIsOnline(false)
    })
  },
  watch: {
    language (val) {
      this.$i18n.locale = val
    }
  },
  computed: {
    ...mapState('app', ['languages', 'language', 'version', 'isOnline']),
    ...mapState('auth', ['isLogged', 'user'])
  },
  methods: {
    ...mapMutations('app', ['setLanguage', 'setIsOnline']),
    ...mapMutations('auth', ['setIsLogged']),
    openURL,
    logout () {
      this.$q.loading.show()
      setTimeout(() => {
        this.setIsLogged(false)
        this.$router.push('/login')
        this.$q.loading.hide()
      }, 2000)
    }
  }
}
</script>

<style>
</style>
