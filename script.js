const board = [
  null,
  0,
  null,
  1,
  null,
  2,
  null,
  3,
  4,
  null,
  5,
  null,
  6,
  null,
  7,
  null,
  null,
  8,
  null,
  9,
  null,
  10,
  null,
  11,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  12,
  null,
  13,
  null,
  14,
  null,
  15,
  null,
  null,
  16,
  null,
  17,
  null,
  18,
  null,
  19,
  20,
  null,
  21,
  null,
  22,
  null,
  23,
  null,
];

// parses pieceId's and returns the index of that piece's place on the board
let find_piece = function (piece_id) {
  let parsed = parseInt(piece_id);
  return board.indexOf(parsed);
};

// DOM referenes
const cells = document.querySelectorAll("td");
let reds_pieces = document.querySelectorAll("p");
let blues_pieces = document.querySelectorAll("span");
const red_turn_text = document.querySelectorAll(".red-turn-text");
const blue_turn_text = document.querySelectorAll(".blue-turn-text");
const divider = document.querySelector("#divider");

// player properties
let turn = true;
let red_score = 12;
let blue_score = 12;
let player_pieces;

// selected piece properties
let selected_piece = {
  piece_id: -1,
  index_of_board_piece: -1,
  is_king: false,
  seventh_space: false,
  ninth_space: false,
  fourteenth_space: false,
  eighteenth_space: false,
  minus_seventh_space: false,
  minus_ninth_space: false,
  minus_fourteenth_space: false,
  minus_eighteenth_space: false,
};

/*---------- Event Listeners ----------*/

// initialize event listeners on pieces
function give_pieces_event_listeners() {
  if (turn) {
    for (let i = 0; i < reds_pieces.length; i++) {
      reds_pieces[i].addEventListener("click", get_player_pieces);
    }
  } else {
    for (let i = 0; i < blues_pieces.length; i++) {
      blues_pieces[i].addEventListener("click", get_player_pieces);
    }
  }
}

/*---------- Logic ----------*/

// holds the length of the players piece count
function get_player_pieces() {
  if (turn) {
    player_pieces = reds_pieces;
  } else {
    player_pieces = blues_pieces;
  }
  remove_cell_onclick();
  redraw_borders();
}

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function remove_cell_onclick() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

// resets borders to default
function redraw_borders() {
  for (let i = 0; i < player_pieces.length; i++) {
    player_pieces[i].style.border = "1px solid white";
  }
  reset_selected_piece_properties();
  get_selected_piece();
}

// resets selected piece properties
function reset_selected_piece_properties() {
  selected_piece.piece_id = -1;
  selected_piece.piece_id = -1;
  selected_piece.is_king = false;
  selected_piece.seventh_space = false;
  selected_piece.ninth_space = false;
  selected_piece.fourteenth_space = false;
  selected_piece.eighteenth_space = false;
  selected_piece.minus_seventh_space = false;
  selected_piece.minus_ninth_space = false;
  selected_piece.minus_fourteenth_space = false;
  selected_piece.minus_eighteenth_space = false;
}

// gets ID and index of the board cell its on
function get_selected_piece() {
  selected_piece.piece_id = parseInt(event.target.id);
  selected_piece.index_of_board_piece = find_piece(selected_piece.piece_id);
  is_piece_king();
}

// checks if selected piece is a king
function is_piece_king() {
  if (
    document.getElementById(selected_piece.piece_id).classList.contains("king")
  ) {
    selected_piece.is_king = true;
  } else {
    selected_piece.is_king = false;
  }
  get_available_spaces();
}

// gets the moves that the selected piece can make
function get_available_spaces() {
  if (
    board[selected_piece.index_of_board_piece + 7] === null &&
    cells[selected_piece.index_of_board_piece + 7].classList.contains(
      "noPieceHere",
    ) !== true
  ) {
    selected_piece.seventh_space = true;
  }
  if (
    board[selected_piece.index_of_board_piece + 9] === null &&
    cells[selected_piece.index_of_board_piece + 9].classList.contains(
      "noPieceHere",
    ) !== true
  ) {
    selected_piece.ninth_space = true;
  }
  if (
    board[selected_piece.index_of_board_piece - 7] === null &&
    cells[selected_piece.index_of_board_piece - 7].classList.contains(
      "noPieceHere",
    ) !== true
  ) {
    selected_piece.minus_seventh_space = true;
  }
  if (
    board[selected_piece.index_of_board_piece - 9] === null &&
    cells[selected_piece.index_of_board_piece - 9].classList.contains(
      "noPieceHere",
    ) !== true
  ) {
    selected_piece.minus_ninth_space = true;
  }
  check_available_jumpSpaces();
}

// gets the moves that the selected piece can jump
function check_available_jumpSpaces() {
  if (turn) {
    if (
      board[selected_piece.index_of_board_piece + 14] === null &&
      cells[selected_piece.index_of_board_piece + 14].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece + 7] >= 12
    ) {
      selected_piece.fourteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece + 18] === null &&
      cells[selected_piece.index_of_board_piece + 18].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece + 9] >= 12
    ) {
      selected_piece.eighteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece - 14] === null &&
      cells[selected_piece.index_of_board_piece - 14].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece - 7] >= 12
    ) {
      selected_piece.minus_fourteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece - 18] === null &&
      cells[selected_piece.index_of_board_piece - 18].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece - 9] >= 12
    ) {
      selected_piece.minus_eighteenth_space = true;
    }
  } else {
    if (
      board[selected_piece.index_of_board_piece + 14] === null &&
      cells[selected_piece.index_of_board_piece + 14].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece + 7] < 12 &&
      board[selected_piece.index_of_board_piece + 7] !== null
    ) {
      selected_piece.fourteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece + 18] === null &&
      cells[selected_piece.index_of_board_piece + 18].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece + 9] < 12 &&
      board[selected_piece.index_of_board_piece + 9] !== null
    ) {
      selected_piece.eighteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece - 14] === null &&
      cells[selected_piece.index_of_board_piece - 14].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece - 7] < 12 &&
      board[selected_piece.index_of_board_piece - 7] !== null
    ) {
      selected_piece.minus_fourteenth_space = true;
    }
    if (
      board[selected_piece.index_of_board_piece - 18] === null &&
      cells[selected_piece.index_of_board_piece - 18].classList.contains(
        "noPieceHere",
      ) !== true &&
      board[selected_piece.index_of_board_piece - 9] < 12 &&
      board[selected_piece.index_of_board_piece - 9] !== null
    ) {
      selected_piece.minus_eighteenth_space = true;
    }
  }
  check_piece_conditions();
}

// restricts movement if the piece is a king
function check_piece_conditions() {
  if (selected_piece.is_king) {
    give_piece_border();
  } else {
    if (turn) {
      selected_piece.minus_seventh_space = false;
      selected_piece.minus_ninth_space = false;
      selected_piece.minus_fourteenth_space = false;
      selected_piece.minus_eighteenth_space = false;
    } else {
      selected_piece.seventh_space = false;
      selected_piece.ninth_space = false;
      selected_piece.fourteenth_space = false;
      selected_piece.eighteenth_space = false;
    }
    give_piece_border();
  }
}

// gives the piece a green highlight for the user (showing its movable)
function give_piece_border() {
  if (
    selected_piece.seventh_space ||
    selected_piece.ninth_space ||
    selected_piece.fourteenth_space ||
    selected_piece.eighteenth_space ||
    selected_piece.minus_seventh_space ||
    selected_piece.minus_ninth_space ||
    selected_piece.minus_fourteenth_space ||
    selected_piece.minus_eighteenth_space
  ) {
    document.getElementById(selected_piece.piece_id).style.border =
      "3px solid green";
    give_cells_click();
  } else {
    return;
  }
}

// gives the cells on the board a 'click' bassed on the possible moves
function give_cells_click() {
  if (selected_piece.seventh_space) {
    cells[selected_piece.index_of_board_piece + 7].setAttribute(
      "onclick",
      "make_move(7)",
    );
  }
  if (selected_piece.ninth_space) {
    cells[selected_piece.index_of_board_piece + 9].setAttribute(
      "onclick",
      "make_move(9)",
    );
  }
  if (selected_piece.fourteenth_space) {
    cells[selected_piece.index_of_board_piece + 14].setAttribute(
      "onclick",
      "make_move(14)",
    );
  }
  if (selected_piece.eighteenth_space) {
    cells[selected_piece.index_of_board_piece + 18].setAttribute(
      "onclick",
      "make_move(18)",
    );
  }
  if (selected_piece.minus_seventh_space) {
    cells[selected_piece.index_of_board_piece - 7].setAttribute(
      "onclick",
      "make_move(-7)",
    );
  }
  if (selected_piece.minus_ninth_space) {
    cells[selected_piece.index_of_board_piece - 9].setAttribute(
      "onclick",
      "make_move(-9)",
    );
  }
  if (selected_piece.minus_fourteenth_space) {
    cells[selected_piece.index_of_board_piece - 14].setAttribute(
      "onclick",
      "make_move(-14)",
    );
  }
  if (selected_piece.minus_eighteenth_space) {
    cells[selected_piece.index_of_board_piece - 18].setAttribute(
      "onclick",
      "make_move(-18)",
    );
  }
}

/* v when the cell is clicked v */

// makes the move that was clicked
function make_move(number) {
  document.getElementById(selected_piece.piece_id).remove();
  cells[selected_piece.index_of_board_piece].innerHTML = "";
  if (turn) {
    if (selected_piece.is_king) {
      cells[selected_piece.index_of_board_piece + number].innerHTML =
        `<p class="red-piece king" id="${selected_piece.piece_id}"></p>`;
      reds_pieces = document.querySelectorAll("p");
    } else {
      cells[selected_piece.index_of_board_piece + number].innerHTML =
        `<p class="red-piece" id="${selected_piece.piece_id}"></p>`;
      reds_pieces = document.querySelectorAll("p");
    }
  } else {
    if (selected_piece.is_king) {
      cells[selected_piece.index_of_board_piece + number].innerHTML =
        `<span class="blue-piece king" id="${selected_piece.piece_id}"></span>`;
      blues_pieces = document.querySelectorAll("span");
    } else {
      cells[selected_piece.index_of_board_piece + number].innerHTML =
        `<span class="blue-piece" id="${selected_piece.piece_id}"></span>`;
      blues_pieces = document.querySelectorAll("span");
    }
  }

  let idx_of_piece = selected_piece.index_of_board_piece;
  if (number === 14 || number === -14 || number === 18 || number === -18) {
    change_data(idx_of_piece, idx_of_piece + number, idx_of_piece + number / 2);
  } else {
    change_data(idx_of_piece, idx_of_piece + number);
  }
}

// Changes the board states data on the back end
function change_data(index_of_board_piece, modified_idx, remove_piece) {
  board[index_of_board_piece] = null;
  board[modified_idx] = parseInt(selected_piece.piece_id);
  if (turn && selected_piece.piece_id < 12 && modified_idx >= 57) {
    document.getElementById(selected_piece.piece_id).classList.add("king");
  }
  if (turn === false && selected_piece.piece_id >= 12 && modified_idx <= 7) {
    document.getElementById(selected_piece.piece_id).classList.add("king");
  }
  if (remove_piece) {
    board[remove_piece] = null;
    if (turn && selected_piece.piece_id < 12) {
      cells[remove_piece].innerHTML = "";
      blue_score--;
    }
    if (turn === false && selected_piece.piece_id >= 12) {
      cells[remove_piece].innerHTML = "";
      red_score--;
    }
  }
  reset_selected_piece_properties();
  remove_cell_onclick();
  remove_event_listeners();
}

// removes the 'onClick' event listeners for pieces
function remove_event_listeners() {
  if (turn) {
    for (let i = 0; i < reds_pieces.length; i++) {
      reds_pieces[i].removeEventListener("click", get_player_pieces);
    }
  } else {
    for (let i = 0; i < blues_pieces.length; i++) {
      blues_pieces[i].removeEventListener("click", get_player_pieces);
    }
  }
  check_for_win();
}

// Checks for a win
function check_for_win() {
  if (blue_score === 0) {
    divider.style.display = "none";
    for (let i = 0; i < red_turn_text.length; i++) {
      red_turn_text[i].style.color = "blue";
      blue_turn_text[i].style.display = "none";
      red_turn_text[i].textContent = "RED WINS!";
    }
  } else if (red_score === 0) {
    divider.style.display = "none";
    for (let i = 0; i < blue_turn_text.length; i++) {
      blue_turn_text[i].style.color = "blue";
      red_turn_text[i].style.display = "none";
      blue_turn_text[i].textContent = "BLUE WINS!";
    }
  }
  change_player();
}

// Switches players turn
function change_player() {
  if (turn) {
    turn = false;
    for (let i = 0; i < red_turn_text.length; i++) {
      red_turn_text[i].style.color = "lightGrey";
      blue_turn_text[i].style.color = "blue";
    }
  } else {
    turn = true;
    for (let i = 0; i < blue_turn_text.length; i++) {
      blue_turn_text[i].style.color = "lightGrey";
      red_turn_text[i].style.color = "blue";
    }
  }
  give_pieces_event_listeners();
}

give_pieces_event_listeners();
