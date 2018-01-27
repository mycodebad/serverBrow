/**
 * @author  Guillermo David Paredes Torrez, https://github.com/GuillermoParedes
 * @email  gdavid.ptorrez@gmail.com
 * @link    url goes here
 * @description Return data format for Item Component
 */
var _ = require('lodash');
class dataItem {
    constructor(Data) {
      this.type = Data.type;
      this.line = this.getLine(Data.line);
      this.nameFile = this.getNameFile(Data.line);
      this.content = JSON.stringify(Data.data);
    }

    /**
     * @description Return Name file logger
     * @param {*} NameFile 
     */
    getNameFile (NameFile = '') {
      let _lastElement = NameFile.split('/').pop();    
      let _nameFile = _.head(_lastElement.split(':'));
      return _nameFile || 'none file';
    }

    /**
     * @description Return Number line logger
     * @param {*} Line 
     */
    getLine (Line = 0) {
      console.log('getLine', Line);
      if (Line !== 0) {
        try {
          let _lastElement = Line.split('/').pop();    
          _lastElement = _lastElement.split(':');
          _(_lastElement).splice(0, 1).value()
          let _linesFile = _.join(_lastElement, '.');
          return _linesFile;
        } catch (err) {
          console.log('err get number line', err);
          return '0';
        }
      } else {
        return '0'    
      }
    }
    
}

module.exports = dataItem;