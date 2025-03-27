import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const data = await request.json();
    const { email, password, isLogin } = data;

    if (email === "error@example.com") {
      return NextResponse.json(
        { error: isLogin ? "Invalid credentials" : "Email already in use" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: "user123",
        email,
        name: email.split("@")[0],
      },
      token: "mock-jwt-token-xyz123",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
