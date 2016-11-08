
// installed the request files and plug them in here and make a var
var GITHUB_USER = 'caughtclean';
var GITHUB_TOKEN = '54b30d40e3b526a09e4ebcad385973156e3ca66c';
var request = require('request');
var fs = require('fs');
var repoowner = process.argv[2]
var reponame = process.argv[3]

console.log('Welcome to the GitHub Avatar Downloader!');
// this function will pull the Repo contributors
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  // added var options to add user agent header and url
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project',
    }
  }
  //
  request(options, function(err, response, body) {
    if (err) throw err;
    jobj = JSON.parse(body)
    cb(jobj)

  });

};

// vars with my username and passwords to pull API info


getRepoContributors(repoowner, reponame, function(results) {
  // lopping through the array of objs to select only the avatar urls
    results.forEach(function(result) {
    downloadImageByURL(result.avatar_url, result.login);
  });

    function downloadImageByURL(url, filePath) {
      request(url).pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}

  // mapped results to a array if needed later
  // var urls = results.map(function(result) {
  //   return result.avatar_url;
  // });

  // console.log('urls', urls);

  // console.log("Result:", jobj[0].avatar_url);
});