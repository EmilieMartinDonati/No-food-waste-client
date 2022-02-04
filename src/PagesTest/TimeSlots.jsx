import React from "react";
import moment from "moment";
import  "moment-timezone";

const TimeSlots = () => {
    
    function getTimeStops(start, end){

        // start = Number(start);
        var startTime = moment(start, 'HH:mm');
        console.log(startTime);
        var endTime = moment(end, 'HH:mm');
        
        if( endTime.isBefore(startTime) ){
          endTime.add(1, 'day');
        }
      
        var timeStops = [];
      
        while(startTime <= endTime){
          timeStops.push(new moment(startTime).format('HH:mm'));
          startTime.add(15, 'minutes');
        }
        return timeStops;
      }
      
      var timeStops = getTimeStops('11:00', '02:00');
      console.log('timeStops ', timeStops);
    //   timeStops2 = getTimeStops('11:00', '23:59');
    //   console.log('timeStops ', timeStops2);

    // const dateToFormat = '1976-04-19T12:59-0500';


    return (
        <>
        <h1>Time slots for testing</h1>
        <p>{timeStops}</p>
        </>
    )
}





export default TimeSlots;