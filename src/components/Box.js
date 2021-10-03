import React from "react";
import diamond from "./../diamond.svg";
import player_img from "./../../src/player_img.svg";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      width: "",
    };
  }

  render() {
    const { mazeState, player, boxHeight, boxWidth } = this.props.mazeData;
    let style = { height: boxHeight + "px", width: boxWidth + "px" };
    return mazeState.map((row, rowInd) => (
      <div className="row" key={`row_${rowInd}`}>
        {row.map((col, colInd) =>
          rowInd == player[0] && colInd == player[1] ? (
            <div className="col" key={`row_${rowInd}_col_${colInd}`}>
              <img src={player_img} alt="logo" style={style} />
            </div>
          ) : (
            <>
              {col === 1 && (
                <div className="col" key={`row_${rowInd}_col_${colInd}`}>
                  <div style={style}>
                    <img
                      src={diamond}
                      className="App-logo"
                      alt="logo"
                      style={{ height: style.height }}
                    />
                  </div>
                </div>
              )}
              {col === 0 && (
                <div className="col" key={`row_${rowInd}_col_${colInd}`}>
                  <div style={style}></div>
                </div>
              )}
            </>
          )
        )}
      </div>
    ));
  }
}

export default Box;
