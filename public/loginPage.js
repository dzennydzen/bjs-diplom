const newUser = new UserForm();
newUser.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            console.log(newUser.loginErrorMessageBox.innerHTML);
        }
    });
        
}


newUser.registerFormCallback = (data) => {
    ApiConnector.register(data, (data) => console.log(`Регистрация: ${data.login}`));
    location.reload()
}