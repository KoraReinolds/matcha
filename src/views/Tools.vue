<template>
  <div
    v-if="tools"
    :class="[
      'tools_box',
      {
        hide: !show,
      }
    ]"
  >
    <RoundedIcon
      :class="[
        'icon',
        'close'
      ]"
      :icon="show ? 'times' : 'cog'"
      @click="show=!show"
      :size="3"
    />
    <div
      v-if="show"
      :class="[
        'tools',
      ]"
    >

      <Options
        :class="[
          'form-field',
          'pref',
        ]"
        :icons="{
          male: 'mars',
          female: 'venus',
          bisexual: 'transgender',
        }"
        label="Preferences"
        v-model="pref"
        many
        :options="['male', 'female', 'bisexual']"
      />

      <TextField
        :class="[
          'form-field',
        ]"
        label="Max_age"
        @blur="setFilter({ val: $event.target.value, key: 'minAge' })"
        v-model="tools.maxAge"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="Min_age"
        @blur="setFilter({ val: $event.target.value, key: 'minAge' })"
        v-model="tools.minAge"
      />

      <TextField
        :class="[
          'form-field',
        ]"
        label="Min_dist"
        @blur="setFilter({ val: $event.target.value, key: 'minDist' })"
        v-model="tools.maxDist"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="Max_dist"
        @blur="setFilter({ val: $event.target.value, key: 'maxDist' })"
        v-model="tools.minDist"
      />

      <TextField
        :class="[
          'form-field',
        ]"
        label="Max_rate"
        @blur="setFilter({ val: $event.target.value, key: 'maxRate' })"
        v-model="tools.maxRate"
      />
      <TextField
        :class="[
          'form-field',
        ]"
        label="Min_rate"
        @blur="setFilter({ val: $event.target.value, key: 'minRate' })"
        v-model="tools.minRate"
      />

      <TagsField
        :class="[
          'form-field',
          'tags',
        ]"
        label="Tags"
        v-model="tools.tags"
        :maxTags="5"
        @blur="addTag(newTag)"
      />

      <!-- <div class="field">
        <span class="title" for="maxRate">Tags</span>
        <input class="value tags" @blur="addTag(newTag); newTag=''" v-model.trim="newTag"
          placeholder="Input new tag"/>
      </div>
      <div class="tag_list">
        <span v-for="(tag, index) in tools.tags" :key="tag"
          @click="deleteTag(index)" class="tag">#{{ tag }}
        </span>
      </div> -->

      <Options
        :class="[
          'form-field',
        ]"
        :icons="{
          dist: 'sort-amount-down-alt',
          dist_rev: 'sort-amount-down',
        }"
        label="Dist"
        v-model="sortList"
        many
        :options="['dist', 'dist_rev']"
      />

      <!-- <div class="section_title">Sort by</div><hr>

      <div class="field sort">
        <span class="title">Distance</span>
        <label for="dist"><font-awesome-icon :class="['icon', {
            active: sortList.includes('dist')
          }]" icon="sort-amount-down-alt" /></label>
        <input id="dist" class="value" type="checkbox" value="dist" v-model="sortList">
        <label for="dist_rev"><font-awesome-icon :class="['icon', {
            active: sortList.includes('dist_rev')
          }]" icon="sort-amount-down" /></label>
        <input id="dist_rev" class="value" type="checkbox" value="dist_rev" v-model="sortList">
      </div> -->

      <Options
        :class="[
          'form-field',
        ]"
        :icons="{
          age: 'sort-amount-down-alt',
          age_rev: 'sort-amount-down',
        }"
        label="Age"
        v-model="sortList"
        many
        :options="['age', 'age_rev']"
      />

      <!-- <div class="field sort">
        <span class="title">Age</span>
        <label for="age"><font-awesome-icon :class="['icon', {
            active: sortList.includes('age')
          }]" icon="sort-amount-down-alt" /></label>
        <input id="age" class="value" type="checkbox" value="age" v-model="sortList">
        <label for="age_rev"><font-awesome-icon :class="['icon', {
            active: sortList.includes('age_rev')
          }]" icon="sort-amount-down" /></label>
        <input id="age_rev" class="value" type="checkbox" value="age_rev" v-model="sortList">
      </div> -->

      <Options
        :class="[
          'form-field',
        ]"
        :icons="{
          rate: 'sort-amount-down-alt',
          rate_rev: 'sort-amount-down',
        }"
        label="Rate"
        v-model="sortList"
        many
        :options="['rate', 'rate_rev']"
      />

      <!-- <div class="field sort">
        <span class="title">Raiting</span>
        <label for="rate"><font-awesome-icon :class="['icon', {
            active: sortList.includes('rate')
          }]" icon="sort-amount-down-alt" /></label>
        <input id="rate" class="value" type="checkbox" value="rate" v-model="sortList">
        <label for="rate_rev"><font-awesome-icon :class="['icon', {
            active: sortList.includes('rate_rev')
          }]" icon="sort-amount-down" /></label>
        <input id="rate_rev" class="value" type="checkbox" value="rate_rev" v-model="sortList">
      </div> -->

      <Options
        v-if="tools.tags.length > 1"
        :class="[
          'form-field',
        ]"
        :icons="{
          tags: 'sort-amount-down-alt',
          tags_rev: 'sort-amount-down',
        }"
        label="Tags"
        v-model="sortList"
        many
        :options="['tags', 'tags_rev']"
      />

      <!-- <div class="field sort" v-if="tools.tags.length > 1">
        <span class="title">Tags</span>
        <label for="tags"><font-awesome-icon :class="['icon', {
            active: sortList.includes('tags')
          }]" icon="sort-amount-down-alt" /></label>
        <input id="tags" class="value" type="checkbox" value="tags" v-model="sortList">
        <label for="tags_rev"><font-awesome-icon :class="['icon', {
            active: sortList.includes('tags_rev')
          }]" icon="sort-amount-down" /></label>
        <input id="tags_rev" class="value" type="checkbox" value="tags_rev" v-model="sortList">
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import RoundedIcon from '@/components/RoundedIcon.vue';
import Options from '@/components/Options.vue';
import TextField from '@/components/TextField.vue';
import TagsField from '@/components/TagsField.vue';

export default {
  name: 'tools',
  data: () => ({
    show: false,
    newTag: null,
  }),
  components: {
    RoundedIcon,
    Options,
    TextField,
    TagsField,
  },
  computed: {
    pref: {
      set(value) { this.setFilter({ val: value, key: 'pref' }); },
      get() { return this.tools.pref; },
    },
    sortList: {
      set(value) { this.sort(value); },
      get() { return this.$store.getters['tools/SORT_LIST']; },
    },
    ...mapGetters({
      tools: 'tools/TOOLS',
    }),
  },
  methods: {
    deleteTag(index) {
      this.tools.tags.splice(index, 1);
      this.filterUsers();
    },
    ...mapMutations({
      sort: 'tools/SORT',
      setValue: 'SET_VALUE',
      toggleSortOrder: 'tools/TOGGLE_SORT_ORDER',
      filterUsers: 'tools/FILTER_USERS',
    }),
    ...mapActions({
      addTag: 'tools/ADD_TAG',
      setFilter: 'tools/SET_FILTER',
    }),
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/style.scss';

.tools_box {
  position: relative;
  background-color: rgba($color: $main-color-light, $alpha: 0.9);
  border-radius: 30px;
  width: 260px;
  margin: 0 auto;
  height: calc(100% - 120px);
  display: flex;
  flex-direction: column;
  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
  .close {
    position: absolute;
    color: $main-color;
    top: 10px;
    left: 10px;
    z-index: 2;
  }
  .tools {
    @media (max-width: 480px) {
      height: 100%;
      overflow: auto;
    }
    @media (min-width: 480px) {
      width: 260px;
    }
    margin-top: 70px;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .form-field {
      width: 45%;
      &.pref,
      &.tags {
        width: 100%
      }
    }
  }
  &.hide {
    height: 0;
  }
}
</style>
