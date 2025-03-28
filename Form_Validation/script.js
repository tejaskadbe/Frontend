// script.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('dynamicForm');
    const countrySelect = document.getElementById('country');
    const stateContainer = document.getElementById('state-container');
    const errorMessage = document.getElementById('error-message');
    
    // Show or hide the state field based on the country selection
    countrySelect.addEventListener('change', function () {
        if (this.value === 'us') {
            stateContainer.style.display = 'block';
        } else {
            stateContainer.style.display = 'none';
        }
    });

    // Form submission logic with validation
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting immediately

        let isValid = true;

        // Clear previous error messages
        errorMessage.style.display = 'none';

        // Check if all required fields are filled
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const terms = document.getElementById('terms');

        // Validate Name
        if (name.value.trim() === "") {
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
        }

        // Validate Country
        if (countrySelect.value === "") {
            isValid = false;
        }

        // Validate Terms and Conditions
        if (!terms.checked) {
            isValid = false;
        }

        // Display error message if validation fails
        if (!isValid) {
            errorMessage.style.display = 'block';
        } else {
            // If everything is valid, simulate form submission
            alert("Form submitted successfully!");
            form.reset();
        }
    });
});
