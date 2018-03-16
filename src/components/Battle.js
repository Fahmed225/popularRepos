var React = require('react');
var Link = require('react-router-dom').Link;

function PlayerPreview(props){
  return(
    <div className='column'>
      <img className='avatar' src={props.image} />
      <h2>@{props.name}</h2>
      <button 
      onClick={props.onReset.bind(null, props.id)}
      className='reset'
      >
        Reset
      </button>
      
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    var value = event.target.value;
    this.setState(function() {
      return {
        username: value
      }
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }
  
  render() {
    //UI with label, Field and button
    return(
      <form onSubmit={this.handleSubmit} className='column'>
        <label htmlFor='username'>{this.props.label}</label>
          <input placeholder='github username'
            type='text' autoComplete='off' id='username'
            value={this.state.username} 
            onChange={this.handleChange}
          />
          
          <button type='submit' disabled={!this.state.username}
          className='button'>
              Submit
          </button>
      </form> 
    )
  }
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      newState[id+'Name'] = username;
      newState[id+'Image']= 'https://github.com/'+username+'.png?size=200';
      return newState;
    });
  }
  
  handleReset(id) {
    this.setState(function() {
      var newState = {};
      newState[id+'Name'] = '';
      newState[id+'Image']= null;
      return newState;
    });
  }
  
  render() {
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    var match = this.props.match;
    return(
      <div className='battle'>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }
      
          {playerOneImage !== null &&
            <PlayerPreview 
              name={playerOneName}
              image={playerOneImage} 
              onReset={this.handleReset}
              id='playerOne'
            />
          }
                
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }   
      
          {playerTwoImage !== null &&
            <PlayerPreview 
              name={playerTwoName}
              image={playerTwoImage} 
              onReset={this.handleReset}
              id='playerTwo'
            />
          }
      
          {playerOneImage && playerTwoImage &&
            <Link 
              className='button row'
              to={{pathname: match.url + '/results',
                  search: `?playerOneName=` + playerOneName + `&playerTwoName=` + playerTwoName}} >
              Battle
            </Link>
          }
        </div>
      </div>
    )
  }
  
}

module.exports = Battle;