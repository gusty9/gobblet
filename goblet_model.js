class GameBoard {
    constructor(num_spaces, num_reserve, num_per_stack) {
        this.goblet_view = null;
        this.board_spaces = [];
        this.reserve_spaces = [];
        //set up the empty game board
        for (let i = 0; i < num_spaces; i++) {
            this.board_spaces[i] = new GameSpot(num_per_stack, 0);
        }
        //setup the reserve spots for the two players
        for (let i = 0; i < num_reserve; i++) {
            if (i >= num_reserve/2) {
                //reserve pieces for player one
                this.reserve_spaces[i] = new GameSpot(num_per_stack, 2);
            } else {
                //reserve pieces for player two
                this.reserve_spaces[i] = new GameSpot(num_per_stack, 1);
            }
        }
    }

    //remove the top piece of a GameSpot
    remove_top(index, reserve) {
        let ret;
        if (reserve) {
            ret = this.reserve_spaces[index].remove_top()
        } else {
            ret = this.board_spaces[index].remove_top();
        }
        this.update_view()
        return ret;
    }

    //add the top piece of a GameSpot
    place_piece(index, value, z) {
        this.board_spaces[index].place_piece(value, z);
        this.update_view();
        this.check_winner()
    }

    //check if there is a winner, report who the winner is
    check_winner() {
        //check all horizontal
        let player_won = false;
        let winner;
        let where_string;
        if (this.check_winner_row(0)) {
            player_won = true;
            winner = this.board_spaces[0].get_top();
            where_string = 'on row 1';
        } else if (this.check_winner_row(4)) {
            player_won = true;
            winner = this.board_spaces[4].get_top();
            where_string = 'on row 2';
        } else if (this.check_winner_row(8)) {
            player_won = true;
            winner = this.board_spaces[8].get_top();
            where_string = 'on row 3';
        } else if (this.check_winner_row(12)) {
            player_won = true;
            winner = this.board_spaces[12].get_top();
            where_string = 'on row 4';
        }
        //check all vertical
        else if (this.check_winner_column(0)) {
            player_won = true;
            winner = this.board_spaces[0].get_top();
            where_string = 'on column 1';
        } else if (this.check_winner_column(1)) {
            player_won = true;
            winner = this.board_spaces[1].get_top();
            where_string = 'on column 2';
        } else if (this.check_winner_column(2)) {
            player_won = true;
            winner = this.board_spaces[2].get_top();
            where_string = 'on column 3';
        } else if (this.check_winner_column(3)) {
            player_won = true;
            winner = this.board_spaces[3].get_top();
            where_string = 'on column 4';
        }
        //check diagonals
        else if (this.check_winner_diagonal_left(0)) {
            player_won = true;
            winner = this.board_spaces[0].get_top();
            where_string = 'on the top left diagonal';
        } else if (this.check_winner_diagonal_right(3)) {
            player_won = true;
            winner = this.board_spaces[3].get_top();
            where_string = 'on the top right diagonal';
        }
        if (player_won) {
            alert(`Player ${winner} won ${where_string}`)
        }
    }

    check_winner_row(start_index) {
        return (this.board_spaces[start_index + 0].get_top() === this.board_spaces[start_index + 1].get_top()
            && this.board_spaces[start_index + 1].get_top() === this.board_spaces[start_index + 2].get_top()
            && this.board_spaces[start_index + 2].get_top() === this.board_spaces[start_index + 3].get_top()
            && this.board_spaces[start_index + 0].get_top()>0);
    }

    check_winner_column(start_index) {
        return (this.board_spaces[start_index + 0].get_top() === this.board_spaces[start_index + 4].get_top()
            && this.board_spaces[start_index + 4].get_top() === this.board_spaces[start_index + 8].get_top()
            && this.board_spaces[start_index + 8].get_top() === this.board_spaces[start_index + 12].get_top()
            && this.board_spaces[start_index + 0].get_top()>0);
    }

    check_winner_diagonal_left(start_index) {
        return (this.board_spaces[start_index + 0].get_top() === this.board_spaces[start_index + 5].get_top()
            && this.board_spaces[start_index + 5].get_top() === this.board_spaces[start_index + 10].get_top()
            && this.board_spaces[start_index + 10].get_top() === this.board_spaces[start_index + 15].get_top()
            && this.board_spaces[start_index + 0].get_top()>0);
    }

    check_winner_diagonal_right(start_index) {
        return (this.board_spaces[start_index + 0].get_top() === this.board_spaces[start_index + 3].get_top()
            && this.board_spaces[start_index + 3].get_top() === this.board_spaces[start_index + 6].get_top()
            && this.board_spaces[start_index + 6].get_top() === this.board_spaces[start_index + 9].get_top()
            && this.board_spaces[start_index + 0].get_top()>0);
    }

    pass_view(goblet_view) {
        this.goblet_view = goblet_view;
    }

    update_view() {
        //update the board squares
        for (let i = 0; i < this.board_spaces.length; i++) {
            this.goblet_view.board_spaces[i].innerHTML = `${this.board_spaces[i].get_top_index() + 1}`;
            let owner = this.board_spaces[i].get_top();
            switch(owner) {
                case 0:
                    this.goblet_view.board_spaces[i].classList.remove('player1');
                    this.goblet_view.board_spaces[i].classList.remove('player2');
                    this.goblet_view.board_spaces[i].classList.add('empty');
                    break;
                case 1:
                    this.goblet_view.board_spaces[i].classList.remove('empty');
                    this.goblet_view.board_spaces[i].classList.remove('player2');
                    this.goblet_view.board_spaces[i].classList.add('player1');
                    break;
                case 2:
                    this.goblet_view.board_spaces[i].classList.remove('empty');
                    this.goblet_view.board_spaces[i].classList.remove('player1');
                    this.goblet_view.board_spaces[i].classList.add('player2');
                    break;
            }
        }

        for (let i = 0; i < this.reserve_spaces.length; i++) {
            this.goblet_view.reserve_spaces[i].innerHTML = `${this.reserve_spaces[i].get_top_index() + 1}`;
        }
    }
}

class GameSpot {
    constructor(num_per_stack, initial_value) {
        this.gamespot = [];
        for (let i = 0; i < num_per_stack; i++) {
            this.gamespot[i] = initial_value;
        }
    }

    //removes the top piece from the stack if there is one
    remove_top() {
        for (let i = this.gamespot.length - 1; i >= 0; i--) {
            if (this.gamespot[i] !== 0) {
                this.gamespot[i] = 0;
                return i;
            }
        }
    }

    //place the piece at the specified z location
    place_piece(value, z) {
        this.gamespot[z] = value;
    }

    //return who currently owns this spot
    get_top() {
        for (let i = this.gamespot.length - 1; i >= 0; i--) {
            if (this.gamespot[i] !== 0) {
                return this.gamespot[i];
            }
        }
        return 0;
    }

    //return the z value of this current spot
    get_top_index() {
        for (let i = this.gamespot.length - 1; i >= 0; i--) {
            if (this.gamespot[i] !== 0) {
                return i;
            }
        }
        return -1;
    }
}