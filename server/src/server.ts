import app from "./app";
import { ENVIRONMENT } from "./common/configs";

const port = ENVIRONMENT.APP.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Local Server running at http://localhost:${port}`);
});
