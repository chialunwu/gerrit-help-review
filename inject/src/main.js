/* eslint-disable no-underscore-dangle */
import Core from './core';

// Monkey patch XMLHttpRequest to intercept the gerrit API response
const XHR = XMLHttpRequest.prototype;
const { open: oriOepn, send: oriSend } = XHR;

XHR.open = function open(method, url) {
  this._url = url;

  return oriOepn.apply(this, arguments); // eslint-disable-line prefer-rest-params
};

XHR.send = function send() {
  this.addEventListener('load', function xhrLoad() {
    try {
      if (
        (this._url.indexOf('/gerrit/changes/') >= 0) &&
        (this._url.search(/\/\d+\//) === -1) &&
        (this._url.search(/change:/) === -1) &&
        (document.getElementsByClassName('com-google-gerrit-client-change-FileTable-FileTableCss-table').length === 0)
      ) {
        // Only run in the review listing page
        const settings = window.gerritHelpReviewSettings;
        const apiData = JSON.parse(this.responseText.split('\n')[1]);

        if (!settings) {
          const interval = setInterval(() => {
            if (window.gerritHelpReviewSettings) {
              clearInterval(interval);
              Core.insert(apiData, window.gerritHelpReviewSettings);
            }
          }, 100);
        } else {
          Core.insert(apiData, settings);
        }
      }
    } catch (err) {
      // ignore error
    }
  });

  return oriSend.apply(this, arguments); // eslint-disable-line prefer-rest-params
};
