var axios = require('axios');
 
module.exports = {
  fetchPopularRepos: function(lang) {
    lang = (lang === "All") ? "" : lang;
    var encodedURI = window.encodeURI("https://api.github.com/search/repositories?q=+language:" + lang + "&sort=stars&order=desc");
    return axios.get(encodedURI)
    .then(function(response) {
      return response.data.items;
    });
    
  }
}