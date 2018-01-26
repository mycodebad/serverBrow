/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Item.scss';

class Item extends Component {
  constructor (props) {
    super(props);
    this.state = {
      type: this.props.type,
      line: this.props.line,
      nameFile: this.props.nameFile,
      content: this.props.content
    }
  }
  render() {
    let { type, line, nameFile, content } = this.state;
    return (
      <div className="containerItem">
        <div className="item">
          <div className="row">
            <div className="col-1 date-holder text-center">
              <div className="icon"><i className="fa fa-code" /></div>
              <div className="date">
                <span>{line}</span> <br />
                <span className="text-info">{nameFile}</span>
              </div>
            </div>
            <div className="col-11 content">
              <h5>{type}</h5>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  type: PropTypes.string,
  line: PropTypes.number,
  content: PropTypes.string
};


Item.defaultProps = {
  type: 'Info',
  line: 250,
  nameFile: 'app.js',
  content: 'Now that we know who you are, I know who I am. I\'m not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain\'s going to be? He\'s the exact opposite of the hero. And most times they\'re friends, like you and me! I should\'ve known way back when... You know why, David? Because of the kids. They called me Mr Glass.'
};

export default Item;
