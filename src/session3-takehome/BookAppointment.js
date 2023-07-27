import axios from "axios";
import { useState } from "react";

export function BookAppointment() {
  const [option, setOption] = useState("");
  const [successAPI, setsuccessAPI] = useState(false);
  // console.log(option);
  let additionalData;
  if (option !== "") {
    additionalData = (
      <div>
        <br />
        <label className="form-label">Where?</label>
        <br />
        <input
          className="form-check-input"
          type="radio"
          id="googlemeet"
          name="where"
          value="Google_Meet"
          required
        />
        <label className="form-check-label">Google Meet</label>
        <br />
        <input
          className="form-check-input"
          type="radio"
          id="phone"
          name="where"
          value="Phone"
          required
        />
        <label className="form-check-label">Phone</label>
        <br />
        <br />
        <label className="form-label">When?</label>
        <br />
        <input
          className="form-control"
          type="datetime-local"
          name="date"
          required
        />
      </div>
    );
  }

  async function submitForm(e) {
    e.preventDefault();
    const form = document.querySelector("form");
    const { firstName, lastName, email, doctor, where, date } = form.elements;
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      doctor: doctor.value,
      where: where.value,
      date: date.value
    };
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      // console.log("before timeout");
      setTimeout(() => {
        setsuccessAPI(true);
        setOption("");
        console.log(response);
      }, 5000);
      // console.log("after timeout");
      setsuccessAPI("pageLoading");
    } catch (error) {
      alert("Failed!!");
    }
  }

  if (successAPI === true) {
    return (
      <div className="m-4 border border-dark p-2 main">
        <h1>Appintment booked successfully!</h1>
        <button
          onClick={() => setsuccessAPI(false)}
          className="btn btn-secondary"
        >
          Cancel appointment
        </button>
      </div>
    );
  } else if (successAPI === "pageLoading") {
    return (
      <div className="m-4 border border-dark p-2 main">
        <h1>Book a Session</h1>
        <p>Fill in the form below to book a virtual session with your doctor</p>
        <h4>Scheduling the appointment...</h4>
      </div>
    );
  } else {
    return (
      <form onSubmit={submitForm} className="m-4 border border-dark p-2 main">
        <h1>Book a Session</h1>
        <p>Fill in the form below to book a virtual session with your doctor</p>
        <h6>Basic Info</h6>
        <label className="form-label">First Name</label>
        <input className="form-control" name="firstName" type="text" required />
        <br />
        <label className="form-label">Last Name</label>
        <input className="form-control" name="lastName" type="text" required />
        <br />
        <label className="form-label">Email</label>
        <input className="form-control" name="email" type="text" required />
        <br />
        <label className="form-label">Doctor</label>
        <select
          className="form-select"
          type="text"
          name="doctor"
          onClick={(e) => setOption(e.target.value)}
          required
        >
          <option value="" selected>
            Select your Doctor
          </option>
          <option value="johnHopkins">Dr. John Hopkins</option>
          <option value="peterPark">Dr. Peter Park</option>
          <option value="marryGold">Dr. Marry Gold</option>
        </select>
        {additionalData}
        <br />
        <button className="btn btn-primary" type="submit">
          Confirm Booking
        </button>
      </form>
    );
  }
}
