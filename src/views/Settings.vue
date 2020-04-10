<template>
  <div id="settings">
    <Form
      class="form"
      :rule_list="rules"
    >
      <TextField
        :class="[
          'form-field',
        ]"
        label="First Name"
        v-model.trim="firstName"
        outlined
        :rules="rules.firstName"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="Last Name"
        v-model.trim="lastName"
        outlined
        :rules="rules.lastName"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="Age"
        v-model.trim="age"
        outlined
        :rules="rules.age"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="E-mail"
        v-model.trim="mail"
        outlined
        :rules="rules.mail"
      />
      <Options
        :class="[
          'form-field',
        ]"
        label="Gender"
        v-model="gender"
        :options="['male', 'female', 'bisexual']"
        :rules="rules.gender"
      />
      <Options
        :class="[
          'form-field',
        ]"
        label="Preferences"
        v-model="preferences"
        many
        :options="['male', 'female', 'bisexual']"
        :rules="rules.preferences"
      />
      <TextField
        :class="[
          'form-field',
          'textarea',
        ]"
        label="Biography"
        v-model.trim="biography"
        outlined
        many
        :rules="rules.biography"
      />
      <TagsField
        :class="[
          'form-field',
        ]"
        label="New tag"
        v-model.trim="tags"
        outlined
        v-model="tags"
        :rules="rules.tags"
        :maxTags="5"
      />
      <ImagesField
        :class="[
          'form-field',
          'images',
        ]"
        label="Images"
        v-model="images"
        :rules="rules.images"
      />
      <MapField
        :class="[
          'form-field',
          'map',
        ]"
        label="Location"
        @click="location = $event"
        :value="location"
      />
      <div class="form-actions">
        <span
          :class="[
            'btn',
            {
              disabled: !rules.valid,
            }
          ]"
          @click.prevent="saveChanges"
        >
          Save changes
        </span>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import MapField from '@/components/MapField.vue';
import ImagesField from '@/components/ImagesField.vue';
import TagsField from '@/components/TagsField.vue';
import TextField from '@/components/TextField.vue';
import Options from '@/components/Options.vue';
import Form from '@/components/Form.vue';

export default {
  name: 'settings',
  components: {
    MapField,
    ImagesField,
    TagsField,
    TextField,
    Options,
    Form,
  },
  data: () => ({
    newTag: null,
    rules: {
      firstName: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      lastName: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
        (value) => (value && value.length <= 10) || 'Max 10 characters',
      ],
      age: [
        (value) => !!value || 'Required',
        (value) => (value && Number.isInteger(+value)) || 'Age must be integer',
        (value) => (value && value >= 18) || 'Min 18 years old',
        (value) => (value && value <= 99) || 'Max 99 years old',
      ],
      mail: [
        (value) => !!value || 'Required',
        (value) => value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted',
      ],
      gender: [
        (value) => !!value || 'Required',
      ],
      preferences: [
        (value) => !!value.length || 'Required',
      ],
      biography: [
        (value) => !!value || 'Required',
        (value) => (value && value.length >= 1) || 'Min 1 characters',
        (value) => (value && value.length <= 2048) || 'Max 2048 characters',
      ],
      tags: [
        (value) => !!value.length || 'Required',
        (value) => {
          if (value.length > 5) value.splice(5);
          return true;
        },
      ],
      images: [
        (value) => !!value.length || 'Required',
        (value) => {
          if (value.length > 5) value.splice(5);
          return true;
        },
      ],
    },
  }),
  computed: {
    firstName: {
      get() { return this.getFirstName; },
      set(val) { this.setValue({ key: 'firstName', val }); },
    },
    lastName: {
      get() { return this.getLastName; },
      set(val) { this.setValue({ key: 'lastName', val }); },
    },
    age: {
      get() { return this.getAge; },
      set(val) { this.setValue({ key: 'age', val }); },
    },
    mail: {
      get() { return this.getMail; },
      set(val) { this.setValue({ key: 'mail', val }); },
    },
    gender: {
      get() { return this.getGender; },
      set(val) { this.setValue({ key: 'gender', val }); },
    },
    preferences: {
      get() { return this.getPreferences; },
      set(val) { this.setValue({ key: 'preferences', val }); },
    },
    biography: {
      get() { return this.getBiography; },
      set(val) { this.setValue({ key: 'biography', val }); },
    },
    tags: {
      get() { return this.getTags; },
      set(val) { this.setValue({ key: 'tags', val }); },
    },
    images: {
      get() { return this.getImages; },
      set(val) { this.setValue({ key: 'images', val }); },
    },
    location: {
      get() { return this.getLocation; },
      set(e) {
        this.setValue({ key: 'location', val: e.get('coords') });
      },
    },
    ...mapGetters({
      user: 'user/USER',
      getFirstName: 'user/FIRST_NAME',
      getLastName: 'user/LAST_NAME',
      getAge: 'user/AGE',
      getMail: 'user/MAIL',
      getGender: 'user/GENDER',
      getPreferences: 'user/PREFERENCES',
      getBiography: 'user/BIOGRAPHY',
      getTags: 'user/TAGS',
      getImages: 'user/IMAGES',
      getLocation: 'user/LOCATION',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'user/SET_VALUE',
    }),
    ...mapActions({
      saveChanges: 'user/SAVE_CHANGES',
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

#settings {
  padding: 0 10px;
  .form {
    margin: 50px 0;
    display: flex;
    flex-wrap: wrap;
    .form-field {
      min-width: 300px;
      width: 40%;
      margin-right: 9%;
    }
    .map,
    .images,
    .textarea,
    .form-actions {
      width: 100%;
    }
    @media (max-width: $mobile-breakpoint) {
      .btn {
        width: 100%;
      }
    }
  }
}

</style>
