class User {
    constructor(props) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
        this.age = props.age;
        this.role = props.role;
        this.isAdmin = props.isAdmin;
        this.password = props.password;
    }
}

export default User;
