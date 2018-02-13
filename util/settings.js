import cloneDeep from 'lodash/cloneDeep';

import defaultSettings from '../default-settings.json';

function loadSettings() {
  return new Promise((resolve, reject) => {
    if (!chrome || !chrome.storage || !chrome.storage.sync) {
      resolve(cloneDeep(defaultSettings));
    } else {
      chrome.storage.sync.get('settings', ({ settings }) => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message));
        }

        try {
          if (!settings) {
            // Save default values
            chrome.storage.sync.set({ settings: defaultSettings });
          }

          return resolve(cloneDeep(settings || defaultSettings));
        } catch (err) {
          return reject(err);
        }
      });
    }
  });
}

export default {
  loadSettings,
};
