// Check if a theme preference is stored in localStorage
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Apply the initial theme based on localStorage or default to 'light'
setTheme(isDarkMode ? 'dark' : 'light');

// Set the initial logo based on the theme
updateLogo(isDarkMode);

// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.body;

  if (isDarkMode) {
    setTheme('light');
    isDarkMode = false;
  } else {
    setTheme('dark');
    isDarkMode = true;
  }

  // Save the theme preference to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

  // Update the logo based on the theme
  updateLogo(isDarkMode);
}

// Function to apply the selected theme
function setTheme(themeName) {
  const body = document.body;

  body.classList.remove('dark-mode', 'light-mode');
  body.classList.add(`${themeName}-mode`);
}

// Function to update the logo based on the theme
function updateLogo(isDarkMode) {
  const icon = document.getElementById('sun-and-moon');
  icon.innerHTML = isDarkMode ? '🌙' : '☀️';
}

var formErrors = []

function validateForm(event) {
    var form = document.getElementById('demo');
    var nameInput = form.elements['name'];

    console.log('hello')
    if (nameInput.validity.valueMissing) {
        displayMessage('name-error', 'Please enter your name.', 'error');
        displayMessage('name-info', 'Name should not be empty and contain only alphabets', 'info');
        formErrors.push(nameInput.value);
    } else if (!nameInput.checkValidity()) {
        displayMessage('name-error', 'Please enter a valid name.', 'error');
        displayMessage('name-info', 'Name should not contain numbers or special characters', 'info');
        console.log(nameInput.value)
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
        console.log(emailInput.value)
    } else {
        displayMessage('email-error', '', 'error');
        displayMessage('email-info', '', 'info');
    }

    console.log(formErrors)


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

    console.log(formErrors)
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
        console.log('invalid' + lastChar)
        validationMessage.textContent = 'Name should not contain numbers or special characters';
        validationMessageContainer.style.display = 'block'; 
        event.preventDefault();
        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
        }, 2000);
    } else {
        console.log('valid' + lastChar)
        validationMessage.textContent = '';
        validationMessageContainer.style.display = 'none';
    }
}

function validateEmail(event) {
    var input = event.target;
    var email = input.value; // Get the entire input value
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var validationMessage = document.getElementById('email-error');
    var validationMessageContainer = validationMessage.closest('.error-message');

    if (!pattern.test(email)) {
        console.log('invalid' + email)
        validationMessage.textContent = 'Invalid email format';
        validationMessageContainer.style.display = 'block'; 

        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
        }, 2000);
    } else {
        console.log('valid' + email)
        validationMessage.textContent = '';
        validationMessageContainer.style.display = 'none';
    }
}

function validateComments(event) {
    var input = event.target;
    var lastChar = event.key; // Get the character associated with the key that was just pressed
    var pattern = /^[a-zA-Z0-9\s]+$/;
    var validationMessage = document.getElementById('comments-error');
    var validationMessageContainer = validationMessage.closest('.error-message');

    if (!pattern.test(lastChar)) {
        console.log('invalid' + lastChar)
        validationMessage.textContent = 'Name should not contain numbers or special characters';
        validationMessageContainer.style.display = 'block'; 
        event.preventDefault();
        setTimeout(function() {
            validationMessageContainer.style.display = 'none';
        }, 2000);
    } else {
        console.log('valid' + lastChar)
        validationMessage.textContent = '';
        validationMessageContainer.style.display = 'none';
    }
}