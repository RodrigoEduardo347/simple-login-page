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
        console.log(res)
        if(res.status == 200){
            alert(res.msg)
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
        } else {
            alert('ERRO! Não foi possível fazer o seu cadastro!')
        }
    })
    .catch(err=>console.log(err))
})