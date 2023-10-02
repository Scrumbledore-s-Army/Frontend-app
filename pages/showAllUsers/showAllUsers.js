export async function initShowAllUsers() {
    try {
        // Get the token from wherever you stored it (e.g., localStorage)
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('Token not found. Please log in.');
            return;
        }

        const response = await fetch('http://localhost:8080/api/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Get a reference to the table body
        const tableBody = document.querySelector('#userTable tbody');

        // Clear any existing rows in the table
        tableBody.innerHTML = '';

        // Iterate through the data and append rows to the table
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.street}</td>
                <td>${user.city}</td>
                <td>${user.zip}</td>
                <td>${user.created}</td>
                <td>${user.edited}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
