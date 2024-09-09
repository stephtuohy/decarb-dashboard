import { createHash } from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, entityType, password } = body;
    const hashedPassword = createHash("sha256").update(password).digest("hex");

    const response = await fetch(
      "https://ocec7olka5.execute-api.af-south-1.amazonaws.com/dev/testRegister",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          entityType,
          password: hashedPassword,
        }),
      }
    );

    if (response.ok) {
      return new Response(
        JSON.stringify({
          message:
            "Registration successful, please check email for verfication code.",
        }),
        {
          status: 200,
        }
      );
    } else {
      const errorData = await response.json();
      return new Response(JSON.stringify({ message: errorData.message }), {
        status: response.status,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
}
