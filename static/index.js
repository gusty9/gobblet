//views
let local_button = document.querySelector('#local_button');
let create_match_button = document.querySelector('#create_match');
let join_match_button = document.querySelector('#join_match');
let room_id_text = document.querySelector('#room_id');

//sockets
const socket = io();

socket.on('connect', () => {
    console.log('connected callback');
});

//click listeners
//redirect the user to a local 2 player version of goblet
local_button.addEventListener('click', () => {
    window.location.href = '/local.html';
});

//create a new online match
create_match_button.addEventListener('click', () => {

});

//join an online match
join_match_button.addEventListener('click', () => {
    let id = room_id_text.value;
});