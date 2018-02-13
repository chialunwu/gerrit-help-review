import DomUtil from './dom-util';
import Util from './util';

/* eslint-disable no-underscore-dangle */

function getTargetColInfo(column, target) {
  const { idx, found } = DomUtil.getColumnIndex(column);
  let colIdx = idx;

  if (!found) {
    const { idx: targetIdx } = DomUtil.getColumnIndex(target);

    colIdx = targetIdx;
  }

  return {
    colIdx,
    isNew: !found,
  };
}

function createChangeId2DataLookup(apiRes) {
  const changeId2DataLookup = {};

  apiRes.forEach((res) => {
    if (Array.isArray(res)) {
      res.forEach((r) => {
        changeId2DataLookup[r._number] = r;
      });
    } else {
      changeId2DataLookup[res._number] = res;
    }
  });

  return changeId2DataLookup;
}

function insertNewHeader(row, name, idx) {
  const th = DomUtil.createTableCell();

  th.className = 'dataHeader';
  th.innerText = name;
  DomUtil.insertNode(th, row, idx);
}

function insertHelpReviewIcons(
  isReviewed, isMerged, hasReviews, age, rules,
  reviewAgainUrl, target, row,
) {
  const { colIdx, isNew } = target;
  const targetNode = (isNew ? DomUtil.createTableCell() : row.children[colIdx]);
  let urls;
  let iconSize;

  if (!isMerged) {
    if (isReviewed && hasReviews) {
      urls = [reviewAgainUrl];
    } else if (!isReviewed) {
      const matchRule = rules.find(rule => ((age.hours < rule.hours) || (rule.hours === null)));

      urls = (matchRule && matchRule.urls);
      iconSize = matchRule.iconSize;  // eslint-disable-line
    }
  }

  if (urls) {
    DomUtil.appendImagesToNode(targetNode, urls, iconSize);
  }

  if (isNew) {
    DomUtil.insertNode(targetNode, row, colIdx);
  }
}

function insertAge(isMerged, age, rules, target, row) {
  const { colIdx, isNew } = target;
  const targetNode = (isNew ? DomUtil.createTableCell() : row.children[colIdx]);
  const matchRule = rules.find(rule => ((age.hours < rule.hours) || (rule.hours === null)));
  const ageColor = matchRule && matchRule.color;
  let ageNode;

  if (!isMerged) {
    if (isNew) {
      ageNode = document.createElement('span');
      ageNode.style.color = ageColor;
      ageNode.innerText = age.format;
    } else {
      targetNode.style.position = 'relative';
      ageNode = document.createElement('div');
      ageNode.className = 'helpReview-age-label';
      ageNode.style.color = ageColor;
      ageNode.innerText = age.format;
    }

    targetNode.appendChild(ageNode);
  }

  if (isNew) {
    DomUtil.insertNode(targetNode, row, colIdx);
  }
}

function insert(res, settings) {
  const lookup = createChangeId2DataLookup(res);
  const rows = document.querySelectorAll('.changeTable tr');
  const numRows = rows.length;
  const idColIdx = DomUtil.getColumnIndex('id').idx;

  // WTF
  const helpSettings = settings.helpReviewIcons;
  const ageSettings = settings.age;

  const helpReviewIconsTarget = getTargetColInfo(helpSettings.column, helpSettings.target);
  const ageTarget = getTargetColInfo(ageSettings.column, ageSettings.target);
  const newCols = Number(helpReviewIconsTarget.isNew) + Number(ageTarget.isNew);

  // Adjust for correctness
  if (helpReviewIconsTarget.isNew && ageTarget.isNew) {
    if (helpSettings.column === ageSettings.column) {
      ageTarget.colIdx = helpReviewIconsTarget.colIdx + 1;
      ageTarget.isNew = false;
    } else if (helpReviewIconsTarget.colIdx <= ageTarget.colIdx) {
      ageTarget.colIdx += 1;
    }
  }

  // Add new columns
  if (helpReviewIconsTarget.isNew) {
    insertNewHeader(rows[0], helpSettings.column, helpReviewIconsTarget.colIdx);
  }
  if (ageTarget.isNew) {
    insertNewHeader(rows[0], ageSettings.column, ageTarget.colIdx);
  }

  for (let i = 1; i < numRows; i += 1) {
    const row = rows[i];
    const { children } = row;

    if (children.length === 1) {
      children[0].setAttribute('colspan', children[0].getAttribute('colspan') + newCols);
    } else {
      const changeId = parseInt(children[idColIdx].innerText, 10);
      const data = lookup[changeId];
      const isReviewed = data.reviewed;
      const isMerged = (data.status === 'MERGED') || (data.status === 'ABANDONED');

      // NOTE: The time returned by gerrit API is in UTC time
      const timezoneOffsetMs = ((new Date().getTimezoneOffset()) * 60 * 1000);
      const age = Util.getElapseTimeByMs(((new Date()).getTime() + timezoneOffsetMs) -
        (new Date(data.created)).getTime());

      // Help review icons
      insertHelpReviewIcons(
        isReviewed,
        isMerged,
        (Object.keys(data.labels['Code-Review']).length === 0),
        age,
        helpSettings.rules,
        helpSettings.reviewAgainUrl,
        helpReviewIconsTarget,
        row,
      );

      // Age
      insertAge(isMerged, age, ageSettings.rules, ageTarget, row);
    }
  }
}

export default { insert };
