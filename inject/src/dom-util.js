function getColumnIndex(name) {
  const tr = document.querySelector('.changeTable tr');
  const numCols = tr.children.length;
  const lastCol = (numCols - 1);

  if (!name) {
    return {
      idx: lastCol,
      found: false,
    };
  }

  for (let i = 0; i < numCols; i += 1) {
    if (tr.children[i].innerText.toLowerCase() === name.toLowerCase()) {
      return {
        idx: i,
        found: true,
      };
    }
  }

  return {
    idx: lastCol,
    found: false,
  };
}

function appendImagesToNode(node, imgUrls, size) {
  imgUrls.forEach((url) => {
    const img = document.createElement('img');

    img.setAttribute('src', url);
    img.style.height = (size || '20px');
    node.appendChild(img);
  });
}

function createTableCell() {
  const node = document.createElement('td');

  node.className = 'dataCell helpReview-td';

  return node;
}

function insertNode(node, row, index) {
  row.children[index].insertAdjacentElement('afterend', node);
}

export default {
  getColumnIndex,
  appendImagesToNode,
  createTableCell,
  insertNode,
};
