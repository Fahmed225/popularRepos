var React = require('react');

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

class Popular extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang
      }
    })
  }

  render(){
    return(
      <SelectedLanguage onSelect={this.updateLanguage} selectedLanguage={this.state.selectedLanguage} />
    )
  }
}

module.exports = Popular;
