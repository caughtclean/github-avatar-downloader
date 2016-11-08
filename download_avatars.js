// installed the request files and plug them in here and make a var
var GITHUB_USER = 'caughtclean';
var GITHUB_TOKEN = '54b30d40e3b526a09e4ebcad385973156e3ca66c';
var request = require('request');
var fs = require('fs');
// added options to input arguments from node to download any users avatar
var repoowner = process.argv[2]
var reponame = process.argv[3]

console.log('Welcome to the GitHub Avatar Downloader!');
// this function will pull the Repo contributors
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // added var options to add user agent header and url
  var options = {
      url: requestURL,
      headers: {
        'User-Agent': 'GitHub Avatar Downloader - Student Project',
      }
    }
    // parsing the raw JSON string into a array of objects we can deal with
  request(options, function(err, response, body) {
    if (err) throw err;
    jobj = JSON.parse(body)
    cb(jobj)

  });

};



getRepoContributors(repoowner, reponame, function(results) {
  // lopping through the array of objs to select only the avatar urls
  results.forEach(function(result) {
    downloadImageByURL(result.avatar_url, result.login);
  });
  // function that intiated request to download a file at a certain path (called on by arguments)
  function downloadImageByURL(url, filePath) {
    request(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
  }

});