<template>
  <div class="login">
    <h1>This is settings page</h1>
    <TextField :label="label" v-model="value" filled :rules="rules"/>
    <TextField :label="label" v-model="value"/>
    <TextField :label="label" v-model="value" rounded outlined filled/>
    <TextField :label="label" v-model="value" rounded/>
    <TextField :label="label" v-model="value" outlined filled/>
  </div>
</template>

<script>
// @ is an alias to /src
import TextField from '@/components/TextField.vue';

export default {
  name: 'Login',
  components: {
    TextField,
  },
  data: () => ({
    label: 'label',
    value: '',
    rules: [
      (value) => !!value || 'Requireds.',
      (value) => (value && value.length >= 3) || 'Min 3 characters',
    ],
  }),
};
</script>
