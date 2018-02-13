import Settings from '../../../util/settings';

function syncSettingToStorage(settings) {
  if (chrome && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set({ settings });
  }
}

export default {
  updateIconColumn({ commit, state }, columnName) {
    commit('setIconColumn', { columnName: columnName.trim() });
    syncSettingToStorage(state);
  },
  updateIconTargetColumn({ commit, state }, columnName) {
    commit('setIconTargetColumn', { columnName: columnName.trim() });
    syncSettingToStorage(state);
  },
  updateIconReviewAgainUrl({ commit, state }, url) {
    commit('setIconReviewAgainUrl', { url: url.trim() });
    syncSettingToStorage(state);
  },
  updateIconRuleCondition({ commit, state }, { ruleIdx, hours }) {
    commit('setIconRuleHours', { ruleIdx, hours });
    syncSettingToStorage(state);
  },
  addIconRuleUrl({ commit, state }, ruleIdx) {
    commit('addIconRuleUrl', ruleIdx);
    syncSettingToStorage(state);
  },
  deleteIconRuleUrl({ commit, state }, { ruleIdx, urlIdx }) {
    commit('deleteIconRuleUrl', { ruleIdx, urlIdx });
    syncSettingToStorage(state);
  },
  updateIconRuleUrl({ commit, state }, { ruleIdx, urlIdx, url }) {
    commit('setIconRuleUrl', { ruleIdx, urlIdx, url });
    syncSettingToStorage(state);
  },
  updateIconRuleSize({ commit, state }, { ruleIdx, size }) {
    commit('setIconRuleSize', { ruleIdx, size });
    syncSettingToStorage(state);
  },
  addIconRule({ commit, state }) {
    commit('addIconRule');
    syncSettingToStorage(state);
  },
  deleteIconRule({ commit, state }, ruleIdx) {
    commit('deleteIconRule', ruleIdx);
    syncSettingToStorage(state);
  },

  updateAgeColumn({ commit, state }, columnName) {
    commit('setAgeColumn', { columnName: columnName.trim() });
    syncSettingToStorage(state);
  },
  updateAgeTargetColumn({ commit, state }, columnName) {
    commit('setAgeTargetColumn', { columnName: columnName.trim() });
    syncSettingToStorage(state);
  },
  updateAgeRuleCondition({ commit, state }, { ruleIdx, hours }) {
    commit('setAgeRuleHours', { ruleIdx, hours });
    syncSettingToStorage(state);
  },
  updateAgeRuleColor({ commit, state }, { ruleIdx, color }) {
    commit('setAgeRuleColor', { ruleIdx, color });
    syncSettingToStorage(state);
  },
  addAgeRule({ commit, state }) {
    commit('addAgeRule');
    syncSettingToStorage(state);
  },
  deleteAgeRule({ commit, state }, ruleIdx) {
    commit('deleteAgeRule', ruleIdx);
    syncSettingToStorage(state);
  },

  reset({ commit, state }) {
    commit('resetSettings');
    syncSettingToStorage(state);
  },
  loadSettings({ commit }) {
    Settings.loadSettings()
      .then((settings) => {
        commit('setSettings', settings);
      });
  },
};
