export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];


export const groupedOptions = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];

export const sportsList =  [
  { value: 'american_football', label: 'American Football' },
  { value: 'rugby', label: 'Rugby' },
  { value: 'soccer', label: 'Soccer'},
  { value: 'combat_sports', label: 'Combat Sports' },
  { value: 'military_training', label: 'Military Training' },
];

// amricanFootball positions list ...
const amricanFootball_Offense =  [
  { value: 'Offensive (interior) line', label: 'Offensive (interior) line' },
  { value: 'Center (C)', label: 'Center (C)' },
  { value: 'Offensive guard (OG)', label: 'Offensive guard (OG)'},
  { value: 'Offensive tackle (OT)', label: 'Offensive tackle (OT)' },
  { value: 'Backs and receivers', label: 'Backs and receivers' },
  { value: 'Quarterback (QB)', label: 'Quarterback (QB)' },
  { value: 'Running back (HB/FB)', label: 'Running back (HB/FB)' },
  { value: 'Wide receiver (WR)', label: 'Wide receiver (WR)' },
  { value: 'Tight end (TE)', label: 'Tight end (TE)' },
];

const amricanFootball_Defense =  [
  { value: 'Defensive line', label: 'Defensive line' },
  { value: 'Defensive tackle (DT)', label: 'Defensive tackle (DT)' },
  { value: 'Defensive end (DE)', label: 'Defensive end (DE)'},
  { value: 'Linebackers', label: 'Linebackers' },
  { value: 'Middle linebacker (MLB)', label: 'Middle linebacker (MLB)' },
  { value: 'Outside linebacker (OLB)', label: 'Outside linebacker (OLB)' },
  { value: 'Defensive backs', label: 'Defensive backs' },
  { value: 'Cornerback (CB)', label: 'Cornerback (CB)' },
  { value: 'Safety (S)', label: 'Safety (S)' },
  { value: 'Nickelback and dimeback', label: 'Nickelback and dimeback' },
];

const amricanFootball_Special_teams =  [
  { value: 'Kicking specialists', label: 'Kicking specialists' },
  { value: 'Kicker (K)', label: 'Kicker (K)' },
  { value: 'Kickoff specialist (KOS)', label: 'Kickoff specialist (KOS)'},
  { value: 'Punter (P)', label: 'Punter (P)' },
  { value: 'Other special teams positions (MLB)', label: 'Other special teams positions' },
  { value: 'Holder (H)', label: 'Holder (H)' },
  { value: 'Long snapper (LS)', label: 'Long snapper (LS)' },
  { value: 'Kick returner (KR) and punt returner (PR)', label: 'Kick returner (KR) and punt returner (PR)' },
  { value: 'Upback', label: 'Upback' },
  { value: 'Gunner', label: 'Gunner' },
  { value: 'Jammer', label: 'Jammer' },
];

//# Exporting list of american football ...
export const amricanFootballPositions = [
  {
    label: 'Offense',
    options: amricanFootball_Offense,
  },
  {
    label: 'Defense',
    options: amricanFootball_Defense,
  },
  {
    label: 'Special teams',
    options: amricanFootball_Special_teams,
  },
];


//Rugby positions list...
const rugbyBacks =  [
  { value: 'Full-back', label: 'Full-back' },

  { value: 'Three-quarters', label: 'Three-quarters'},
  {
    label: 'Wing',
    value: 'Wing',
    isDisabled: true
  },
  { value: 'Centre', label: 'Centre' },
  { value: 'Half-backs', label: 'Half-backs' },
  {
    label: 'Fly-half',
    value: 'Fly-half',
    isDisabled: true
  },
  { value: 'Scrum-half', label: 'Scrum-half' },
];

const rugbyForwards = [
  { value: 'Back row (Loose forwards)', label: 'Back row (Loose forwards)' },
  { value: 'Locks', label: 'Locks' },
  {
    value: 'Number eight',
    label: 'Number eight',
    isDisabled: true

  },
  { value: 'Flanker', label: 'Flanker' },
 
  {
    value: 'Front row',
    label:  'Front row',
    isDisabled: true

  },
  { value: 'Hooker', label: 'Hooker' },
  { value: 'Prop', label: 'Prop' }
]

export const rugbyPositions = [
  {
    label: 'Backs',
    options: rugbyBacks,
    color: '#0f81dc'
  },
  {
    label: 'Forwards',
    options: rugbyForwards,
  },
  {
    label: 'Utility players',
    options: [],
  },
];


//#Soccer positions options...

const SoccerDefender = [
  { value: 'Centre-back', label: 'Centre-back' },
  { value: 'Sweeper', label: 'Sweeper' },
  { value: 'Full-back', label: 'Full-back' },
  { value: 'Wing-back', label: 'Wing-back' }
]

const SoccerMidfielder = [
  { value: 'Centre midfield', label: 'Centre midfield' },
  { value: 'Defensive midfield', label: 'Defensive midfield' },
  { value: 'Attacking midfield', label: 'Attacking midfield' },
  { value: 'Wide midfield', label: 'Wide midfield' },
]

const SoccerForward = [
  { value: 'Striker', label: 'Striker' },
  { value: 'Centre forward', label: 'Centre forward' },
  { value: 'Winger', label: 'Winger' },
]

export const soccerPositions = [
  {
    label: 'Goalkeeper',
    options: [],
  },
  {
    label: 'Defender',
    options: SoccerDefender,
  },
  {
    label: 'Midfielder',
    options: SoccerMidfielder,
  },
  {
    label: 'Forward',
    options: SoccerForward,
  }
];

//# combat sports positon options...

export const combatSportsOptions = [
   { value: 'Boxing', label: 'Boxing' },
   { value: 'MMA', label: 'MMA' },
]

//#Military training positon options...

export const militaryTrainingOptions = [
   { value: 'Paratrooper', label: 'Paratrooper' },
   { value: 'Mortor firing', label: 'Mortor firing' },
   { value: 'Large caliber weapons', label: 'Large caliber weapons' },
   { value: 'Breaching', label: 'Breaching' },
]