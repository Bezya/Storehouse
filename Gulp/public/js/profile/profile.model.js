export default class ProfileModel {
    constructor() {
        this.url = "http://localhost:3000/users/profile";
        this.login = localStorage.getItem('login');
        this.password = localStorage.getItem('password');
    }
}