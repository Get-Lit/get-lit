window.onload = () => {
    if(document.querySelector('.loading-div') && document.querySelector('.loading-img')) {
        setTimeout(() => {
            document.querySelector('.loading-div').style.display = 'none';
            document.querySelector('.loading-img').style.display = 'none';
        }, 3000);
    }
}