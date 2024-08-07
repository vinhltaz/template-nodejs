import fs from "fs/promises";
import path from "path";

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
};

export const loadEnvironments = () => {
  const missingEnvs = [];

  for (const key in ENV) {
    if (!ENV[key]) {
      missingEnvs.push(key);
    }
  }

  if (missingEnvs.length > 0) {
    console.error(`Missing environments: ${missingEnvs.join(", ")}`);
    process.exit(1);
  }
};

export const loadRoutes = async (app, dir) => {
  try {
    const files = await fs.readdir(dir);

    const promises = files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        return loadRoutes(app, filePath);
      } else if (file.endsWith("-route.js")) {
        try {
          const routeModule = await import(filePath);
          app.use(routeModule.router);
        } catch (err) {
          console.error(`Error loading route ${filePath}:`, err);
        }
      }
    });

    await Promise.all(promises);
  } catch (err) {
    console.error("Error loading routes:", err);
    throw err;
  }
};
