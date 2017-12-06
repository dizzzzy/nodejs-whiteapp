import React, { Component } from 'react'
// import * as actions from "../actions/index"
import { connect } from 'react-redux'
import {Dropdown} from 'react-materialize'
import {Link} from 'react-router-dom'

// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

class Header extends Component{

    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (<ul className="right"><li><a href="/auth/google">Login with Google</a></li></ul>);
            default:
                //return (<ul className="right"><li><a href="/api/logout">Logout</a></li></ul>);
                const data = (
                    <span>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to={this.props.auth ? '/search':'/'}><i className="material-icons">search</i></Link></li>
                            <li><Link to={this.props.auth ? '/classes':'/'}><i className="material-icons">view_module</i></Link></li>
                           <Dropdown options={{belowOrigin: true, hover: true}} className="fit-width" trigger={
                               <li className="dropdown">
                               <a className='dropdown-button' href='/#'>
                                   <i className="material-icons">person</i>
                               </a>
                               </li>}>
                               <li><Link to={this.props.auth ? '/profile' : '/'}>My Profile</Link></li>
                               <li><Link to={this.props.auth ? '/classes':'/'}>My Documents</Link></li>
                               <li className="divider"></li>
                               <li><a href="/api/logout">Logout</a></li>
                           </Dropdown>
                        </ul>
                    </span>);
                return data;
        }

    }

    render(){
        console.log('props', this.props);
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">
                        <i className="material-icons logo">landscape</i>
                        Hitch hiker's guide to learning
                    </a>
                    {this.renderContent()}

                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return {auth: state.auth};
}

export default connect(mapStateToProps)(Header);


/*<nav>
    <div className="nav-wrapper">
        <a href="#!" className="brand-logo"><i className="material-icons logo">landscape</i>Hitch hiker's guide to learning</a>
        <ul className="right hide-on-med-and-down">
            <li><a href="sass.html"><i className="material-icons">search</i></a></li>
            <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
            <li>
                <a className='dropdown-button' data-beloworigin="true" href='/#' data-activates='dropdown1'>
                    <i className="material-icons">person</i>
                </a>
            </li>
        </ul>
        <ul id="dropdown1" className="dropdown-content">
            <li><a href="/#">My Profile</a></li>
            <li><a href="/#">My Documents</a></li>
            <li className="divider"></li>
            <li>{this.renderContent()}</li>
        </ul>
    </div>
</nav>*/

/*<span>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                            <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                            <li className="dropdown">
                                <a className='dropdown-button' href='/#'>
                                    <i className="material-icons">person</i>
                                </a>
                            </li>
                        </ul>
                        <ul id="dropdown1" className="dropdown-content">
                            <li><a href="/#">My Profile</a></li>
                            <li><a href="/#">My Documents</a></li>
                            <li className="divider"></li>
                            <li><a href="/api/logout">Logout</a></li>
                        </ul>
                    </span>*/