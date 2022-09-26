export const ConvertCoordinateToNumber = (indexRow, colCount, indexCol) => {
  return indexRow * colCount * 1 + indexCol * 1;
};

export const calculateWinner = (
  squares,
  col,
  row,
  currentSelected,
  currentCoordinate,
  currentPlayer
) => {
  if (currentCoordinate === undefined) {
    return [null, null];
  }
  let position = ConvertCoordinateToNumber(
    currentCoordinate.x,
    col,
    currentCoordinate.y
  );
  let winingLine = [position];

  //Check row
  let rightCount = 0,
    leftCount = 0,
    rightIndex = currentCoordinate.y,
    leftIndex = currentCoordinate.y,
    rowPosition = position;

  while (rightIndex <= col - 2) {
    if (squares[rowPosition] === squares[rowPosition + 1]) {
      rightCount++;
      winingLine.push(rowPosition + 1);
    } else break;
    rightIndex++;
    rowPosition++;
  }
  rowPosition = position;

  while (leftIndex >= 1) {
    if (squares[rowPosition] === squares[rowPosition - 1]) {
      leftCount++;
      winingLine.push(rowPosition - 1);
    } else break;
    leftIndex--;
    rowPosition--;
  }
  if (rightCount + leftCount + 1 >= 5) {
    return [squares[position], winingLine];
  }

  //Check Column
  winingLine = [position];
  let topCount = 0,
    bottomCount = 0,
    topIndex = currentCoordinate.x,
    bottomIndex = currentCoordinate.x,
    colPosition = position;
  while (bottomIndex <= row - 2) {
    if (squares[colPosition] === squares[colPosition * 1 + col * 1]) {
      bottomCount++;
      winingLine.push(colPosition * 1 + col * 1);
    } else break;
    bottomIndex++;
    colPosition += col * 1;
  }
  colPosition = position;

  while (topIndex >= 1) {
    if (squares[colPosition] === squares[colPosition - col]) {
      topCount++;
      winingLine.push(colPosition - col);
    } else break;
    topIndex--;
    colPosition -= col;
  }
  if (bottomCount + topCount + 1 >= 5) {
    return [squares[position], winingLine];
  }

  //Check diagonal
  winingLine = [position];
  let topLeftCount = 0,
    bottomRightCount = 0,
    topLeftIndex = { ...currentCoordinate },
    bottomRightIndex = { ...currentCoordinate },
    diagonalPosition = position;
  while (topLeftIndex.x >= 1 && topLeftIndex.y >= 1) {
    if (squares[diagonalPosition] === squares[diagonalPosition - col - 1]) {
      topLeftCount++;
      winingLine.push(diagonalPosition - col - 1);
    } else break;
    topLeftIndex.x--;
    topLeftIndex.y--;
    diagonalPosition = diagonalPosition - col * 1 - 1;
  }
  diagonalPosition = position;

  while (bottomRightIndex.x <= row - 2 && bottomRightIndex.y <= col - 2) {
    if (squares[diagonalPosition] === squares[diagonalPosition + col * 1 + 1]) {
      bottomRightCount++;
      winingLine.push(diagonalPosition + col * 1 + 1);
    } else break;
    bottomRightIndex.x++;
    bottomRightIndex.y++;
    diagonalPosition += col * 1 + 1;
  }
  if (topLeftCount + bottomRightCount + 1 >= 5) {
    return [squares[position], winingLine];
  }
  //Check reverse diagonal
  winingLine = [position];
  let topRightCount = 0,
    bottomLeftCount = 0,
    topRightIndex = { ...currentCoordinate },
    bottomLeftIndex = { ...currentCoordinate },
    reverseDiagonalPosition = position;
  while (topRightIndex.x >= 1 && topRightIndex.y <= col - 2) {
    if (
      squares[reverseDiagonalPosition] ===
      squares[reverseDiagonalPosition - col + 1]
    ) {
      topRightCount++;
      winingLine.push(reverseDiagonalPosition - col + 1);
    } else break;
    topRightIndex.x--;
    topRightIndex.y++;
    reverseDiagonalPosition = reverseDiagonalPosition - col * 1 + 1;
  }
  reverseDiagonalPosition = position;

  while (bottomLeftIndex.x <= row - 2 && bottomLeftIndex.y >= 1) {
    if (
      squares[reverseDiagonalPosition] ===
      squares[reverseDiagonalPosition + col * 1 - 1]
    ) {
      bottomLeftCount++;
      winingLine.push(reverseDiagonalPosition + col * 1 - 1);
    } else break;
    bottomLeftIndex.x++;
    bottomLeftIndex.y--;
    reverseDiagonalPosition += col * 1 - 1;
  }
  if (topRightCount + bottomLeftCount + 1 >= 5) {
    return [squares[position], winingLine];
  }
  //Else continue
  return [null, null];
};
