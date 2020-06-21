<template>
  <div>

    <q-field
      icon="perm_identity"
      :helper="$t('display_name_help')"
    >
      <q-input
        v-model="register.displayName"
        :float-label="$t('display_name')"
        @blur="$v.register.displayName.$touch"
        @keyup.enter="submit"
        :error="$v.register.displayName.$error"
      />
    </q-field>

    <q-field
      icon="perm_identity"
      :helper="$t('email_help')"
    >
      <q-input
        v-model="register.email"
        :float-label="$t('email')"
        @blur="$v.register.email.$touch"
        @keyup.enter="submit"
        :error="$v.register.email.$error"
      />
    </q-field>

    <q-field
      icon="enhanced_encryption"
      :helper="$t('password_help')"
    >
      <q-input
        type="password"
        v-model="register.password"
        :float-label="$t('password')"
        @blur="$v.register.password.$touch"
        @keyup.enter="submit"
        :error="$v.register.password.$error"
      />
    </q-field>

    <q-btn
      class="q-mt-lg full-width"
      color="secondary"
      icon-right="send"
      :label="$t('register_button')"
      @click.native="submit"
    />

  </div>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'
  export default {
    name: 'RegisterFormComponent',
    data () {
      return {
        register: {
          displayName: '',
          email: '',
          password: ''
        }
      }
    },
    validations: {
      register: {
        displayName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    methods: {
      submit () {
        this.$v.register.$touch()
        if (this.$v.register.$error) {
          this.$q.notify({
            message: 'Error validando el formulario',
            position: 'top',
            type: 'negative'
          })
        } else {
          this.$emit('onRegister', this.register)
        }
      }
    }
  }
</script>
