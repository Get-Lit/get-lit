const httpClient = axios.create({
    baseURL: 'http://localhost:3000'
})

const likeBook = (id, icon) => httpClient.post(`/like/${id}`)
    .then(() => {
        icon.classList.toggle('icon-liked');
    })
    .catch(error => next(error))
    .finally(() => icon.classList.remove('icon-events-none'));


    document.querySelectorAll('.like-action').forEach(button => {
        button.onclick = (event) => {
            button.classList.add('icon-events-none');
            likeBook(event.target.dataset.id, event.target);
        }
    })

const addParticipant = (id, button) => httpClient.post(`/participant/${id}`)
    .then((response) => {
        console.log(response);
        if(response.data.success){
            button.innerHTML = "JOIN ROOM";
        } else {
            button.innerHTML = "LEAVE ROOM";
        }
    })
    .catch(error => next(error));

    const joinButton = document.getElementById('join-room-btn')

    joinButton.onclick = (event) => {
        addParticipant(event.target.dataset.id, event.target);
    }