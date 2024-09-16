document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.querySelector('.form');
    const firstNameBox = document.getElementById('first-name-box');
    const lastNameBox = document.getElementById('last-name-box');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const signBtn = document.getElementById('sign_btn');
    const createBtn = document.getElementById('create_btn');
    const heading = document.getElementById('head'); // Reference to the heading
    const paragraph = document.querySelector('.a'); // Reference to the paragraph

    // Hide First Name and Last Name fields on Sign In button click
    signBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default form submission
        firstNameBox.style.display = "none";
        lastNameBox.style.display = "none";
        heading.textContent = "Login"; // Change heading to 'Login'
        paragraph.textContent = "Please login using the account details below."; // Change paragraph to login text
        clearErrorMessages(); // Clear any previous errors
    });

    // Show First Name and Last Name fields and change heading and paragraph on Create Account button click
    createBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button behavior
        firstNameBox.style.display = "block"; // Show First Name
        lastNameBox.style.display = "block"; // Show Last Name
        heading.textContent = "Create Account"; // Change heading to 'Create Account'
        paragraph.textContent = "Please fill in the details to create your account."; // Change paragraph to create account text
        clearErrorMessages(); // Clear any previous errors
    });

    form.addEventListener('submit', function (e) {
        // Prevent the form from submitting
        e.preventDefault();

        // Clear any previous error messages
        clearErrorMessages();

        // Validate fields
        let valid = true;

        // Check if First Name and Last Name are visible, then validate them
        if (firstNameBox.style.display !== "none" && firstName.value.trim() === "") {
            showError(firstName, "First name is required");
            valid = false;
        }

        if (lastNameBox.style.display !== "none" && lastName.value.trim() === "") {
            showError(lastName, "Last name is required");
            valid = false;
        }

        // Validate Email and Password for both Sign In and Create Account actions
        if (!validateEmail(email.value.trim())) {
            showError(email, "Valid email is required");
            valid = false;
        }

        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters long");
            valid = false;
        }

        // If all fields are valid, submit the form
        if (valid) {
            form.submit();
        }
    });

    // Function to show error message
    function showError(input, message) {
        const inputBox = input.parentElement;
        const error = document.createElement('p');
        error.className = 'error-message';
        error.innerText = message;
        inputBox.appendChild(error);
    }

    // Function to clear error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (message) {
            message.remove();
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
