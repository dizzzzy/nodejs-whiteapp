import React, { Component } from 'react'

class Header extends Component{

    logoStyle = {
        fontSize: '40px'
    };

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo"><i className="material-icons" style={this.logoStyle} >landscape</i>Hitch Hiker's Guide to Learning</a>

                        {/*{this.state.loggedIn ? (*/}
                            <ul className="right hide-on-med-and-down">
                                <li><a href="sass.html"><i className="material-icons">search</i></a></li>
                                <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                                <li>
                                    <a className='dropdown-button' data-beloworigin="true" href='#!' data-activates='dropdown1'>
                                        <i className="material-icons">person</i>
                                    </a>
                                </li>
                            </ul>
                        {/*// ) : (
                            // <ul className="right hide-on-med-and-down">
                            //     <li><a href="/auth">Login</a></li>
                            // </ul>
                        // )}*/}
                        <ul id="dropdown1" className="dropdown-content">
                            <li><a href="/#">My Profile</a></li>
                            <li><a href="/#">My Documents</a></li>
                            <li className="divider"></li>
                            <li><a href="/#"> Logout</a></li>
                        </ul>


                </div>
            </nav>
        );
    }
}

export default Header;
