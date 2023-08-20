
export async function GET() {
  try {
    const response = new Response(
      JSON.stringify({
        message: `Logged out successfully`,
      }),
      { status: 200 }
    );

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to logout", error: error.message }),
      { status: 500 }
    );
  }
}
