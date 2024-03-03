function initialBoard(board) {
    // Draw board
    for (let i = 1; i <= 8; i++) {
        const cellContainer = document.createElement("div");
        cellContainer.className = "cell-container";
        for (let j = 1; j <= 8; j++) {
            const cell = document.createElement("div");
            cell.className = "cell"
            cell.id = `${i}_${j}`
            // cell.innerHTML = `${i},${j}`;
            if (i%2 === 0 && j%2 === 0) {
                cell.style.background = "var(--black-cell-color)";
            }
            if (i%2 === 1 && j%2 === 1) {
                cell.style.background = "var(--black-cell-color)";
            }
            // const old_color = cell.style.background;
            // cell.addEventListener("mouseover", e => {
            //     e.target.style.background = "var(--cell-hover-color)";
            // });
            // cell.addEventListener("mouseout", e => {
            //     e.target.style.background = old_color;
            // })
            // cell.addEventListener("click", e => {
            //     const [row, col] = e.target.id.split("_");
            //     console.log(`${row},${col}`);
            // });
            cellContainer.append(cell);
        }
        board.append(cellContainer);
    }
}

function placePieces(board, gameState) {
    for (const kind in gameState) {
        ids = gameState[kind].ids;
        rows = gameState[kind].rows;
        cols = gameState[kind].cols;
        for (let i = 0; i < gameState[kind].ids.length; i++) {
            const cell = document.getElementById(`${rows[i]}_${cols[i]}`);
            const piece = document.createElement("div");
            piece.id = `${kind}_${ids[i]}`;
            piece.className = `${kind}-piece`;
            piece.addEventListener("click", move_piece);
            cell.append(piece);
        }
    }
}

function check_available(row, col) {
    const cell = document.getElementById(`${row}_${col}`);
    if (cell.firstChild) {
        const piece = cell.firstChild;
        const piece_id = piece.id.split("_");
        const kind = piece_id[0];
        const id = parseInt(piece_id[1]);
        return piece.id;
    }
    return "empty";
}

function move_piece(e) {
    const piece_id = e.target.id.split("_");
    const kind = piece_id[0];
    const id = parseInt(piece_id[1]);
    const i = gameState[kind].ids.indexOf(id);
    const row = gameState[kind].rows[i];
    const col = gameState[kind].cols[i];

    console.log(`${row}, ${col}`);
}

function gen_rows(start, end){
    let array = [];
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < end-start+2; j++) {
            array.push(i);
        }
    }
    return array;
}

function gen_rows(start, end){
    let array = [];
    for (let i = start; i <= end; i++) {
        for (let j = 0; j < end-start+2; j++) {
            array.push(i);
        }
    }
    return array;
}


let size = 8;
let board = document.getElementById("board");
let gameState = {
    blue: {
        ids: Array(size/2 * (size/2-1)).fill().map((_, i) => i + 1),
        rows: gen_rows(1, size/2-1),
        cols: [1,3,5,7,2,4,6,8,1,3,5,7]
    },
    red: {
        ids: Array(size/2 * (size/2-1)).fill().map((_, i) => i + 1),
        rows: gen_rows(size/2+2, size),
        cols: [2,4,6,8,1,3,5,7,2,4,6,8]
    }
}

initialBoard(board);
placePieces(board, gameState);

console.log(gen_rows(size/2+2, size));