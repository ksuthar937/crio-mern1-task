import axios from "axios";
import React from "react";

export class DogPics extends React.Component {
  constructor() {
    super();
    this.state = {
      randomImage: "",
      selectedBreed: "random"
    };
  }

  async componentDidMount() {
    await this.fetchImage(this.state.selectedBreed);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedBreed !== prevState.selectedBreed) {
      await this.fetchImage(this.state.selectedBreed);
    }
  }

  async fetchImage(breed) {
    let url =
      breed === "random"
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${breed}/images/random`;
    let response = await axios.get(url);
    let image = response.data.message;
    this.setState({
      randomImage: image
    });
  }

  handleBreedChange = (event) => {
    this.setState({
      selectedBreed: event.target.value
    });
  };

  nextImage = async () => {
    let url =
      this.state.selectedBreed === "random"
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${this.state.selectedBreed}/images/random`;
    let response = await axios.get(url);
    let image = response.data.message;
    this.setState({
      randomImage: image
    });
  };

  render() {
    return (
      <div>
        <div className="topSelection">
          <h3>Select a breed : </h3>
          <select id="dropdown" onChange={this.handleBreedChange}>
            <option value="random">Random</option>
            <option value="beagle">Beagle</option>
            <option value="boxer">Boxer</option>
            <option value="dalmatian">Dalmatian</option>
            <option value="husky">Husky</option>
          </select>
        </div>
        <img src={this.state.randomImage} alt="" className="dogImages" />
        <button onClick={this.nextImage} className="nextButton">
          Next
        </button>
      </div>
    );
  }
}
