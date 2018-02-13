import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';

import defaultSettings from '../../../default-settings.json';

export default {
  setIconColumn(state, { columnName }) {
    state.helpReviewIcons.column = columnName;
  },
  setIconTargetColumn(state, { columnName }) {
    state.helpReviewIcons.target = columnName;
  },
  setIconReviewAgainUrl(state, { url }) {
    state.helpReviewIcons.reviewAgainUrl = url;
  },
  setIconRuleHours(state, { ruleIdx, hours }) {
    state.helpReviewIcons.rules[ruleIdx].hours = hours;
  },
  setIconRuleUrl(state, { ruleIdx, urlIdx, url }) {
    Vue.set(state.helpReviewIcons.rules[ruleIdx].urls, urlIdx, url);
  },
  addIconRuleUrl(state, ruleIdx) {
    state.helpReviewIcons.rules[ruleIdx].urls.push('');
  },
  deleteIconRuleUrl(state, { ruleIdx, urlIdx }) {
    state.helpReviewIcons.rules[ruleIdx].urls.splice(urlIdx, 1);
  },
  setIconRuleSize(state, { ruleIdx, size }) {
    state.helpReviewIcons.rules[ruleIdx].iconSize = size;
  },
  addIconRule(state) {
    const idx = state.helpReviewIcons.rules.length - 1;

    state.helpReviewIcons.rules.splice(idx, 0, {
      hours: 0,
      urls: [null],
    });
  },
  deleteIconRule(state, ruleIdx) {
    state.helpReviewIcons.rules.splice(ruleIdx, 1);
  },

  setAgeColumn(state, { columnName }) {
    state.age.column = columnName;
  },
  setAgeTargetColumn(state, { columnName }) {
    state.age.target = columnName;
  },
  setAgeRuleHours(state, { ruleIdx, hours }) {
    state.age.rules[ruleIdx].hours = hours;
  },
  setAgeRuleColor(state, { ruleIdx, color }) {
    state.age.rules[ruleIdx].color = color;
  },
  addAgeRule(state) {
    const idx = state.age.rules.length - 1;

    state.age.rules.splice(idx, 0, {
      hours: 0,
      color: '',
    });
  },
  deleteAgeRule(state, ruleIdx) {
    state.age.rules.splice(ruleIdx, 1);
  },

  resetSettings(state) {
    const newSettings = cloneDeep(defaultSettings);

    Object.keys(newSettings).forEach((key) => {
      Vue.set(state, key, newSettings[key]);
    });
  },
  setSettings(state, settings) {
    Object.keys(settings).forEach((key) => {
      Vue.set(state, key, settings[key]);
    });
  },
};
