import React from "react";
import axios from "axios";

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      fullname: "",
      imageLink:
        "https://pdtxar.com/wp-content/uploads/2019/04/person-placeholder.jpg"
    };
  }

  apiData = async (id) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);

      let email = response.data.data.email;
      let name =
        response.data.data.first_name + " " + response.data.data.last_name;
      let avatar = response.data.data.avatar;
      this.setState({
        emailId: email,
        fullname: name,
        imageLink: avatar
      });
    } catch (error) {
      this.setState({
        emailId: "",
        fullname: "",
        imageLink: ""
      });
      alert("Failed! to fetch data");
    }
  };

  render() {
    return (
      <div className="userData">
        <button onClick={() => this.apiData(1)}>1</button>
        <button onClick={() => this.apiData(2)}>2</button>
        <button onClick={() => this.apiData(3)}>3</button>
        <button onClick={() => this.apiData(100)}>100</button>
        <ul>
          <li>
            Email : <span className="nameText">{this.state.emailId}</span>{" "}
          </li>
          <br />
          <li>
            Name : <span className="nameText">{this.state.fullname}</span>
          </li>
        </ul>
        <img src={this.state.imageLink} alt="Not Available" />
      </div>
    );
  }
}
