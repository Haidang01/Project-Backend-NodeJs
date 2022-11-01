
import userService from '../service/userService'


const handleHelloWord = (req, res) => {
    return res.render('home.ejs')
}
const handleUserPage = (req, res) => {
    return res.render('user.ejs')
}
const handleCreateUser = (req, res) => {
    let email = req.body.emai;
    let password = req.body.password;
    let username = req.body.username;
    userService.createNewUser(email, password, username)
    return res.send('ahahah')
}
module.exports = {
    handleHelloWord,
    handleUserPage,
    handleCreateUser
}