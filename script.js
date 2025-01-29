let display = document.getElementById('result');
let expression = '';

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        
        if (value === 'C') {
            // Clear everything
            expression = '';
            display.value = '';
        }
        else if (value === '←') {
            // Delete last character
            expression = expression.slice(0, -1);
            display.value = expression;
        }
        else if (value === '=') {
            try {
                // Evaluate the expression
                const result = eval(expression);
                display.value = Number.isInteger(result) ? result : result.toFixed(2);
                expression = display.value;
            } catch (error) {
                display.value = 'Error';
                expression = '';
            }
        }
        else {
            // Add character to expression
            expression += value;
            display.value = expression;
        }
    });
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Escape'];
    
    if (allowedKeys.includes(key)) {
        event.preventDefault();
        if (key === 'Enter') {
            document.querySelector('button[data-value="="]').click();
        }
        else if (key === 'Backspace') {
            document.querySelector('button[data-value="←"]').click();
        }
        else if (key === 'Escape') {
            document.querySelector('button[data-value="C"]').click();
        }
        else {
            const button = document.querySelector(`button[data-value="${key}"]`);
            if (button) button.click();
        }
    }
});