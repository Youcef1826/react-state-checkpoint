
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: "John Doe",
        bio: "Fake person",
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtucyCYlV0dcefPSJqdgV9DFYEBt0VrOc2GQ&s",
        profession: "Placeholder",
      },
      show: false,
      lastMounted: 0,
      interval: null
    };
  }

  componentDidMount() {
    if (this.state.show) {
      this.startInterval();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.show && this.state.show) {
      this.startInterval();
    }
    if (prevState.show && !this.state.show) {
      this.clearInterval();
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  startInterval = () => {
    this.clearInterval();
    const interval = setInterval(() => {
      this.setState((prevState) => ({ lastMounted: prevState.lastMounted + 1 }));
    }, 1000);
    this.setState({ interval });
  };

  clearInterval = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  };

  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
      lastMounted: 0
    }));
  };


  render() {
    const { person, show, lastMounted } = this.state;

    return (
      <>
        <section>
          <button onClick={this.toggleShow}>
            {show ? 'Hide' : 'Show'} Profile
          </button>
          {show && (
            <div>
              <img src={person.imgSrc} alt={person.name} />
              <h1>{person.name}</h1>
              <p>Profession: {person.profession}</p>
              <p>Bio: {person.bio}</p>
            </div>
          )}
          <p>Time since last mount: {lastMounted} seconds</p>
        </section>
      </>
    );
  }
}

export default App;