const ranks = {
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
    11: "j",
    12: "q",
    0: "k",
  };

  const reverseRanks = {
    "A": 1 ,
    "2": 2,
     "3": 3,
     "4": 4,
     "5": 5,
     "6": 6,
     "7": 7,
     "8": 8,
     "9": 9,
     "10": 10,
     "j": 11,
     "q": 12,
     "k": 0,

  }

  const cardNames ={
    1: 'ACE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN',
    8: 'EIGHT',
    9: 'NINE',
    10: 'TEN',
    'j': 'JACK',
    'q': 'QUEEN',
    'k': 'KING'
  }

  const cardNamesPlurals = {
    1: 'ACES',
    2: 'TWOS',
    3: 'THREES',
    4: 'FOURS',
    5: 'FIVES',
    6: 'SIXES',
    7: 'SEVENS',
    8: 'EIGHTS',
    9: 'NINES',
    10: 'TEN',
    'j': 'JACKS',
    'q': 'QUEENS',
    'k': 'KINGS'
  }
 const suits = {
    1: "spades",
    2: "diams",
    3: "hearts",
    0: "clubs",
  }

  export {
      ranks,
      reverseRanks,
      suits,
      cardNames,
      cardNamesPlurals
  }

  