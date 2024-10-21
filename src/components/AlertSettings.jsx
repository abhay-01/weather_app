import React, { useState } from 'react';
import axios from '../services/api';

const AlertSettings = () => {
  const [threshold, setThreshold] = useState(35);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSave = () => {
    axios.post('/weather/alerts', { thresholds: { temp: threshold } })
      .then(response => setAlertMessage(response.data.message))
      .catch(error => console.error('Error setting alert:', error));
  };

  return (
    <div className="alerts">
      <h2>Set Temperature Alert</h2>
      <label>
        Temperature Threshold (°C):
        <input
          type="number"
          value={threshold}
          onChange={e => setThreshold(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>

      {alertMessage && <p>{alertMessage}</p>}
    </div>
  );
}

export default AlertSettings;
