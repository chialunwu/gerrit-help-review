import Settings from '../../util/settings';

function insertScriptBySrc(src) {
  const s = document.createElement('script');

  s.src = chrome.extension.getURL(src);
  (document.head || document.documentElement).appendChild(s);
}

function insertScriptByCode(code) {
  const s = document.createElement('script');

  s.text = code;
  (document.head || document.documentElement).appendChild(s);
}

insertScriptBySrc('dist/inject/main.js');

Settings.loadSettings().then((settings) => {
  insertScriptByCode(`window.gerritHelpReviewSettings = ${JSON.stringify(settings)}`);
});
