// function to check for bingo
// whole row should be full
// whole column should be full
// or any diagonal
// check local storage for the keys of boxes that would win
// pop up an alert or similar saying bingo

import { get } from "http";

// returns BingoResult object that has isBingo property and score
export interface BingoResult {
  isBingo: boolean;
  bingoPattern: string;
  score: number;
}

const getBoxes = () => {
  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .filter((element) => {
      return element.toString().split("-")[0] === 'box';
    })
    .map((element) => {
      return element[0];
    });

  return boxes;
}

// checking for bingo rows
export function bingoRow(): BingoResult {
  // figuring out what is in local storage
  const boxes = getBoxes()
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-1-1') &&
    boxes.includes('box-1-2') &&
    boxes.includes('box-1-3') &&
    boxes.includes('box-1-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'row' };

  } else if (
    boxes.includes('box-2-0') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-2-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'row' };

  } else if (
    boxes.includes('box-3-0') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-3-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'row' };

  } else if (
    boxes.includes('box-4-0') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-4-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'row' };

  } else if (
    boxes.includes('box-5-0') &&
    boxes.includes('box-5-1') &&
    boxes.includes('box-5-2') &&
    boxes.includes('box-5-3') &&
    boxes.includes('box-5-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'row' };

  } else if (
    // diagonal
    boxes.includes('box-1-0') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-5-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'diagonal' };

  } else if (
    // other diagonal
    boxes.includes('box-1-4') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-5-0')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'diagonal' };

  }
  return { isBingo: false, score: undefined, bingoPattern: undefined };

}

// checking for bingo columns
export function bingoColumn(): BingoResult {
  // figuring out what is in local storage
  const boxes = getBoxes()
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-2-0') &&
    boxes.includes('box-3-0') &&
    boxes.includes('box-4-0') &&
    boxes.includes('box-5-0')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'column' };
  } else if (
    boxes.includes('box-1-1') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-5-1')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'column' };

  } else if (
    boxes.includes('box-1-2') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-5-2')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'column' };

  } else if (
    boxes.includes('box-1-3') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-5-3')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'column' };

  } else if (
    boxes.includes('box-1-4') &&
    boxes.includes('box-2-4') &&
    boxes.includes('box-3-4') &&
    boxes.includes('box-4-4') &&
    boxes.includes('box-5-4')
  ) {
    return { isBingo: true, score: 25, bingoPattern: 'column' };

  }
  return { isBingo: false, score: undefined, bingoPattern: undefined };

}

// special patterns
export function bingoSpecial(): BingoResult {
  // these are sorted arrays that will be used for comparison to values stored in localStorage
  const hashtag: string[] = [
    'box-1-1',
    'box-1-3',
    'box-2-0',
    'box-2-1',
    'box-2-2',
    'box-2-3',
    'box-2-4',
    'box-3-1',
    'box-3-3',
    'box-4-0',
    'box-4-1',
    'box-4-2',
    'box-4-3',
    'box-4-4',
    'box-5-1',
    'box-5-3',
  ];

  const L: string[] = [
    'box-1-0',
    'box-2-0',
    'box-3-0',
    'box-4-0',
    'box-5-0',
    'box-5-1',
    'box-5-2',
    'box-5-3',
    'box-5-4',
  ];

  const W: string[] = [
    'box-1-0',
    'box-1-2',
    'box-1-4',
    'box-2-0',
    'box-2-2',
    'box-2-4',
    'box-3-0',
    'box-3-2',
    'box-3-4',
    'box-4-0',
    'box-4-2',
    'box-4-4',
    'box-5-0',
    'box-5-1',
    'box-5-2',
    'box-5-3',
    'box-5-4',
  ];

  const T: string[] = [
    'box-1-0',
    'box-1-1',
    'box-1-2',
    'box-1-3',
    'box-1-4',
    'box-2-2',
    'box-3-2',
    'box-4-2',
    'box-5-2',
  ];

  function equals(array1: string[], array2: string[]): boolean {
    return array1.sort().every((element, index) => element === array2[index]);
  }

  function containsAllBoxes(boxes: string[], pattern: string[]): boolean {
    const boxSet = new Set(boxes);

    for (const box of pattern) {
      if (!boxSet.has(box)) {
        return false;
      }
    }

    return true
  }

  // const boxes: string[] = Object.entries(localStorage)
  //   .filter((element) => {
  //     return element[0] !== 'items';
  //   })
  //   .map((element) => {
  //     return element[0];
  //   });

  const boxes = getBoxes()

  // Short circuit if not enough boxes to make up a score
  if (boxes.length < 5) return { isBingo: false, score: undefined, bingoPattern: undefined };

  if (boxes.length === 25) {
    return { isBingo: true, score: 125, bingoPattern: 'blackout' };
  } else if (
    // #
    containsAllBoxes(boxes, hashtag) === true
  ) {
    return { isBingo: true, score: 80, bingoPattern: '#' };
  } else if (
    // W
    containsAllBoxes(boxes, W) === true
  ) {
    return { isBingo: true, score: 85, bingoPattern: 'W' };
  } else if (
    // L
    containsAllBoxes(boxes, L) === true
  ) {
    return { isBingo: true, score: 45, bingoPattern: 'L' };
  } else if (
    // T
    containsAllBoxes(boxes, T) === true
  ) {
    return { isBingo: true, score: 45, bingoPattern: 'T' };
  }
  return { isBingo: false, score: undefined, bingoPattern: undefined };
}
