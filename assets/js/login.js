
document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('token')) {
        window.location.href = "index.html";
    }

    const form = document.getElementById('login');

    form.addEventListener('submit', function (e) {
      const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = { email, password };
        //post request to server
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
        }).catch((error) => {
            console.error('Error:', error);
        });
    })
})