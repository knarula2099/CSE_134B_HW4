function setTheme(themeName) {
    const body = document.body;
  
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(`${themeName}-mode`);
}
  
function updateLogo(isDarkMode) {
    const icon = document.getElementById('sun-and-moon');
    icon.innerHTML = isDarkMode ? '🌙' : '☀️';
}


function toggleTheme() {
  const body = document.body;

  if (isDarkMode) {
    setTheme('light');
    isDarkMode = false;
  } else {
    setTheme('dark');
    isDarkMode = true;
  }

  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  updateLogo(isDarkMode);
}

let isDarkMode = localStorage.getItem('theme') === 'dark';

setTheme(isDarkMode ? 'dark' : 'light');

updateLogo(isDarkMode);

var formErrors = []

function displayMessage(elementId, message, type) {
    var output = document.getElementById(elementId);
    output.textContent = message;

    if (type === 'error') {
        var validationMessage = output.closest('.error-message');
    }
    else if (type === 'info') {
        var validationMessage = output.closest('.info-message');
    }
    if (message.trim() !== '') {
        validationMessage.style.display = 'block';
    } else {
        validationMessage.style.display = 'none';
    }
}

function validateForm(event) {
    var form = document.getElementById('demo');
    var nameInput = form.elements['name'];

    if (nameInput.validity.valueMissing) {
        displayMessage('name-error', 'Please enter your name.', 'error');
        displayMessage('name-info', 'Name should not be empty and contain only alphabets', 'info');
        formErrors.push(nameInput.value);
    } else if (!nameInput.checkValidity()) {
        displayMessage('name-error', 'Please enter a valid name.', 'error');
        displayMessage('name-info', 'Name should not contain numbers or special characters', 'info');
        formErrors.push(nameInput.value);
    } else {
        displayMessage('name-error', '', 'error');
        displayMessage('name-info', '', 'info');
    }

    var emailInput = form.elements['email'];
    if (emailInput.validity.valueMissing) {
        displayMessage('email-error', 'Please enter your email address.', 'error');
        displayMessage('email-info', 'Email should not be empty and should be in the format: foo@bar.com', 'info')
        formErrors.push(emailInput.value);
    } else if (!emailInput.checkValidity()) {
        displayMessage('email-error', 'Please enter a valid email address.', 'error');
        displayMessage('email-info', 'Email should be in the format: foo@bar.com', 'info');
        formErrors.push(emailInput.value);
    } else {
        displayMessage('email-error', '', 'error');
        displayMessage('email-info', '', 'info');
    }


    var commentsInput = form.elements['comments'];
    if (commentsInput.validity.valueMissing) {
        displayMessage('comments-error', 'Please enter your comments.', 'error');
        displayMessage('comments-info', 'Comments should be between 3 and 500 characters.', 'info');
        formErrors.push(commentsInput.value);
    } else if (!commentsInput.checkValidity()) {
        displayMessage('comments-error', 'Please enter a valid comment.', 'error');
        displayMessage('comments-info', 'Comments should be between 3 and 500 characters.', 'info');
        formErrors.push(commentsInput.value);
    } else {
        displayMessage('comments-error', '', 'error');
        displayMessage('comments-info', '', 'info');
    }

    if (!form.checkValidity()) {
        // Prevent form submission if there are validation errors
        event.preventDefault();
        return false;
    } else {
        var formErrorsString = JSON.stringify(formErrors);

        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'form-errors');
        hiddenInput.setAttribute('value', formErrorsString);

        form.appendChild(hiddenInput);
        return true;    
    }
}

function countWords(textarea) {
    var charCount = textarea.value.length;
    var charLeft = textarea.attributes.maxLength.value - charCount;
    var countMessage = document.getElementById('comments-info');
    countMessage.textContent = charLeft + ' characters left';

    var validationMessage = countMessage.closest('.info-message');
    
    if (charCount > 0) {
        validationMessage.style.display = 'block';
    }
    else {
        validationMessage.style.display = 'none';
    }

    if (charLeft < 50) {
        countMessage.style.color = 'red';
    } else if (charLeft < 100) {
        countMessage.style.color = 'orange';
    } else {
        countMessage.style.color = 'white';
    }
}

function validateName(event) {
    var input = event.target;
    var lastChar = event.key; // Get the character associated with the key that was just pressed
    var pattern = /^[a-zA-Z\s]+$/;
    var validationMessage = document.getElementById('name-error');
    var validationMessageContainer = validationMessage.closest('.error-message');

    if (!pattern.test(lastChar)) {
        validationMessage.textContent = 'Name should not contain numbers or special characters';
        validationMessageContainer.style.display = 'block'; 
        input.classList.add('invalid-input'); // Add the invalid-input class
        event.preventDefault();
        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
            input.classList.remove('invalid-input'); 
        }, 2000);
    }
}

function validateEmail(event) {
    var input = event.target;
    var email = input.value; // Get the entire input value
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var validationMessage = document.getElementById('email-error');
    var validationMessageContainer = validationMessage.closest('.error-message');

    if (!pattern.test(email)) {
        input.setAttribute('background-color', 'red');
        input.classList.add('invalid-input'); 
        validationMessage.textContent = 'Invalid email format';
        validationMessageContainer.style.display = 'block'; 

        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
            input.classList.remove('invalid-input');
        }, 1000);
    }
}

function validateComments(event) {
    var input = event.target;
    var lastChar = event.key; 
    var pattern = /^[a-zA-Z0-9\s]+$/;
    var validationMessage = document.getElementById('comments-error');
    var validationMessageContainer = validationMessage.closest('.error-message');

    if (!pattern.test(lastChar)) {
        input.classList.add('invalid-input');
        validationMessage.textContent = 'Name should not contain numbers or special characters';
        validationMessageContainer.style.display = 'block'; 
        event.preventDefault();
        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
            input.classList.remove('invalid-input');
        }, 2000);
    }
}