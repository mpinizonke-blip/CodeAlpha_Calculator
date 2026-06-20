const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if(button.id === 'clear') {
      currentInput = '';
      display.value = '';
    } 
    else if(button.id === 'equals') {
      try {
        // Replace x with * for eval
        let expression = currentInput.replace(/x/g, '*');
        let result = eval(expression);
        display.value = result;
        currentInput = result.toString();
        shouldResetDisplay = true;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } 
    else {
      if(shouldResetDisplay && !isNaN(value)) {
        currentInput = '';
        shouldResetDisplay = false;
      }
      currentInput += value;
      display.value = currentInput;
    }
  });
});

// Keyboard support - bonus points
document.addEventListener('keydown', (e) => {
  if(e.key >= '0' && e.key <= '9') {
    currentInput += e.key;
    display.value = currentInput;
  }
  if(['+', '-', '*', '/'].includes(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  }
  if(e.key === 'Enter') {
    document.getElementById('equals').click();
  }
  if(e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
  if(e.key === 'Escape') {
    document.getElementById('clear').click();
  }
  if(e.key === '.') {
    currentInput += '.';
    display.value = currentInput;
  }
});