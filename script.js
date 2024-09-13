const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');


const textareaInputListener = () => { 
    const maxChars = textareaEl.maxLength;
    const currChars = textareaEl.value.length;
    const charsLeft = maxChars - currChars;    
    // maxLength does not account for edge case of copy pasting into the textarea, need to fix.
    counterEl.textContent = charsLeft.toString();
};

textareaEl.addEventListener('input', textareaInputListener);








