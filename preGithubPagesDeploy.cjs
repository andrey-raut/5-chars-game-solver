const fs = require('fs');

const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const repositoryName = packageJSON.homepage.split('/').pop();

const HTML_FILE_LOCATION = 'build/index.html';
const indexHTML = fs.readFileSync(HTML_FILE_LOCATION, 'utf8');

const formattedIndexHTML = indexHTML.replace(/(href|src)="\//g, (match) => {
  return `${match}${repositoryName}/`;
});

fs.writeFileSync(HTML_FILE_LOCATION, formattedIndexHTML);
