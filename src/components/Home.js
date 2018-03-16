var React = require('react');
var Link = require('react-router-dom').Link;

function Home() {
  return(
    <div>
      <h1>Discover the hottest programming trends and see where you stand against your programmer friends...</h1>
      <div className="home column">
        <Link to='/popular'>See most popular repos</Link>
        <Link to='/battle'>Battle your programmer friend</Link>
      </div>
    </div> 
  )
}

module.exports = Home;