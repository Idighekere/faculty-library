import app from "./app";
import { connectToDatabase, ENVIRONMENT } from "@/common/configs";

const port = ENVIRONMENT.APP.PORT;

// Connection to MongoDb database
connectToDatabase()


app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
