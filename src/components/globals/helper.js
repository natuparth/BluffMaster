import React from "react";

export const getSuitSymbol = (suit) => {
    if (suit === "spades") return <span className="suit">&spades;</span>;
    else if (suit === "hearts") return <span className="suit">&hearts;</span>;
    else if (suit === "diams") return <span className="suit">&diams;</span>;
    else return <span className="suit">&clubs;</span>;
  }

export const getClassMapping = (numberOfPlayers) => {
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