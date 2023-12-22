// function to check for bingo
// whole row should be full
// whole column should be full
// or any diagonal
// check local storage for the keys of boxes that would win
// pop up an alert or similar saying bingo

// specifically checking for bingo rows
export function bingoRow() {
  // figuring out what is in local storage
  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .map((element) => {
      return element[0];
    });
  console.log('Boxes:', boxes);
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-1-1') &&
    boxes.includes('box-1-2') &&
    boxes.includes('box-1-3') &&
    boxes.includes('box-1-4')
  ) {
    // eventual make a separate function to invoke here
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-2-0') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-2-4')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-3-0') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-3-4')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-4-0') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-4-4')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-5-0') &&
    boxes.includes('box-5-1') &&
    boxes.includes('box-5-2') &&
    boxes.includes('box-5-3') &&
    boxes.includes('box-5-4')
  ) {
    console.log('BINGO');
    return true;
  }
  return false;
}

// specifically checking for bingo columns
export function bingoColumn() {
  // figuring out what is in local storage
  const boxes: string[] = Object.entries(localStorage)
    .filter((element) => {
      return element[0] !== 'items';
    })
    .map((element) => {
      return element[0];
    });
  console.log('Boxes:', boxes);
  if (
    boxes.includes('box-1-0') &&
    boxes.includes('box-2-0') &&
    boxes.includes('box-3-0') &&
    boxes.includes('box-4-0') &&
    boxes.includes('box-5-0')
  ) {
    // eventual make a separate function to invoke here
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-1-1') &&
    boxes.includes('box-2-1') &&
    boxes.includes('box-3-1') &&
    boxes.includes('box-4-1') &&
    boxes.includes('box-5-1')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-1-2') &&
    boxes.includes('box-2-2') &&
    boxes.includes('box-3-2') &&
    boxes.includes('box-4-2') &&
    boxes.includes('box-5-2')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-1-3') &&
    boxes.includes('box-2-3') &&
    boxes.includes('box-3-3') &&
    boxes.includes('box-4-3') &&
    boxes.includes('box-5-3')
  ) {
    console.log('BINGO');
    return true;
  } else if (
    boxes.includes('box-1-4') &&
    boxes.includes('box-2-4') &&
    boxes.includes('box-3-4') &&
    boxes.includes('box-4-4') &&
    boxes.includes('box-5-4')
  ) {
    console.log('BINGO');
    return true;
  }
  return false;
}
