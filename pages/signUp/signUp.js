export async function initSignUp() {
    const signupForm = document.getElementById('signupForm');
    const signupButton = document.getElementById('signupButton');
    const signupMessage = document.getElementById('signupMessage');

    signupButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;

        const data = {
            username,
            email,
            password,
            firstName,
            lastName,
            street,
            city,
            zip,
        };

        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found. Please log in.');
                signupMessage.textContent = 'Token not found. Please log in.';
                return;
            }

            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token here
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                signupMessage.textContent = 'Sign up successful!';
            } else {
                const errorData = await response.json();
                signupMessage.textContent = `Sign up failed: ${errorData.message}`;
            }
        } catch (error) {
            console.error('Error:', error);
            signupMessage.textContent = 'An error occurred during sign up.';
        }
    });
}
