import React from 'react';
import Moment from 'react-moment';

function formatdate(inputdate) {
    //format the time from server and return the Hong Kong Time zone
    var res = inputdate.toString().split(".");
    var moment = require('moment-timezone');
    //var utcCutoff = moment.utc(res[0], '');
    return res[0].toString();
  }

function Headline(props) {
  return <Moment format="DD-MMM-YYYY (ddd) hh:mm a">{formatdate(props.value)}</Moment>;
}
 
export default Headline;