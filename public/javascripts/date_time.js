var moment = require('moment');

function DateTime() {
  let time = moment();
  return(
  <div>
    <Typography id="time" align="left">{time.format("h:mm a")}</Typography>
    <Typography id="date" align="left">{time.format("ddd, MMM Do")}</Typography>
  </div>
  );
}