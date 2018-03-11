var React = require('react');
var Popular = require('./Popular');
var Battle = require('./Battle');

class App extends React.Component {
  render() {
    return (
      <div className='container'>
//       <Popular />
        <Battle />
      </div>
    )
  }
}

module.exports = App;
