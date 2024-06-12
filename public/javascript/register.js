
function allowNumbersOnly(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
}
  function confirmerModification() {
        alert('Modification réussi');
        window.location.href = '/';
    }