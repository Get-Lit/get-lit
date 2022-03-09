const httpClient = axios.create({
    baseURL: 'https://getlit-bookclub.herokuapp.com' || 'http://localhost:3000'
})

const addParticipant = (id, button) => httpClient.post(`/participant/${id}`)
    .then((response) => {
        if(response.data.success){
            button.innerHTML = "JOIN ROOM";
            window.location.reload();
        } else {
            button.innerHTML = "LEAVE ROOM";
            window.location.reload();
        }
    })
    .catch(error => next(error));

const joinButton = document.getElementById('join-room-btn')
joinButton.onclick = (event) => {
    addParticipant(event.target.dataset.id, event.target);
}