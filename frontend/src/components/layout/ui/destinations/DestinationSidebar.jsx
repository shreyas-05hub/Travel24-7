// PackageSidebar.jsx
import React from 'react';
import './destinationSidebar.css';


const DestinationSidebar = () => {
  return (
      <div className="w-100 sidebar text-primary text-center p-3">
        <h5 className="mb-3">Enter Your Travel Preferences</h5>
        <div className='form'>
          <div className='my-3'>
            <label htmlFor="fromCity" className='my-1'>Select From_City</label>
            <select className="form-select my-3 w-50 mx-auto" id="fromCity" onChange={(e)=>dispatch({type:"SELECT_CITY",val:e.target.value})}>
              {['Madurai', 'Jaipur', 'Lucknow', 'Kochi', 'Varanasi', 'Delhi',
                'Pune', 'Nagpur', 'Goa', 'Hyderabad', 'Bhubaneswar', 'Chandigarh',
                'Kolkata', 'Chennai', 'Coimbatore', 'Visakhapatnam', 'Mumbai',
                'Bengaluru', 'Indore', 'Ahmedabad'].sort().map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          {/* <div className='my-3'>
            <label htmlFor="destination" className='my-1'>Select Destination</label>
            <select className="form-select" id="destination" onChange={(e)=>dispatch({type:"SELECT_DESTINATION",val:e.target.value})}>
              {['goa', 'mumbai', 'leh-ladakh', 'auli', 'delhi', 'rann of kutch', 'coorg',
                'kodaikanal', 'varanasi', 'jaisalmer', 'bengaluru', 'munnar', 'rishikesh',
                'ooty', 'darjeeling', 'jaipur', 'alleppey', 'andaman', 'kochi', 'chennai',
                'manali', 'pondicherry', 'shimla', 'agra', 'mysuru'].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className='my-3'>
            <label htmlFor="destinationType" className='my-1'>Select Destination_Type</label>
            <select className="form-select" id="destinationType" onChange={(e)=>dispatch({type:"DESTINATION_TYPE",val:e.target.value})}>
              {['beach', 'city', 'adventure', 'desert', 'hill station', 'cultural',
                'historical', 'backwater', 'island', 'coastal', 'mountain'].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className='my-3'>
            <label htmlFor="duration" className='my-1'>Trip_Duration_Days</label>
            <input type='number'min={2} className='form-control' id="duration" value={state.duration} onChange={(e)=>dispatch({type:"TRIP_DURATION",val:e.target.value})}/>
          </div>
          <div className='my-3'>
            <label htmlFor="budget" className='my-1'>Budget_Range (in Rupees)</label>
            <select className="form-select" id="budget" onChange={(e)=>dispatch({type:"BUDGET_TYPE",val:e.target.value})}>
              {["high","medium","high"].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className='my-3'>
            <label htmlFor="approx" className='my-1'>Approx_Cost</label>
            <input type='number'min={4000} className='form-control' id="approx" value={state.approx} onChange={(e)=>dispatch({type:"APPROXIMATION_TYPE",val:e.target.value})}/>
          </div> */}
          {/* <div className='my-3'>
            <label htmlFor="accommodation" className='my-1'>Accommodation_Type</label>
            <select className="form-select" id="accommodation" onChange={(e)=>dispatch({type:"ACCOMODATION_TYPE",val:e.target.value})}>
              {["Homestay", "Hotel", "Resort", "Camping"].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className='my-3'>
            <label htmlFor="transportMode" className='my-1'>Transport_Mode</label>
            <select className="form-select" id="transportMode" onChange={(e)=>dispatch({type:"TRANSPORT_MODE",val:e.target.value})}>
              {["Train", "Flight", "Bus", "Car"].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div>
          <div className='my-3'>
            <label htmlFor="activityCount" className='my-1'>Activity_Count</label>
            <input type="number" min={1} className='form-control' id="activityCount" value={state.activities} onChange={(e)=>dispatch({type:"ACTIVITIES_COUNT",val:e.target.value})}/>
          </div>
          <div className='my-3'>
            <label htmlFor="packageType" className='my-1'>Package Type</label>
            <select className="form-select" id="packageType" onChange={(e)=>dispatch({type:"PACKAGE_TYPE",val:e.target.value})}>
              {["Budget", "Adventure", "Luxury", "Family", "Honeymoon", "Standard", "Premium"].map((item,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))}
            </select>
          </div> */}
        </div>
      </div>
  );
};
export default DestinationSidebar;

