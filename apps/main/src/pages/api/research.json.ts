import type { APIRoute } from "astro";
import { publications } from "../../data/publications";
import { projects } from "../../data/projects";

export const prerender = true;

export const GET: APIRoute = () => {
  const payload = {
    source: "yangs.ai",
    version: "1",
    generatedAt: new Date().toISOString(),
    publications,
    projects,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=300",
    },
  });
};
