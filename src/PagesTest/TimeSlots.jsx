import React from "react";
import moment from "moment";
import  "moment-timezone";

const TimeSlots = () => {
    
    // function getTimeStops(start, end){

    //     // start = Number(start);
    //     var startTime = moment(start, 'HH:mm');
    //     console.log(startTime);
    //     var endTime = moment(end, 'HH:mm');
        
    //     if( endTime.isBefore(startTime) ){
    //       endTime.add(1, 'day');
    //     }
      
    //     var timeStops = [];
      
    //     while(startTime <= endTime){
    //       timeStops.push(new moment(startTime).format('HH:mm'));
    //       startTime.add(2, 'hours');
    //     }
    //     return timeStops;
    //   }
      
    //   var timeStops = getTimeStops('11:00', '02:00');
    //   console.log('timeStops ', timeStops);
    // //   timeStops2 = getTimeStops('11:00', '23:59');
    // //   console.log('timeStops ', timeStops2);

    // // const dateToFormat = '1976-04-19T12:59-0500';


    // Test Javascript for generating dates.

    const randomTime = () => {
      const hrs = Math.round(Math.random() * 24);
      const mins = Math.round(Math.random() * 60);    
      var hFormat = (hrs<10 ? "0" : "");
      var mFormat = (mins<10 ? "0" : "");
      var amPm = (hrs<12 ? "AM" : "PM");
      var is12 = (hrs % 12 === 0);
    
      return amPm === "AM" && !is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                    : "AM" && is12  ? String(12 + ":" +mFormat+mins+ " " +amPm)
                    : is12 ? String(hFormat+hrs+ ":" +mFormat+mins+ " " +amPm)
                    : String(hFormat+(hrs-12)+ ":" +mFormat+mins+ " " +amPm);
    
    }
    
    var resultTime = randomTime();
    console.log(resultTime);
  
    var resultTime2 = randomTime();
    console.log(resultTime2);

    var resultTime3 = randomTime();
    console.log(resultTime3);

    var resultTime4 = randomTime();
    console.log(resultTime4);

    var resultTime5 = randomTime();
    console.log(resultTime5);




    return (
        <>
        <h1>Time slots for testing</h1>
        <p>{resultTime}</p>
        <p>{resultTime2}</p>
        <p>{resultTime3}</p>
        <p>{resultTime4}</p>
        <p>{resultTime5}</p>
        </>
    )
}





export default TimeSlots;