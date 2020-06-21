<template>
  <div>
    <q-field
      icon="perm_identity"
      :helper="$t('email_help')"
    >
      <q-input
        v-model="login.email"
        :float-label="$t('email')"
        @blur="$v.login.email.$touch"
        @keyup.enter="submit"
        :error="$v.login.email.$error"
      />
    </q-field>

    <q-field
      icon="enhanced_encryption"
      :helper="$t('password_help')"
    >
      <q-input
        type="password"
        v-model="login.password"
        :float-label="$t('password')"
        @blur="$v.login.password.$touch"
        @keyup.enter="submit"
        :error="$v.login.password.$error"
      />
    </q-field>

    <q-btn
      class="q-mt-lg full-width"
      color="secondary"
      icon-right="send"
      :label="$t('login_button')"
      @click.native="submit"
    />

  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'LoginFormComponent',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    login: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    submit () {
      this.$v.login.$touch()
      if (this.$v.login.$error) {
        this.$q.notify({
          message: 'Error validando el formulario',
          position: 'top',
          type: 'negative'
        })
      } else {
        this.$emit('onLogin', this.login)
      }
    }
  }
}
</script>
