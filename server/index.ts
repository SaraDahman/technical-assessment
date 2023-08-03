import app from "./app";
import sequelize from './database/connection';

const PORT = app.get('port');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.log(`Failed to connect Database: ${error}`);
    }
})();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})