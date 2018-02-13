import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import cloneDeep from 'lodash/cloneDeep';

import actions from './actions';
import mutations from './mutations';
import defaultSettings from '../../../default-settings.json';

Vue.use(Vuex);

const debug = (process.env.NODE_ENV !== 'production');

export default new Vuex.Store({
  state: cloneDeep(defaultSettings),
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
