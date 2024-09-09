export async function POST(req) {
  try {
    const body = await req.json();
    const { code } = body;

    console.log("Received code:", code);
    // Return success - always true
    return new Response(
      JSON.stringify({ success: true, userName: "John Soap" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid request" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
