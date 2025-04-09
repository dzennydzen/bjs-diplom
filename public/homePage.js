const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((responce) => {
        if (responce.success) {
            location.reload()
        }
    })
}

ApiConnector.current((responce) => {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);
    } else (
        alert(responce.error)
    )
})

const newRates = new RatesBoard();

function updateRates() {
    ApiConnector.getStocks((response) => {
        console.log('Актуальные курсы валют получены, запущено автоматическое обновление');
        if (response.success) {
            newRates.clearTable();
            newRates.fillTable(response.data);
        } else {
            alert(response.error)
        }
    })
};

updateRates();
let timerForRates = setInterval(updateRates, 60000);

const newMoneyMag = new MoneyManager();
newMoneyMag.addMoneyCallback = (data) => {
    ApiConnector.addMoney({currency: data.currency, amount: data.amount}, (response) => {
        console.log(data);
        console.log(response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyMag.setMessage(true, response.message);
        } else {
            newMoneyMag.setMessage(false, response.error);
        }
    }) 
}


newMoneyMag.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney({fromCurrency: data.fromCurrency, targetCurrency: data.targetCurrency, fromAmount: data.fromAmount}, (response) => {
        console.log(data);
        console.log(response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyMag.setMessage(true, `Средства успешно сконвертированы`);
        } else {
            newMoneyMag.setMessage(false, response.error);
        }
    })
}

newMoneyMag.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney({to: data.to, currency: data.currency, amount: data.amount}, (response) => {
        console.log(data);
        console.log(response);

        if (response.success) {
            ProfileWidget.showProfile(response.data);
            newMoneyMag.setMessage(true, `Средства успешно переведены на счет ${data.to}`);
        } else {
            newMoneyMag.setMessage(false, response.error);
        }
    })
}

const newFavorites = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        newFavorites.clearTable();
        newFavorites.fillTable(response.data);
        newMoneyMag.updateUsersList(response.data);
        console.log(`Данные ответа от сервера: ${response.data}`);
    } else {
        alert(response.error);
    }
})

newFavorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites({id: data.id, name: data.name}, (response) => {
        if (response.success) {
            newFavorites.clearTable();
            newFavorites.fillTable(response.data);
            newMoneyMag.updateUsersList(response.data);
            newMoneyMag.setMessage(true, `Пользователь ${data.name}, id ${data.id} успешно добавлен в избранное`)

            console.log(`Данные ответа от сервера при добавлении пользователя в избранные: ${response.data}`);
        } else {
            newMoneyMag.setMessage(false, response.error);
        }
    })
}

newFavorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data.id, (response) => {
        console.log(response);
        if (response.success) {
            newFavorites.clearTable();
            newFavorites.fillTable(response.data);
            newMoneyMag.updateUsersList(response.data);
            console.log(response.data);
            newFavorites.setMessage(true, `Пользователь ${data.name}, id ${data.id} успешно удален из избранного`);
        } else {
            newFavorites.setMessage(false, response.error);
        }
    })
}
