window.onload = () => {
    if(document.querySelector('.loading-div') && document.querySelector('.loading-img')) {
        setTimeout(() => {
            document.querySelector('.loading-div').style.display = 'none';
            document.querySelector('.loading-img').style.display = 'none';
        }, 3000);
    }

    const toastNode = document.getElementById('toast-div');
    const toastError = document.getElementById('error-toast-div');

    if (toastNode) {
      const toast = new bootstrap.Toast(toastNode);
      toast.show();
    }

    if (toastError) {
      const toast = new bootstrap.Toast(toastError);
      toast.show();
    }
}