const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://localhost:9003";

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

export async function GET(request, { params }) {
  const slug = (await params).slug?.join("/") || "";
  const incoming = new URL(request.url);
  const target = new URL(`/store/${slug}`, MEDUSA_BACKEND_URL);

  incoming.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  const headers = { "Content-Type": "application/json" };
  if (MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY;
  }

  try {
    const res = await fetch(target.toString(), { headers, cache: "no-store" });
    const body = await res.text();
    return new Response(body, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return Response.json(
      { error: err.message || "Medusa proxy failed" },
      { status: 502 }
    );
  }
}
