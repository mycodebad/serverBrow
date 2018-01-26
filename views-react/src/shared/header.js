/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="navbar">
          <div className="search-box">
            <button className="dismiss">
              <i className="icon-close" />
            </button>
            <form id="searchForm" role="search">
              <input type="search" placeholder="What are you looking for..." className="form-control" />
            </form>
          </div>
          <div className="container-fluid">
            <div className="navbar-holder d-flex align-items-center justify-content-between">
              <div className="navbar-header">
                <a href="index.html" className="navbar-brand">
                <div className="brand-text brand-big">
                  <span>Server </span><strong>Browser</strong>
                </div>
                <div className="brand-text brand-small"><strong>Server Browser</strong></div></a>
                  <a id="toggle-btn"  className="menu-btn active">
                    <span /><span /><span />
                  </a>
              </div>
              <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                <li className="nav-item d-flex align-items-center">
                  <a id="search" ><i className="fa fa-search" /></a>
                </li>
                <li className="nav-item">
                  <a href="https://github.com/mycodebad" className="nav-link logout">Repositorio
                    <i className="fa fa-github" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {};

export default Header;
