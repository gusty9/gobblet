class GameBoardView {
    constructor(goblet_controller) {
        //bind the board views
        this.board_spaces = [
            document.querySelector('#s0'),
            document.querySelector('#s1'),
            document.querySelector('#s2'),
            document.querySelector('#s3'),
            document.querySelector('#s4'),
            document.querySelector('#s5'),
            document.querySelector('#s6'),
            document.querySelector('#s7'),
            document.querySelector('#s8'),
            document.querySelector('#s9'),
            document.querySelector('#s10'),
            document.querySelector('#s11'),
            document.querySelector('#s12'),
            document.querySelector('#s13'),
            document.querySelector('#s14'),
            document.querySelector('#s15')
        ];
        for (let i = 0; i < this.board_spaces.length; i++) {
            this.board_spaces[i].addEventListener('click', function() {
                goblet_controller.on_board_space_click(i);
            });
        }
        //bind the reserve space views
        this.reserve_spaces = [
            document.querySelector('#u0'),
            document.querySelector('#u1'),
            document.querySelector('#u2'),
            document.querySelector('#u3'),
            document.querySelector('#u4'),
            document.querySelector('#u5')
        ];
        for (let i = 0; i < this.reserve_spaces.length; i++) {
            this.reserve_spaces[i].addEventListener('click', function() {
                goblet_controller.on_reserve_space_click(i);
            });
        }
        //bind the view for the player spaces
        this.player_turn = document.querySelector('#player_num');
    }
}