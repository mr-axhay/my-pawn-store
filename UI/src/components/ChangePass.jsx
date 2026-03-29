import './ChangePass.css';
import { useState } from 'react';
import axios from 'axios';
import { __userapiurl } from '../API_URL';


function ChangePass() {
  const [oPass, setOldPass] = useState('');
  const [nPass, setNPass] = useState('');
  const [cnPass, setCnPass] = useState('');
  const [output, setOutput] = useState('');
  const [msgColor, setMsgColor] = useState('blue');

  const handleSubmit = () => {
    if (!oPass || !nPass || !cnPass) {
      setMsgColor('red');
      setOutput("All fields are required");
      return;
    }
    // Step 1: verify old password
    axios.get(__userapiurl +"fetch?email="+localStorage.getItem('email') +"&password=" +oPass
      ).then((res) => {
        if(res.data.length === 0) {
          setMsgColor('red');
          setOutput("Invalid Old Password");
          return;
        }
        // Step 2: match new & confirm password
        if (nPass !== cnPass)
         {
          setMsgColor('red');
          setOutput("New & Confirm password do not match");
          setNPass('');
          setCnPass('');
          return;
        }
        // Step 3: update password
// Step 3: update password
const updateData = {
  condition_obj: {
    email: localStorage.getItem('email')
  },
  content_obj: {
    password: cnPass
  }
};

axios.patch(__userapiurl + "update", updateData)
  .then((res) => {
    setMsgColor('green');
    setOutput("Password changed successfully");
    setOldPass('');
    setNPass('');
    setCnPass('');
  })
  .catch(() => {
    setMsgColor('red');
    setOutput("Unable to update password");
  });
      }).catch(() => {
        setMsgColor('red');
        setOutput("Invalid Old Password");
        setOldPass('');
        setNPass('');
        setCnPass('');
      });
  };
  return (
    <>
    <section className="about_section layout_padding">
  <div className="container-fluid">

    <div className="cp-container">
      <div className="cp-card">

        <h1>🔐 Change Password</h1>
        <p className="msg" style={{ color: msgColor }}>{output}</p>

        <div className="input-group">
          <label>Old Password</label>
          <input
            type="password"
            placeholder="Enter old password"
            value={oPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={nPass}
            onChange={(e) => setNPass(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={cnPass}
            onChange={(e) => setCnPass(e.target.value)}
          />
        </div>

        <button className="change-btn" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </div>

  </div>
</section>

    </>
  );
}

export default ChangePass;
