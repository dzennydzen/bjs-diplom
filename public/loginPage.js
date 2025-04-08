const newUser = new UserForm();
newUser.loginFormCallback = (data) => {
    console.log('Отправка данных:', data);
    ApiConnector.login(data, (response) => {
        console.log('Ответ сервера:', response);
        if (response.success) {
            location.reload();
        } else {
            alert(newUser.loginErrorMessageBox.innerHTML);
        }
    });
        
}


newUser.registerFormCallback = (data) => {
    console.log('Отправка данных:', data);
    ApiConnector.register(data, (response) => {
        console.log('Ответ сервера:', response);
        if (response.success) {
            location.reload();
        } else {
            alert(newUser.registerErrorMessageBox.innerHTML);
        }
    })
}