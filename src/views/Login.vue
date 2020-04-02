<template>
  <div class="login">
    <Form class="form" v-if="status==='login'" key="login">
      <h2
        :class="[
          'title',
        ]"
      >
        Login
      </h2>
      <TextField label="Login" v-model="userLogin" rounded filled />
      <TextField label="Password" v-model="passLogin"  rounded filled />
      <div class="form-actions">
        <span
          :class="[
            'link',
          ]"
          @click="status='registration'"
        >
          Registration
        </span>
        <span
          :class="[
            'link',
          ]"
        >
          Forget password
        </span>
        <span
          class="btn"
          @click.prevent="checkLogin"
        >
          LogIn
        </span>
      </div>
    </Form>
    <Form class="form" v-else-if="status==='registration'" key="reg" :rule_list="rules">
      <h2
        :class="[
          'title',
        ]"
      >
        Registration
      </h2>
      <TextField label="Login" v-model="userReg" rounded filled :rules="rules.userReg"/>
      <TextField label="Password" v-model="passReg"  rounded filled :rules="rules.passReg"/>
      <TextField label="First Name" v-model="fnameReg" rounded filled :rules="rules.fnameReg"/>
      <TextField label="Last Name" v-model="lnameReg"  rounded filled :rules="rules.lnameReg"/>
      <div class="form-actions">
        <span
          :class="[
            'link',
          ]"
          @click="status='login'"
        >
          Back
        </span>
        <span
          :class="[
            'btn',
            {
              disabled: !rules.valid,
            }
          ]"
          @click.prevent="registration"
        >
          SignUp
        </span>
      </div>
    </Form>
  </div>
</template>

<script>
import TextField from '@/components/TextField.vue';
import Form from '@/components/Form.vue';

export default {
  name: 'Login',
  components: {
    TextField,
    Form,
  },
  data: () => ({
    status: 'login',
    userLogin: '',
    passLogin: '',
    userReg: '',
    passReg: '',
    fnameReg: '',
    lnameReg: '',
    mailReg: '',
    rules: {
      userReg: [
        (value) => !!value || 'Requireds.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      passReg: [
        (value) => !!value || 'Requireds.',
      ],
      fnameReg: [
        (value) => !!value || 'Requireds.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      lnameReg: [
        (value) => !!value || 'Requireds.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
    },
  }),
  methods: {
    checkLogin() {

    },
    registration() {

    },
  },
};
</script>

<style lang="scss">
@import '@/assets/style.scss';

.form {
  width: 100%;
  max-width: 500px;
  margin: 100px auto;
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
