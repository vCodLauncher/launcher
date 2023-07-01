
document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('token')) {
        window.location.href = "index.html";
    };

    const form = document.getElementById('login');

    form.addEventListener('submit', function (e) {
      const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const data = { email, password };
        //post request to server
        fetch('http://193.38.250.89:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                const errorDiv = document.getElementById('error');
                errorDiv.textContent = data.error;
                return;
            }
            localStorage.setItem('token', data.token);
            window.location.reload();
        }).catch((error) => {
            console.error('Error:', error);
            const errorDiv = document.getElementById('error');
            errorDiv.textContent = error;
        });
    })
})
