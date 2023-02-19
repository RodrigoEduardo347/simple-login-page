const login_button = document.querySelector('#login_button');

login_button.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    await fetch('/register-client', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
    .then(res=> res.json())
    .then((res) => {
        if(res.msg === 'Cadastro realizado com sucesso!'){
            alert(res.msg);
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
        } else {
            alert(res.msg);
        }
    })
    .catch(err=>console.log(err))
})