var axios = require('axios');

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username)
    .then(function (user) {
      console.log('2. From getProfile: '+user);
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/'+ username + '/repos')
    .then(function (repos) {
      console.log('3. From getRepos: '+ repos)
      return repos;
    });
}

function getStarCount (repos) {
  var stars = repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count; 
  },0);
  
  return stars;
}

function calculateScores (profile, repos) {
  console.log('4. From CalculateScores: '+ profile+ ' and repos: ' + repos)
  var followers = profile.followers;
  var stars = getStarCount(repos);
  
  return (followers * 3) + stars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData (player) {
  console.log('1. from getUserData ' + player);
  return axios.all([getProfile(player), getRepos(player)])
    .then(function (data) {
      var profile = data[0];
      console.log(data);
      var score = calculateScores(profile, data[1]);
    
      return {
        profile: profile,
        score: score
      }
    })
}

function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}


module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  
  fetchPopularRepos: function (lang) {
    lang = (lang === "All") ? "" : lang;
    var encodedURI = window.encodeURI("https://api.github.com/search/repositories?q=+language:" + 
      lang + 
      "&sort=stars&order=desc");
    return axios.get(encodedURI)
    .then(function (response) {
      return response.data.items;
    });
  }
}