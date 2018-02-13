import Vue from 'vue';
import { mapState } from 'vuex';

import store from './store';

import IconSettings from './components/IconSettings.vue';
import AgeSettings from './components/AgeSettings.vue';

// eslint-disable-next-line no-new
new Vue({
  store,
  computed: mapState({
    helpReviewIconsColumn: state => state.helpReviewIcons.column,
    helpReviewIconsTarget: state => state.helpReviewIcons.target,
    helpReviewIconsRules: state => state.helpReviewIcons.rules,
    helpReviewIconsReviewAgainUrl: state => state.helpReviewIcons.reviewAgainUrl,
    ageColumn: state => state.age.column,
    ageTarget: state => state.age.target,
    ageRules: state => state.age.rules,
  }),
  methods: {
    handleReset() {
      this.$store.dispatch('reset');
    },
  },
  render() {
    const {
      helpReviewIconsColumn,
      helpReviewIconsTarget,
      helpReviewIconsRules,
      helpReviewIconsReviewAgainUrl,
      ageColumn,
      ageTarget,
      ageRules,
    } = this;

    return (
      <div>
        <IconSettings
          columnName={helpReviewIconsColumn}
          afterColumnName={helpReviewIconsTarget}
          reviewAgainUrl={helpReviewIconsReviewAgainUrl}
          rules={helpReviewIconsRules}
        />
        <AgeSettings
          columnName={ageColumn}
          afterColumnName={ageTarget}
          rules={ageRules}
        />
        <div
          class="reset"
          role="button"
          tabIndex="0"
          onClick={this.handleReset}
          onKeyPress={this.handleReset}
        >
          Reset default
        </div>
      </div>
    );
  },
}).$mount('#app');

store.dispatch('loadSettings');
