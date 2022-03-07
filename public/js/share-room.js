//Funcionality to copy the link of the room to the clipboard
document.querySelectorAll('.share-room-btn').forEach(button => {
    button.onclick = (event) => {
        console.log(event.target.value)
        navigator.clipboard.writeText(event.target.value);

        alert("Link copied to Clipboard!");
    }
})