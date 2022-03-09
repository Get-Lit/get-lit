const httpClient = axios.create({
    baseURL: 'https://getlit-bookclub.herokuapp.com' || 'http://localhost:3000'
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