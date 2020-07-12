<template>
  <div class="login">
    <Form
      class="form"
      v-if="status==='login'"
      key="login"
    >
      <h2>
        Login
      </h2>
      <TextField
        label="Login"
        v-model="userLogin"
        rounded
        filled
      />
      <TextField
        label="Password"
        v-model="passLogin"
        rounded
        filled
      />
      <div class="form-actions">
        <a
          :class="[
            'link',
          ]"
          @click="status='registration'"
        >
          Registration
        </a>
        <a
          :class="[
            'link',
          ]"
        >
          Forget password
        </a>
        <span
          class="btn"
          @click.prevent="signIn({ userLogin, passLogin })"
        >
          LogIn
        </span>
      </div>
    </Form>
    <Form
      class="form"
      v-else-if="status==='registration'"
      key="reg"
      :rule_list="rules"
    >
      <h2>
        Registration
      </h2>
      <TextField
        label="Login"
        v-model="userReg"
        rounded
        filled
        :rules="rules.userReg"
      />
      <TextField
        label="Password"
        v-model="passReg"
        rounded
        filled
        :rules="rules.passReg"
      />
      <TextField
        label="First Name"
        v-model="fnameReg"
        rounded
        filled
        :rules="rules.fnameReg"
      />
      <TextField
        label="Last Name"
        v-model="lnameReg"
        rounded
        filled
        :rules="rules.lnameReg"
      />
      <TextField
        label="E-mail"
        v-model="mailReg"
        rounded
        filled
        :rules="rules.mailReg"
      />
      <div class="form-actions">
        <a
          :class="[
            'link',
          ]"
          @click="status='login'"
        >
          Back
        </a>
        <span
          :class="[
            'btn',
            {
              disabled: !rules.valid,
            }
          ]"
          @click.prevent="signUp({
            userReg,
            passReg,
            fnameReg,
            lnameReg,
            mailReg,
            location,
           })"
        >
          SignUp
        </span>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TextField from '@/components/TextField.vue';
import Form from '@/components/Form.vue';
import GPS from '../library/geolocation';

export default {
  name: 'login',
  components: {
    TextField,
    Form,
  },
  data: () => ({
    status: 'login',
    location: '',
    userLogin: '',
    passLogin: '',
    userReg: '',
    passReg: '',
    fnameReg: '',
    lnameReg: '',
    mailReg: '',
    rules: {
      userReg: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      passReg: [
        (value) => !!value || 'Required',
      ],
      fnameReg: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      lnameReg: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      mailReg: [
        (value) => !!value || 'Required',
        (value) => value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted',
      ],
    },
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/SIGN_IN',
      signUp: 'auth/REGISTER',
    }),
  },
  mounted() {
    GPS.byGPS()
      .then((loc) => { this.location = loc; })
      .catch(() => GPS.byIP()
        .then((loc) => { this.location = loc; })
        .catch(() => ({ x: 55.7965312, y: 37.575065599999995 })));
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.form {
  width: 95%;
  max-width: 500px;
  margin: 5% auto;
  background: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px $main-color-shadow;
  .form-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
