import app from "./app.js"; // Importa server en lugar de app
import { PORT } from "./config.js";
import "./data/dbContection.js";
import "./sockectServer.js"; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
