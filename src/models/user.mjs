const users = [{id:1, name:"Alice"}]

export const getUsers = () => users;
export const addUser = (user) =>
    users.map(u => u.id).indexOf(user.id) >= 0 ? false : !!users.push(user);
