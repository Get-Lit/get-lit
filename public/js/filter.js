function filterBooks() {
    const inputTitle = document.getElementById('findBookByTitle').value.toUpperCase();
    const inputAuthor = document.getElementById('findBookByAuthor').value.toUpperCase();
    const bookCards = document.getElementsByClassName('book-card')
    
    for (i = 0; i < bookCards.length; i++) {
        const bookTitle = bookCards[i].getElementsByTagName('h4')[0].innerHTML;
        const bookAuthor = bookCards[i].getElementsByTagName('p')[0].innerHTML;

        if (bookTitle.toUpperCase().indexOf(inputTitle) > -1 && bookAuthor.toUpperCase().indexOf(inputAuthor) > -1) {
            bookCards[i].style.display = '';
        } else {
            bookCards[i].style.display = 'none';
        }
    }
}

function filterRooms() {
    const inputName = document.getElementById('findRoomByName').value.toUpperCase();
    const inputBook = document.getElementById('findRoomByBook').value.toUpperCase();
    const roomCards = document.getElementsByClassName('room-card')
    
    for (i = 0; i < roomCards.length; i++) {
        const roomName = roomCards[i].getElementsByTagName('h4')[0].innerHTML;
        const roomBook = roomCards[i].getElementsByTagName('h5')[0].innerHTML;

        if (roomName.toUpperCase().indexOf(inputName) > -1 && roomBook.toUpperCase().indexOf(inputBook) > -1) {
            roomCards[i].style.display = '';
        } else {
            roomCards[i].style.display = 'none';
        }
    }
}