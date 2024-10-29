document.getElementById('show-register').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('form-title').innerText = 'Register';
    document.getElementById('back-to-login').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('form-title').innerText = 'Login';
    document.getElementById('back-to-login').style.display = 'none';
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    const username = document.querySelector('#login-form input[name="username"]').value;
    const password = document.querySelector('#login-form input[name="password"]').value;

    if (!username || !password) {
        e.preventDefault();
        alert('Please enter both username and password');
    }
});

document.getElementById('register-form').addEventListener('submit', function (e) {
    const username = document.querySelector('#register-form input[name="username"]').value;
    const email = document.querySelector('#register-form input[name="email"]').value;
    const password = document.querySelector('#register-form input[name="password"]').value;

    if (!username || !email || !password) {
        e.preventDefault();
        alert('Please fill all the fields');
    } else if (!validateEmail(email)) {
        e.preventDefault();
        alert('Please enter a valid email address');
    } else if (password.length < 6) {
        e.preventDefault();
        alert('Password must be at least 6 characters long');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
