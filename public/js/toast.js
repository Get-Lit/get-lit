window.onload = () => {
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