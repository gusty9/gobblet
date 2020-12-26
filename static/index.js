//views
let create_match_button = document.querySelector('#create_match');
let join_match_button = document.querySelector('#join_match');
let room_id_text = document.querySelector('#room_id');

//create a new online match
create_match_button.addEventListener('click', () => {
    window.location.href = '/create';
});

//join an online match
join_match_button.addEventListener('click', () => {
    let id = room_id_text.value;
    window.location.href = `/${id}`;
});