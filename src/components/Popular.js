var React = require('react');
var api = require("../utils/api");
  

function SelectedLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return(
    <ul className="languages">
      {languages.map(function(lang){
       return (
          <li style= {props.selectedLanguage === lang ? {color: 'orange'} : null}
              onClick={props.onSelect.bind(null, lang)}
              key={lang} >
            {lang}
          </li>
        )
    })}
    </ul>
  )
}

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo,index) {
       return(
         <div key={index}>
         <li className="popular-item">
         <span className="item-index">#{index+1}</span> <br />
         <img className="item-img" src={repo.owner.avatar_url} /> <br />
         <a href={repo.html_url}>{repo.name}</a> <br />
         <span>{repo.stargazers_count} stars</span>
         </li>
         </div>
       )
      })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang, 
        repos: null
      }
    });
    
    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render(){
    return(
      <div>
      <SelectedLanguage onSelect={this.updateLanguage} selectedLanguage={this.state.selectedLanguage} />
      {!this.state.repos 
        ? <p>LOADING</p> 
        : <RepoGrid repos={this.state.repos} />}
      
      </div>
    )
  }
}

module.exports = Popular;
