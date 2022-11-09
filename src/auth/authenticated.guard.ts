import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

// Guard to check if the user is authenticated
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  // Activate route if user is authenticated
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
