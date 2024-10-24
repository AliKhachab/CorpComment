// GLOBAL
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');

// COUNTER COMPONENT

const textareaInputListener = () => { 
    const maxChars = textareaEl.maxLength;
    const currChars = textareaEl.value.length;
    const charsLeft = maxChars - currChars;    
    // maxLength does not account for edge case of copy pasting into the textarea, need to fix.
    counterEl.textContent = charsLeft.toString();
};

textareaEl.addEventListener('input', textareaInputListener);

// SUBMIT COMPONENT

const submitHandler = event => {
    // prevent default browser action of refreshing page on submit press
    event.preventDefault();

    // get text from text area and validate it
    const text = textareaEl.value;
    if (text.includes('#') && text.length >= 5) {
        formEl.classList.add('form--valid');
        setTimeout(() => {
            formEl.classList.remove('form--valid');
        }, 2000);
    } else {
        formEl.classList.add('form--invalid');
        setTimeout(() => {
            formEl.classList.remove('form--invalid');
        }, 2000);
        
        textareaEl.focus();

        return;
    }

    // get the first company name hashtag in the text (if charAt index 0 of a word is #, that is now the hashtag)
    const hashtag = text.split(' ').find(element => element.charAt(0) === '#');
    const companyName = hashtag.substring(1);
    const badgeLetter = companyName.charAt(0).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // new feedback item HTML

    const feedbackItemHTML = 
    `<li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upcvote__icon"></i>
            <span class="upvote__count">${upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${companyName}</p>
            <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${daysAgo}</p>
    </li>`;
};

formEl.addEventListener('submit', submitHandler);


