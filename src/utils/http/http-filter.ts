import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "./http-exceptions";

interface HandlerResponse {
  data: unknown;
  status: number;
}

export async function httpFilter(
  request: Request,
  handler: (request: Request) => Promise<HandlerResponse>,
) {
  try {
    const { data, status } = await handler(request);
    return new Response(JSON.stringify({ data, status }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleHttpException(error);
  }
}

export function handleHttpException(error: unknown): Response {
  if (error instanceof BadRequestException) {
    return new Response(
      JSON.stringify({ error: error.message || "Bad Request", status: 400 }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (error instanceof UnauthorizedException) {
    return new Response(
      JSON.stringify({ error: error.message || "Unauthorized", status: 401 }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (error instanceof NotFoundException) {
    return new Response(
      JSON.stringify({ error: error.message || "Not Found", status: 404 }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  if (error instanceof Error) {
    return new Response(JSON.stringify({ error: error.message, status: 500 }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ error: "Internal Server Error", status: 500 }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
}
