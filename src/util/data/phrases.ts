import { Phrases } from '../../types';

// object for storing phrases to be used in the game

const phrases: Phrases = {
  1: '"Is he single, though?"',
  2: '"Who`s playing again?"',
  3: 'Lip-syncing the national anthem',
  4: 'Misses a play because selfies',
  5: 'Rooting for whoever`s cuter',
  6: 'Beer pong',
  7: 'Overtime = more nachos',
  8: 'Eat football-shaped cookies',
  9: 'Ad with LGBTQ+ couple',
  10: 'Kiss Cam',
  11: 'Eat awesome hot wings',
  12: 'Just here for the ads',
  13: 'Halftime surprise',
  14: 'Rooting for the underdog',
  15: 'Just here for halftime',
  16: 'Favorite team scores',
  17: 'Player`s family on-screen',
  18: 'I made the snacks',
  19: 'I`m just here to eat',
  20: 'My team wins',
  21: 'My team loses',
  22: 'My team scores',
  23: 'My team fumbles',
  24: 'Surprise play',
  25: 'Teams are tied',
  26: 'Great interception',
  27: 'Gatorade poured on coach',
  28: 'New hashtag goes viral',
  29: 'I know all the halftime songs',
  30: 'Snack refill time',
  31: 'Team`s fight song plays',
  32: 'Coach yells on-screen',
  33: 'Someone fist-pumps',
  34: 'Touchdown celebration ',
  35: 'See a celebrity in the stands',
  36: 'Eat game-themed food',
  37: '"Did someone order pizza?"',
  38: 'See ad that makes me laugh',
  39: 'See ad that makes me cry',
  40: 'Wore team colors',
  41: 'Watching with friends',
  42: 'Watching with family',
  43: 'At my 1st gayme party ever',
  44: 'Need a drink refill',
  45: '"Can someone explain the rules?"',
  46: 'Someone explains the rules',
  47: 'Fan of the halftime performer',
  48: 'Players might kiss',
  49: 'Beer commercial',
  50: 'Dip spills on couch',
  51: 'Tailgate',
  52: 'People wearing face paint',
  53: 'People taking group photos',
  54: 'Watch the Puppy bowl',
  55: 'Player`s tight pants',
  56: 'Player wears glittery helmet',
  57: 'The halftime show is so extra',
  58: 'Cheerleaders work the runway',
  59: 'Celebrity cameo in commercial',
  60: 'New meme based on commercial',
  61: 'New meme based on halftime',
  62: 'New meme based on player',
  63: 'Consider skipping work tomorrow',
  64: 'Jon Batiste national anthem',
  65: 'Pigs in-a-blanket sighting',
  66: 'Forehead can crush',
  67: '"Case of the Mondays"',
  68: 'Crowd does the wave',
  69: 'Confetti cannons',
  70: 'T-shirt cannon',
  71: 'Lil Wayne appearance',
  72: 'Dancing mascot',
  73: 'Spilled your beer',
  74: 'Touchdown dance',
  75: 'Someone changes the channel',
  76: 'Bathroom break',
  77: 'Spilled dip on your shirt',
  78: 'AI ad',
  79: 'Budweiser Clydesdale',
  80: 'Spot Charli XCX',
  81: 'Spot Martha Stewart',
  82: 'Spot Matthew McConaghey',
  83: 'Pickleball',
  84: 'Spot David Beckham',
  85: 'Mascot battle',
  86: 'Spot Taylor Swift',
  87: 'Spectator runs on to field',
  88: 'Dating app commercial',
  89: 'Hang out with the pets',
  90: 'Spot KC Wolf mascot',
  91: 'Spot Swoop the Eagle mascot',
  92: 'Lincoln the Bald Eagle sighting',
  93: 'Jason Kelce takes shirt off',
  94: 'Donna Kelce appearance',
  95: 'Kylie Kelce in Eagles gear',
  96: 'Taylor Swift chugs beer ',
  97: 'Something about a "Tight End"',
  98: 'Travis makes touchdown catch',
  99: 'Something about "Wide Reciever"',
  100: 'Pat Mahomes makes a pass',
  101: 'Pat Mahomes makes a touchdown',
  102: 'Kareem Hunt makes a touchdown',
  103: 'Xavier Worthy makes a touchdown',
  104: 'Butker kicks field goal',
  105: 'Announcer says awkward innuendo',
  106: 'Jalen Hurts makes a pass',
  107: 'Jalen Hurts makes touchdown',
  108: 'Saquon Barkley makes touchdown',
  109: 'Dallas Goedert makes touchdown',
  110: 'Hear a T Swift song',
  111: 'Jake Elliott kicks field goal',
  112: '2 Pt conversions',
  113: 'Call under review',
  114: 'Car commercial',
  115: 'Challenge',
  116: 'Coach yelling at ref',
  117: 'Cointoss',
  118: 'Defense',
  119: 'Diving couch',
  120: 'Doritos Commercial',
  121: 'False start',
  122: 'FanDuel commercial',
  123: 'Field goal',
  124: 'First down',
  125: 'Fumble',
  126: 'Hail mary',
  127: 'Illegal hit',
  128: 'Interception',
  129: 'Kickoff',
  130: 'Missed field goal',
  131: 'Penalty',
  132: 'Personal foul',
  133: 'QB Blitz',
  134: 'QB Sack',
  135: 'Streaker on the field',
  136: 'Watch video replay',
  137: 'Eat King Cake',
  138: 'Spot an alligator',
  139: 'Eat a beignet',
  140: 'Wear/see beads necklace',
  141: 'Drink a daquiri',
  142: 'Bourbon Street mentioned',
  143: 'See a Fleur De Lis',
  144: 'French Quarter mentioned',
  145: 'Eat gumbo',
  146: 'Drink a hurricane',
  147: 'Eat Jambalaya',
  148: 'See Mardi Gras floats',
  149: 'Listen to New Orleans Jazz',
  150: 'Eat oysters',
  151: 'See a parade float',
  152: 'Eat a po-boy',
  153: 'Second Line band plays',
  154: 'Superdome',
  155: 'Go on a swamp tour',
  156: 'Ride/see a trolly',
  157: 'VooDoo mentioned',
  158: 'Tulane University mentioned',
  159: 'Geico Lizard appearance',
  160: 'Kendrick Lamar song titles',
  161: 'Player butt slap',
  162: '"Wide Open"',
  163: '"Taking it up the middle"',
  164: '"Going Deep"',
  165: '"Illegal Touching"',
  166: '"Caught from Behind"',
  167: '"Holding"',
  168: '"Go all the way"',
  169: '"Spread Formation"',
  170: '"Opening up a hole"',
  171: 'Spot Paul Rudd',
  172: 'Spot Bradley Cooper',
  173: 'Ledisi sings Lift Every Voice',
  174: 'Trombone Shorty performance',
  175: 'Lauren Daigle performance',
};

export default phrases;
