class GobletController {
    constructor(game_board) {
        this.game_board = game_board;
        //track the selected piece
        this.selected = {
            selected: false,
            index: -1
        };
    }


    on_board_space_click(index) {
        if (this.selected.selected === true) {
            //check to see if the selected piece can be placed.
            if (this.game_board.board_spaces[index].get_top_index() < this.selected.index) {
                //the piece is larger and can be placed
                this.game_board.place_piece(index, this.game_board.current_player, this.selected.index);
                this.selected = {
                    selected: false,
                    index: -1
                };
                //todo use modules or something smarter here
                if (this.game_board.current_player === 1) {
                    this.game_board.current_player = 2;
                } else {
                    this.game_board.current_player = 1;
                }

            }
        } else {
            //see if the current spot has a piece that can be selected
            if (this.game_board.board_spaces[index].get_top() === this.game_board.current_player) {
                //this piece can be selected, the user owns it
                this.selected.selected = true;
                this.selected.index = this.game_board.remove_top(index, false);
            }
        }
        this.game_board.update_view();
    }

    on_reserve_space_click(index) {
        //cases to return
        //if a piece is already selected it can't be moved to reserve, so return
        //if the piece is not the current players piece then it is
        if (this.selected.selected || this.game_board.reserve_spaces[index].get_top() !== this.game_board.current_player) {
            return;
        }
        this.selected.selected = true;
        this.selected.index = this.game_board.remove_top(index, true);
        this.game_board.update_view();
    }

}