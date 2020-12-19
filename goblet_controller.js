class GobletController {
    constructor(game_board) {
        this.game_board = game_board;
    }

    on_board_space_click(index) {
        if (this.game_board.selected_piece != null) {
            if (this.game_board.board_spaces[index].selected) {
                //deselect this piece
                this.game_board.board_spaces[index].selected = false;
                this.game_board.selected_piece = null;
                this.game_board.update_view();
                return;
            }

            //check to see if the selected piece can be placed.
            if (this.game_board.board_spaces[index].get_top_index() < this.game_board.selected_piece.get_top_index()) {
                this.game_board.place_piece(index);
            }
        } else {
            //see if the current spot has a piece that can be selected
            if (this.game_board.board_spaces[index].get_top() === this.game_board.current_player) {
                //this piece can be selected, the user owns it
                this.game_board.select_piece(index, false);
            }
        }
        this.game_board.update_view();
    }

    on_reserve_space_click(index) {
        //cases to return
        //if a piece is already selected it can't be moved to reserve, so return
        //if the piece is not the current players piece then it is
        if (this.game_board.selected_piece != null) {
            if (this.game_board.reserve_spaces[index].selected) {
                //deselect this piece
                this.game_board.reserve_spaces[index].selected = false;
                this.game_board.selected_piece = null;
                this.game_board.update_view();
            }
            return;
        }
        if (this.game_board.reserve_spaces[index].get_top() !== this.game_board.current_player) {
            return;
        }
       // this.selected.selected = true;
        //this.selected.index = this.game_board.remove_top(index, true);
        this.game_board.select_piece(index, true);
        this.game_board.update_view();
    }
}