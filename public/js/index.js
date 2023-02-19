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
    .then(res=> res.json())
    .then((res)=>{
        console.log(res)
        if(res.msg === 'Login realizado com sucesso!'){
            alert(res.msg);
            console.log('Este é o seu token: ', res.token);
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
        } else {
            alert(res.msg);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
})