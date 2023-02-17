const login_button = document.querySelector('#login_button');

login_button.addEventListener('click', async () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const submit = await fetch('/client-auth', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
})