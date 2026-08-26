declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        organizationId: string;
        email: string;
        name: string;
        role: string;
      };
      organizationId?: string;
    }
  }
}

export {};
