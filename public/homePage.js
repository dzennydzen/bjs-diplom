const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((responce) => {
        if (responce.success) {
            location.reload()
        }
    })
}