// GLOBAL SELECTORS

const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitButtonEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

//GLOBAL VARIABLES

const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";
const MAX_CHARS = textareaEl.maxLength.toString();

//GLOBAL FUNCTIONS

const renderFeedbackItem = feedbackItem => {
    const feedbackItemHTML = `<li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upcvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${
          feedbackItem.daysAgo === 0 ? "new" : `${feedbackItem.daysAgo + "d"}`
        }</p>
    </li>`;
    
    feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);

}
// COUNTER COMPONENT

const textareaInputListener = () => {
  const currChars = textareaEl.value.length;
  const charsLeft = MAX_CHARS - currChars;
  // maxLength does not account for edge case of copy pasting into the textarea, need to fix.
  counterEl.textContent = charsLeft.toString();
};

textareaEl.addEventListener("input", textareaInputListener);

// FORM COMPONENT
const showVisualIndicator = (validity) => {
  const className = validity === "valid" ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
};

const submitHandler = (event) => {
  // prevent default browser action of refreshing page on submit press
  event.preventDefault();

  // get text from text area and validate it
  const text = textareaEl.value;
  if (text.includes("#") && text.length >= 5) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textareaEl.focus();
    return;
  }

  // get the first company name hashtag in the text (if charAt index 0 of a word is #, that is now the hashtag)
  const hashtag = text.split(" ").find((element) => element.charAt(0) === "#");
  const company = hashtag.substring(1);
  const badgeLetter = company.charAt(0).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  // new feedback item HTML
  const feedbackItemObject = {
    upvoteCount: upvoteCount,
    company: company,
    daysAgo: daysAgo,
    badgeLetter: badgeLetter,
    text: text
  }
  renderFeedbackItem(feedbackItemObject);

  // send feedback to server
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItemObject),
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    }
  }).then(res => {
    if (!res.ok) {
      console.log("Something went wrong");
      return;
    }
      console.log("Feedback sent successfully");
  }).catch(error => console.log(error));

  textareaEl.value = "";
  submitButtonEl.blur();

  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);

// FEEDBACK LIST COMPONENT

fetch(`${BASE_API_URL}/feedbacks`)
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();

    data.feedbacks.forEach((feedbackItem) => renderFeedbackItem(feedbackItem));
  })
  .catch((error) => {
    spinnerEl.remove();
    feedbackListEl.textContent = `Error fetching feedbacks: ${error.message}`;
  });
