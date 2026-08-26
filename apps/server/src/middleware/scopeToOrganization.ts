import { NextFunction, Request, Response } from 'express';

export function scopeToOrganization(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.organizationId) {
    return res.status(401).json({ message: 'User organization context is missing.' });
  }

  req.organizationId = req.user.organizationId;
  next();
}
