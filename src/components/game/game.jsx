import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import "./game.css";
import "../../selfthinker-CSS-Playing-Cards-7e0e0f2/cards.css";

class Game extends React.Component {
  cardArray = [];
  numberOfPlayers;
  playerId;
  classMapping = [];
  cardComponent;
  players = [];
  pindex;
  numberOfLifeLines = 5;
  stylesArray = [];
  playerTurn = '';
  constructor(props) {
    super(props);
    this.numberOfPlayers = this.props.playersArray.length;
    //this.numberOfPlayers = 8;
    this.classMapping = this.getClassMapping(this.numberOfPlayers);
    this.playerTurn = props.playerTurn;
    for (var i = 0; i < this.numberOfPlayers; i++) {
      if (this.props.playersArray[i].pid === this.props.playerId) {
        this.pindex = i;
        break;
      }
    }
    var playerObj = this.props.playersArray[this.pindex];

/*
    this.players = [
       {pid: "liuzk4", pname: "Manu"},
       {pid: "ds67kf", pname: "nsu"},
       {pid: "0wvk", pname: "sfsdf"},
       {pid: "q2yosi", pname: "manager"},
       {pid: "rizybq", pname: "sansi"},
       {pid: "0wvk", pname: "sfsdf"},
       {pid: "q2yosi", pname: "manager"},
       {pid: "rizybq", pname: "sansi"}

     ]*/
    this.players.push({
      pid: this.props.playersArray[this.pindex].pid,
      pname: this.props.playersArray[this.pindex].pname,
    });
   
    for (var j = 1; j < this.numberOfPlayers; j++) {
       this.players.push({
        pid: this.props.playersArray[(this.pindex + j) % this.numberOfPlayers]
          .pid,
        pname: this.props.playersArray[(this.pindex + j) % this.numberOfPlayers]
          .pname,
      });
    }
    //  this.cardComponent = this.getMultiPlayerCardsLayout(this.numberOfPlayers);
    this.cardArray = Array.from(playerObj.cards);
    // this.cardArray = [{suit: "clubs", rank: "K"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "hearts", rank: "5"},
    //  {suit: "spades", rank: "A"},
    //  {suit: "diams", rank: "4"},
    //  {suit: "spades", rank: "3"},
    //  {suit: "diams", rank: "9"},
    //  {suit: "clubs", rank: "4"},
    //  {suit: "spades", rank: "Q"},
    //  {suit: "hearts", rank: "5"},
    //  {suit: "spades", rank: "A"},
    // ]

    this.state = {
      cards: this.cardArray,
      stylesArray: Array(this.cardArray.length).fill({
        selected: false,
        styles: {
          top: "5em",
        },
      }),
    };
  }

  handleCardClick(e) {
    var newArr = this.state.stylesArray;
    if (newArr[e.currentTarget.dataset.id].selected == true) {
      newArr[e.currentTarget.dataset.id] = {
        selected: false,
        styles: {
          top: "5em",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    } else {
      newArr[e.currentTarget.dataset.id] = {
        selected: true,
        styles: {
          top: "5em",
          transform: "translate(0px,-50px)",
        },
      };
      this.setState({
        stylesArray: newArr,
      });
    }
    console.log(this.state);
    console.log(e.currentTarget.dataset);
  }

  moveHandler() {
    var tempArr = this.state.cards;
    var updatedCards = [];
    var stylesArray = this.state.stylesArray;
    var updatedStyles = [];
    var selectedCards = [];
    var indexArr = [];
    console.log(this.state.cards.length);
    for (var i = 0; i < this.state.cards.length; i++) {
      if (stylesArray[i].selected === true) {
        selectedCards.push(tempArr[i]);
        //  indexArr.push(i);
      } else {
        updatedCards.push(tempArr[i]);
        updatedStyles.push(stylesArray[i]);
      }
    }

    // for(var i=0;i<selectedCards.length;i++){
    //   tempArr.splice(indexArr[i],1)
    //   stylesArray.splice(indexArr[i],1);
    // }
    this.setState({
      cards: updatedCards,
      stylesArray: updatedStyles,
    });
    console.log(selectedCards);
    console.log(updatedCards);
    console.log(updatedStyles);
  }

  render() {
    const items = [];
    var i = 0;
    for (i = 0; i < this.state.cards.length; i++) {
      var obj = this.state.cards[i];

      var cardClass = "card rank-" + obj.rank + " " + obj.suit;
      var elem = this.getSuitSymbol(obj.suit);

      items.push(
        <li
          key={i}
          data-id={i}
          style={this.state.stylesArray[i].styles}
          onClick={this.handleCardClick.bind(this)}
        >
          <div className={cardClass}>
            <span className="rank">{obj.rank}</span>
            {elem}
          </div>
        </li>
      );
    }

    return (
      <div className="Game_container">
        <GetMultiPlayerCardsLayout
          players={this.players}
          classMapping={this.classMapping}
          numberOfPlayers={this.numberOfPlayers}
          playerTurn={this.playerTurn}
        ></GetMultiPlayerCardsLayout>
        <PlayingZone numberOfCards={5}></PlayingZone>

        <div className="player_1">
          <div className="playingCards fourColours faceImages">
            <ul className="hand">{items}</ul>
            <button onClick={this.moveHandler.bind(this)}>Make a Move</button>
          </div>
        </div>
      </div>
    );
  }

  getSuitSymbol(suit) {
    if (suit === "spades") return <span className="suit">&spades;</span>;
    else if (suit === "hearts") return <span className="suit">&hearts;</span>;
    else if (suit === "diams") return <span className="suit">&diams;</span>;
    else return <span className="suit">&clubs;</span>;
  }

  getClassMapping(numberOfPlayers) {
    switch (numberOfPlayers) {
      case 2:
        return ["player_1", "player_5"];

      case 3:
        return ["player_1", "player_3", "player_7"];

      case 4:
        return ["player_1", "player_3", "player_5", "player_7"];

      case 5:
        return ["player_1", "player_2", "player_4", "player_6", "player_8"];

      case 6:
        return [
          "player_1",
          "player_3",
          "player_4",
          "player_5",
          "player_6",
          "player_7",
        ];

      case 7:
        return [
          "player_1",
          "player_2",
          "player_3",
          "player_4",
          "player_6",
          "player_7",
          "player_8",
        ];

      case 8:
        return [
          "player_1",
          "player_2",
          "player_3",
          "player_4",
          "player_5",
          "player_6",
          "player_7",
          "player_8",
        ];
      default:
        return [];
    }
  }

  ranks = {
    1: "A",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "J",
    12: "Q",
    0: "K",
  };

  suits = {
    1: "spades",
    2: "diams",
    3: "hearts",
    0: "clubs",
  };
}
function GetMultiPlayerCardsLayout(props) {
  var i;
  var elem = [];
  var animated;
  for (i = 2; i <= props.numberOfPlayers; i++) {
    if (props.players[i - 1].pid === props.playerTurn) {
      animated = "animated";
    } else animated = "";
    var clsName = props.classMapping[i - 1];
    var playerName = props.players[i - 1].pname.toUpperCase();
    elem.push(
      <div className={clsName}>
        <div
          className="playingCards"
          style={{ display: "inline-block", width: "50%", float: "left" }}
        >
          <ul className="deck">
            <li>
              <div className="card back"></div>
            </li>
            <li>
              <div className="card back"></div>
            </li>
            <li>
              <div className="card back"></div>
            </li>
            <li>
              <div className="card back"></div>
            </li>
            <li>
              <div className="card back"></div>
            </li>
          </ul>
        </div>

        <div
          className={animated}
          style={{
            display: "inline-block",
            width: "45%",
            float: "right",
            fontFamily: "cursive",
          }}
        >
          <h4 style={{ margin: "2px" }}>{playerName}</h4>
          <span className="dot red"></span>
          <span className="dot green"></span>
          <span className="dot green"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }
  return elem;
}

function PlayingZone(props) {
  var elem = [];

  var x = 0;
  var y = 0;
  var angle = 0;
  var styleObj;

  var noOf = 24;
  for (var i = 0; i < noOf; i++) {
    styleObj = {
      position: "absolute",
      "-webkit-transform":
        "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
      "-o-transform":
        "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
      transform: "translate(" + x + "px, " + y + "px) rotate(" + angle + "deg)",
    };

    elem.push(<div style={styleObj} className="cardCss backCardCss"></div>);
    angle = angle + 15;
    x = x + 1 * 30 * Math.cos((angle * 3.14) / 180);
    y = y + 1 * 30 * Math.sin((angle * 3.14) / 180);
  }
  return (
    <div className="playingZone">
      <div className="outerRing">
        {elem}
        <div className="cardsNumber">{props.numberOfCards}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //gameName: 'hello',
    playerId: state.player.pid,
    gameId: state.game.gameId,
    gameName: state.game.gameName,
    isHost: state.player.isHost,
    playersArray: state.firestore.data.games
      ? state.firestore.data.games[state.game.gameId].Players
      : null,
    playerTurn: state.firestore.data.games
    ? state.firestore.data.games[state.game.gameId].playerTurn
    : null
  };
};

export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "games",
        doc: props.location.state.gameId,
        //  doc: 'k92xBYViTZvUTNNZT73S'
      },
    ];
  }),
  connect(mapStateToProps)
)(Game);
