import { cookies } from "next/headers";

class TokenService {
  private static readonly API_TOKEN_PART1 = "_dntq";
  private static readonly API_TOKEN_PART2 = "_dntl";
  private static readonly API_TOKEN_PART3 = "_dnrtu";

  private constructor() {}

  static saveToken(token: string) {
    const [part1, part2, part3] = token.split(".");

    cookies().set(TokenService.API_TOKEN_PART1, part1, {
      httpOnly: true,
      sameSite: "lax",
      priority: "medium",
    });

    cookies().set(TokenService.API_TOKEN_PART2, part2, {
      httpOnly: true,
      sameSite: "lax",
      priority: "medium",
    });

    cookies().set(TokenService.API_TOKEN_PART3, part3, {
      httpOnly: true,
      sameSite: "lax",
      priority: "medium",
    });
  }

  static getToken() {
    const [part1, part2, part3] = [
      cookies().get(TokenService.API_TOKEN_PART1)?.value,
      cookies().get(TokenService.API_TOKEN_PART2)?.value,
      cookies().get(TokenService.API_TOKEN_PART3)?.value,
    ];

    return `${part1}.${part2}.${part3}`;
  }

  static removeToken() {
    cookies().delete(TokenService.API_TOKEN_PART1);
    cookies().delete(TokenService.API_TOKEN_PART2);
    cookies().delete(TokenService.API_TOKEN_PART3);
  }
}

export default TokenService;
