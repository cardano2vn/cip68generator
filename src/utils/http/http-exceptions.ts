export class BadRequestException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestException";
  }
}

export class UnauthorizedException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthorizedException";
  }
}

export class NotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundException";
  }
}
