import React from "react";
import Box from "./Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Button from "@mui/material/Button";

let counter = 0;

class Boxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mazeState: [],
      player: [0, 0],
      initial: [0, 0],
      boxHeight: "",
      boxWidth: "",
    };
    this.setMaze = this.setMaze.bind(this);
    this.generateInitialState = this.generateInitialState.bind(this);
    this.checkCommanPlace = this.checkCommanPlace.bind(this);
    this.buildMazeBoard = this.buildMazeBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.buildMazeBoard();
  }

  buildMazeBoard() {
    let width = window.prompt("Please enter board width");
    let height = window.prompt("Please enter board height");
    if (width && height) {
      let boxWidth = Math.floor(
        document.querySelector(".box-parent").clientWidth / width
      );
      let boxHeight = Math.floor(
        document.querySelector(".box-parent").clientHeight / height
      );
      this.setState(
        {
          initial: [width, height],
          player: [Math.floor(width / 2), Math.floor(height / 2)],
          boxWidth,
          boxHeight,
        },
        () => this.generateInitialState()
      );
    }
    //this.generateInitialState();
  }

  checkCommanPlace(maze, player) {
    if (maze[player[0]][player[1]]) {
      console.log(true);
      maze[player[0]][player[1]] = 0;
      counter -= 1;
    }
    this.setState({
      mazeState: maze,
    });
  }

  componentDidMount() {
    this.buildMazeBoard();
    this.moveFocus();
  }

  setMaze(player) {
    if (this.state.mazeState[player[0]][player[1]]) {
      let mazeState = [...this.state.mazeState];
      mazeState[player[0]][player[1]] = 0;
      counter = counter - 1;
      this.setState(
        {
          mazeState: mazeState,
        },
        () => {
          if (counter <= 0) {
            //window.alert("Game finished");
            console.log("Game finished");
          }
        }
      );
    }
  }

  generateInitialState() {
    let initialState = [];
    let row = this.state.initial[0],
      col = this.state.initial[1];
    counter = 0;
    for (let i = 0; i < row; i++) {
      initialState[i] = [];
      for (let j = 0; j < col; j++) {
        let num = Math.round(Math.random());
        initialState[i][j] = num;
        if (num) {
          counter += 1;
        }
      }
    }
    this.checkCommanPlace(initialState, this.state.player);
  }

  moveFocus() {
    let self = this;
    document.addEventListener("keydown", function (e) {
      let keyCode = e.keyCode;
      if (keyCode === 37) {
        // arrowleft
        console.log("arrowleft");
        if (self.state.player[1] !== 0) {
          let player = [...self.state.player];
          player[1] = player[1] - 1;
          self.setState({
            player: player,
          });
          self.setMaze(player);
        }
      } else if (keyCode === 38) {
        // arrowup
        console.log("arrowup");
        if (self.state.player[0] !== 0) {
          let player = [...self.state.player];
          player[0] = player[0] - 1;
          self.setState({
            player: player,
          });
          self.setMaze(player);
        }
      } else if (keyCode === 39) {
        // arrowright
        console.log("arrowright");
        if (
          self.state.mazeState[0].length >= self.state.player[1] &&
          self.state.mazeState[0].length - 1 !== self.state.player[1]
        ) {
          let player = [...self.state.player];
          player[1] = player[1] + 1;
          self.setState({
            player: player,
          });
          self.setMaze(player);
        }
      } else if (keyCode === 40) {
        // arrowdown
        console.log("arrowdown");
        if (
          self.state.mazeState.length >= self.state.player[0] &&
          self.state.mazeState.length - 1 !== self.state.player[0]
        ) {
          let player = [...self.state.player];
          player[0] = player[0] + 1;
          self.setState({
            player: player,
          });
          self.setMaze(player);
        }
      }
    });
  }

  render() {
    return (
      <div className="box-parent">
        {/* <input
          type="button"
          value="Start"
          className={"start-button"}
          onClick={this.handleClick}
        /> */}
        <Button
          variant="contained"
          className="playButton"
          onClick={this.handleClick}
        >
          <PlayCircleIcon />
        </Button>
        <Box key={"box"} mazeData={this.state} />
      </div>
    );
  }
}

export default Boxes;
