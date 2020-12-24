const goblet_model = new GameBoard(16, 6, 4);
const goblet_controller = new GobletController(goblet_model);
const goblet_view = new GameBoardView(goblet_controller);
goblet_model.pass_view(goblet_view);
goblet_model.update_view();