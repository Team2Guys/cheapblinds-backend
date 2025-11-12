import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VIEWS_DIRECTORY = path.join(__dirname, "../views");

const IS_PROD_ENV = process.env.NODE_ENV === "production";

export { VIEWS_DIRECTORY, IS_PROD_ENV };
