import React from 'react';
import Moment from 'react-moment';

function formatdate(inputdate) {
    //format the time from server and return the Hong Kong Time zone
    var res = inputdate.toString().split(".");
    var moment = require('moment-timezone');
    var utcCutoff = moment.utc(res[0], '');
    return utcCutoff.toString();
  }

function Headline(props) {
  return <h1>{formatdate(props.value)}</h1>;
}
 
export default Headline;