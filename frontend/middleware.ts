import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware chamado para rota:", request.nextUrl.pathname);

  const apiUrl = `${process.env.NEXT_PUBLIC_DJANGO_URL}/auth/token/refresh/`;

  const accessToken = request.cookies.get("access")?.value;
  const refreshToken = request.cookies.get("refresh")?.value;

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  if (!accessToken) {
    if (refreshToken) {
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (res.ok) {
          const data = await res.json();
          const response = NextResponse.next();

          response.cookies.set("access", data.access, {
            httpOnly: true,
            path: "/",
            maxAge: 15 * 60,
          });
          response.cookies.set("refresh", refreshToken, {
            httpOnly: true,
            path: "/",
          });

          return response;
        } else {
          console.log(
            "Renovação de token falhou. Redirecionando para o login."
          );
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
        }
      } catch (error) {
        console.error("Erro ao tentar renovar o token de acesso:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
      }
    } else {
      console.log("Nenhum token encontrado. Redirecionando para o login.");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
