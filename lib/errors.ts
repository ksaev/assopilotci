/**
 * Custom error classes for API
 */

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 400,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Ressource non trouvée') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Authentification requise') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Accès refusé') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Ressource déjà existante') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Erreur serveur interne') {
    super(message, 500);
    this.name = 'InternalServerError';
  }
}

/**
 * Handle API errors uniformly
 */
export function handleApiError(error: unknown): { message: string; status: number; details?: any } {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status,
      details: error.details,
    };
  }

  if (error instanceof SyntaxError) {
    return {
      message: 'Erreur de syntaxe JSON',
      status: 400,
    };
  }

  if (error instanceof Error) {
    console.error('[v0] Unhandled error:', error);
    return {
      message: error.message || 'Une erreur est survenue',
      status: 500,
    };
  }

  console.error('[v0] Unknown error:', error);
  return {
    message: 'Une erreur inconnue est survenue',
    status: 500,
  };
}
