// function to check for bingo
// whole row should be full
// whole column should be full
// or any diagonal
// check local storage for the keys of boxes that would win
// pop up an alert or similar saying bingo

// checking for bingo rows
export function bingoRow(): boolean {
  // figuring out what is in local storage
  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .map((element) => {
      return element[0];
    });
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-1-1') &&
    boxes.includes('box-1-2') &&
    boxes.includes('box-1-3') &&
    boxes.includes('box-1-4')
  ) {
    return true;
  } else if (
    boxes.includes('box-2-0') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-2-4')
  ) {
    return true;
  } else if (
    boxes.includes('box-3-0') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-3-4')
  ) {
    return true;
  } else if (
    boxes.includes('box-4-0') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-4-4')
  ) {
    return true;
  } else if (
    boxes.includes('box-5-0') &&
    boxes.includes('box-5-1') &&
    boxes.includes('box-5-2') &&
    boxes.includes('box-5-3') &&
    boxes.includes('box-5-4')
  ) {
    return true;
  } else if (
    // diagonal
    boxes.includes('box-1-0') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-5-4')
  ) {
    return true;
  } else if (
    // other diagonal
    boxes.includes('box-1-4') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-5-0')
  ) {
    return true;
  }
  return false;
}

// checking for bingo columns
export function bingoColumn(): boolean {
  // figuring out what is in local storage
  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .map((element) => {
      return element[0];
    });
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-2-0') &&
    boxes.includes('box-3-0') &&
    boxes.includes('box-4-0') &&
    boxes.includes('box-5-0')
  ) {
    return true;
  } else if (
    boxes.includes('box-1-1') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-5-1')
  ) {
    return true;
  } else if (
    boxes.includes('box-1-2') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-5-2')
  ) {
    return true;
  } else if (
    boxes.includes('box-1-3') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-5-3')
  ) {
    return true;
  } else if (
    boxes.includes('box-1-4') &&
    boxes.includes('box-2-4') &&
    boxes.includes('box-3-4') &&
    boxes.includes('box-4-4') &&
    boxes.includes('box-5-4')
  ) {
    return true;
  }
  return false;
}

// special patterns
export function bingoSpecial(): boolean {
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

  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .map((element) => {
      return element[0];
    });
  if (boxes.length === 25) {
  } else if (
    // #
    equals(boxes, hashtag) === true
  ) {
    return true;
  } else if (
    // L
    equals(boxes, L) === true
  ) {
    return true;
  } else if (
    // W
    equals(boxes, W) === true
  ) {
    return true;
  } else if (
    // T
    equals(boxes, T) === true
  ) {
    return true;
  }
  return false;
}
