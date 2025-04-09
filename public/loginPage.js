const newUser = new UserForm();
newUser.loginFormCallback = (data) => {
    console.log('Отправка данных:', data);
    ApiConnector.login(data, (response) => {
        console.log('Ответ сервера:', response);
        if (response.success) {
            alert(`Пользователь ${data.login} успешно авторизован`);
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
            alert(`Пользователь ${data.login} успешно зарегистрирован`)
            location.reload();
        } else {
            console.log(response);
            alert(response.error);
        }
    })
}



