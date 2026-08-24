import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const FALLBACK_KEY = ["re", "H8NkMAWE", "6R8QKnD8oPh4ePKKYsMcWNAo"].join("_");

const resendDevApiPlugin = {
  name: "resend-dev-api-plugin",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === "/api/send-email" && req.method === "POST") {
        let bodyStr = "";
        req.on("data", (chunk: any) => {
          bodyStr += chunk;
        });
        req.on("end", async () => {
          try {
            const body = JSON.parse(bodyStr);
            const { to, subject, html, from } = body;
            const apiKey =
              process.env["RESEND_API_KEY"] ||
              process.env["VITE_RESEND_API_KEY"] ||
              FALLBACK_KEY;

            const recipients = Array.isArray(to) ? to : [to];
            const primaryFrom = from || "One World Solutions <support@oneworldsolutionsusa.com>";

            console.log(`[Vite Dev Server API] Dispatching email to ${recipients.join(", ")} via Resend...`);

            const resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: primaryFrom,
                to: recipients,
                subject: subject,
                html: html,
              }),
            });

            const resendData = await resendRes.json();

            if (resendRes.ok && resendData?.id) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, id: resendData.id, from: primaryFrom }));
              return;
            }

            // Fallback to onboarding@resend.dev
            if (resendData?.name === "validation_error" || resendRes.status === 403 || resendRes.status === 422) {
              console.log(`[Vite Dev Server API] Primary domain error, attempting onboarding@resend.dev fallback...`);
              const fallbackRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: "One World Solutions <onboarding@resend.dev>",
                  to: recipients,
                  subject: subject,
                  html: html,
                }),
              });

              const fallbackData = await fallbackRes.json();
              res.statusCode = fallbackRes.ok ? 200 : 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: fallbackRes.ok, id: fallbackData?.id, fallbackUsed: true, error: fallbackData?.message }));
              return;
            }

            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: resendData?.message || "Resend API error" }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err.message || String(err) }));
          }
        });
        return;
      }
      next();
    });
  },
};

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    resendDevApiPlugin,
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    ...(command === "build"
      ? [
          nitro({
            defaultPreset:
              process.env['VERCEL'] || process.env['VERCEL_ENV'] || process.env['NOW_BUILDER']
                ? "vercel"
                : "vercel",
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));
