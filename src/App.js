import React, { Component } from 'react';
import {Link} from 'react-router';

class App extends Component {
	render(){
		return(
			<div>
				<ul className="navigation">
					<li className="nav-item"><Link to="/">Home</Link></li>
					<li className="nav-item"><Link to="/autor">Autor</Link></li>
					<li className="nav-item"><Link to="/livro">Livro</Link></li>
				</ul>

				<input type="checkbox" id="nav-trigger" className="nav-trigger" />
				<label htmlFor="nav-trigger"></label>

				<div className="site-wrap">
					{this.props.children}
				</div>
			</div>
			);
	}
}

export default App;