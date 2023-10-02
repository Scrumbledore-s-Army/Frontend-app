export function initLogin(){

    const loginForm = document.getElementById('loginForm');
    const loggedInMessage = document.getElementById('loggedInMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const loggedInUser = data.username;
                console.log(data.token);
                const roles = data.roles;

                // Display the logged-in message
                loggedInMessage.textContent = `Logged in as ${loggedInUser}`;
               // Store the token in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('username',loggedInUser)
                localStorage.setItem('roles', roles);
                document.getElementById('loggedInAs').innerHTML=`Logged in as ${localStorage.getItem('username')}<a href="signOut" data-navigo style="margin-left: 10px; margin-right: 10px; font-size: 12px;">Sign Out</a>`

            } else {
                loggedInMessage.textContent = 'Login failed. Please check your credentials.';
            }
        } catch (error) {
            console.error('Error:', error);
            loggedInMessage.textContent = 'An error occurred during login.';
        }
    });
}
