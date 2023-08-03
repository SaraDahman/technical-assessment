import Book from "./books";
import User from "./users";


User.hasMany(Book, { foreignKey: 'userId' });
Book.belongsTo(User, { foreignKey: 'userId' });


export {
    Book,
    User
}