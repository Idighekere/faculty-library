import { connectToDatabase, ENVIRONMENT } from "@/common/configs";
// Connection to MongoDb database
connectToDatabase();

import app from "./app";

const port = ENVIRONMENT.APP.PORT;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
