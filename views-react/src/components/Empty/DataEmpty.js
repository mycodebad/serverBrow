/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 */

import React from "react";
import "./DataEmpty.scss";

const DataEmpty = () => {
  return (
    <div className="containerDataEmpty">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>Data Empty</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEmpty;
