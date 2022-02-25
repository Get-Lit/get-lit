window.onload = () => {
    const toastNode = document.getElementById('toast-div');
  
    if (toastNode) {
      const toast = new bootstrap.Toast(toastNode);
      toast.show();
    }
}