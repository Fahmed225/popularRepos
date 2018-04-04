var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');

class Results extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    
    api.battle([players.playerOneName, players.playerTwoName])
      .then(function (results) {
        if (results === null) {
          return this.setState(function() {
            return {
              error: 'Looks like there was an error. Check that both users exist.',
              loading: false
            }
          });
        }
      
      this.setState(function {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this));
    
  }
  render() {
    return(
      <div>Results</div>
    )
  }  
}

module.exports = Results;