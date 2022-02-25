document.addEventListener('DOMContentLoaded', () => {
    function onClickPasswordToggle(event) {
      const button = event.currentTarget;
      const input = button.previousElementSibling;
      const icon = button.querySelector('i');
  
      if (input.type === 'text') {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
  
    document.querySelectorAll('.password-toggle')
      .forEach(button => button.addEventListener('click', onClickPasswordToggle));
})