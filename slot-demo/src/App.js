import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [duration, setDuration] = useState('');
  const [startTime, setStartTime] = useState('0.5 AM');
  const [endTime, setEndTime] = useState('0.5 AM');
  const [slots, setSlots] = useState([]);

  const addSlot = () => {
    // Calculate the end time of the new slot
    let duration1 = duration.split(" ")[0];
    duration1 = Number(duration1);
  
    let hour = startTime.split(":")[0];
    let minute = startTime.split(":")[1];
    
    let ampm = minute.split(" ")[1];
    minute = minute.substr(0,2);
    
    hour = Number(hour);
    duration1 = Number(duration1);
  
    let totalMinutes = hour * 60 + Number(minute) + duration1 * 60;
    let endHour = Math.floor(totalMinutes / 60);
    let endMinute = totalMinutes % 60;
  
    if (endHour > 12) {
        endHour -= 12;
        ampm = ampm === 'AM' ? 'PM' : 'AM';
    }
  
    const formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
    const formattedEndMinute = endMinute < 10 ? `0${endMinute}` : `${endMinute}`;
    const calculatedEndTime = `${formattedEndHour}:${formattedEndMinute} ${ampm}`;
  
    const newSlot = { duration, startTime, endTime: calculatedEndTime };
  
    const overlapping = slots.some(slot => {
      const slotStart = new Date(`2022-01-01 ${slot.startTime}`);
      const slotEnd = new Date(`2022-01-01 ${slot.endTime}`);
      const newSlotStart = new Date(`2022-01-01 ${startTime}`);
      const newSlotEnd = new Date(`2022-01-01 ${calculatedEndTime}`);
  
      return (
        (newSlotStart >= slotStart && newSlotStart < slotEnd) ||
        (newSlotEnd > slotStart && newSlotEnd <= slotEnd) ||
        (slotStart >= newSlotStart && slotEnd <= newSlotEnd)
      );
    });
  
    if (overlapping) {
      alert('The new slot overlaps with an existing slot. Please choose a different time.');
      return;
    }
  

    setSlots([...slots, newSlot]);
    setDuration(duration);
    setStartTime('');
  };
  

  return (
    <div className="App">
      Duration
      <input
        type="text"
        name="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      Start Time
      <select
        name="start"
        id="start"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      >
        <option value="0:30 AM">0:30 AM</option>
        <option value="1:00 AM">1:00 AM</option>
        <option value="1:30 AM">1:30 AM</option>
        <option value="2:00 AM">2:00 AM</option>

        <option value="2:30 AM">2:30 AM</option>
        <option value="3:00 AM">3:00 AM</option>
        <option value="3:30 AM">3:30 AM</option>
        <option value="4:00 AM">4:00 AM</option>

        <option value="4:30 AM">4:30 AM</option>
        <option value="5:00 AM">5:00 AM</option>
        <option value="5:30 AM">5:30 AM</option>
        <option value="6:00 AM">6:00 AM</option>

        <option value="6:30 AM">6:30 AM</option>
        <option value="7:00 AM">7:00 AM</option>
        <option value="7:30 AM">7:30 AM</option>
        <option value="8:00 AM">8:00 AM</option>

        <option value="8:30 AM">8:30 AM</option>
        <option value="9:00 AM">9:00 AM</option>
        <option value="9:30 AM">9:30 AM</option>
        <option value="10:00 AM">10:00 AM</option>

        <option value="10:30 AM">10:30 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="11:30 AM">11:30 AM</option>
        <option value="12:00 AM">12:00 AM</option>

        <option value="0:30 PM">0:30 PM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="1:30 PM">1:30 PM</option>
        <option value="2:00 PM">2:00 PM</option>

        <option value="2:30 PM">2:30 PM</option>
        <option value="3:00 PM">3:00 PM</option>
        <option value="3:30 PM">3:30 PM</option>
        <option value="4:00 PM">4:00 PM</option>

        <option value="4:30 PM">4:30 PM</option>
        <option value="5:00 PM">5:00 PM</option>
        <option value="5:30 PM">5:30 PM</option>
        <option value="6:00 PM">6:00 PM</option>

        <option value="6:30 PM">6:30 PM</option>
        <option value="7:00 PM">7:00 PM</option>
        <option value="7:30 PM">7:30 PM</option>
        <option value="8:00 PM">8:00 PM</option>

        <option value="8:30 PM">8:30 PM</option>
        <option value="9:00 PM">9:00 PM</option>
        <option value="9:30 PM">9:30 PM</option>
        <option value="10:00 PM">10:00 PM</option>

        <option value="10:30 PM">10:30 PM</option>
        <option value="11:00 PM">11:00 PM</option>
        <option value="11:30 PM">11:30 PM</option>
        <option value="12:00 PM">12:00 PM</option>
      </select>
      End Time
      <input type="text" name="end" id="end" value={endTime} readOnly onChange={(e) => setEndTime(e.target.value)} />
      <button onClick={addSlot}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <div className="centered-table">
        <table>
          <thead>
            <tr>
              <th>Duration</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, index) => (
              <tr key={index}>
                <td>{slot.duration}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;









// const addSlot = () => {
//   let duration1 = duration.split(" ")[0];
//   duration1 = Number(duration1);

//   let hour = startTime.split(":")[0];
//   let minute = startTime.split(":")[1];
  
//   let ampm = minute.split(" ")[1];
//   minute = minute.substr(0,2);
  
//   hour = Number(hour);
//   duration1 = Number(duration1);

//   let totalMinutes = hour * 60 + Number(minute) + duration1 * 60;
//   let endHour = Math.floor(totalMinutes / 60);
//   let endMinute = totalMinutes % 60;

//   if (endHour > 12) {
//       endHour -= 12;
//       ampm = ampm === 'AM' ? 'PM' : 'AM';
//   }

//   const formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
//   const formattedEndMinute = endMinute < 10 ? `0${endMinute}` : `${endMinute}`;
//   const calculatedEndTime = `${formattedEndHour}:${formattedEndMinute} ${ampm}`;

//   const newSlot = { duration, startTime, endTime: calculatedEndTime };
//   setSlots([...slots, newSlot]);

//   setDuration(duration);
//   setStartTime('');
// };
