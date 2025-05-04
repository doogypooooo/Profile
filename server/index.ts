import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "../shared/schema";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  let adminUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, "admin"))
    .get();

  if (!adminUser) {
    console.log("inserting admin user");
    await db
      .insert(schema.users)
      .values({ username: "admin", password: "password", isAdmin: true })
      .execute();

    adminUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, "admin"))
      .get();
  }

  const userUser = await db
  .select()
  .from(schema.users)
  .where(eq(schema.users.username, "user"))
  .get();

  if (!userUser) {
    console.log("inserting user user");
    await db
      .insert(schema.users)
      .values({ username: "user", password: "password" })
      .execute();
  }

  if(adminUser){
    const sampleData = [
      {
        insertTable: schema.personalInfos,
        data: [
          { title: 'title', name: 'name', experience: '10', desiredSalary: '5000', email: 'email', phone: 'phone', location: 'location', military: 'military',introduction: 'introduction' }
        ],
      },
      {
        insertTable: schema.projects,
        data: [
          { name: 'project1', company: 'company1', period: '2020-2021', description: 'desc1', technologies: 'tech1', user_id : adminUser.id, order: 1},
          { name: 'project2', company: 'company2', period: '2021-2022', description: 'desc2', technologies: 'tech2', user_id: adminUser.id, order: 2}
        ],
      },
      {
        insertTable: schema.educations,
        data: [
          { institution: "institution1", type: "type1", period: "period1" },
        ],
      },
      {
        insertTable: schema.experiences,
        data: [
          { company: "company1", position: "position1", period: "period1", salary: "salary1" },
        ],
      },
      {
        insertTable: schema.skills,
        data: [
          { name: "skill1", category: "programming" },
        ],
      },
      {
        insertTable: schema.keywords,
        data: [
          { keyword: "keyword1" },
        ],
      },
    ];
    for (const { insertTable, data } of sampleData) {
        const count = await db.select().from(insertTable).execute();
        if (count.length === 0) {
          console.log(`inserting data to ${insertTable.name} table`);
          await db.insert(insertTable).values(data).execute();
        } else {
          console.log(`${insertTable.name} table has data`);
        }
      }
  }


  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    console.log(`serving on port ${port}`);
  });
})();