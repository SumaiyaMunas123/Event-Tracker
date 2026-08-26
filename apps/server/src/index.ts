import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { prisma } from './db/prisma';
import { requireAuth } from './middleware/requireAuth';
import { scopeToOrganization } from './middleware/scopeToOrganization';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, scopeToOrganization, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    include: { organization: true },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    organizationId: user.organizationId,
    organization: user.organization,
  });
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, organizationName } = req.body ?? {};

  if (!name || !email || !password || !organizationName) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  const inviteCode = `ORG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const organization = await prisma.organization.create({
    data: {
      name: organizationName,
      inviteCode,
    },
  });

  const passwordHash = await import('bcryptjs').then(({ hashSync }) => hashSync(password, 10));

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'admin',
      organizationId: organization.id,
    },
  });

  const token = await import('jsonwebtoken').then(({ sign }) =>
    sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: organization.id,
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' },
    ),
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });

  return res.status(201).json({
    message: 'Organization created.',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: organization.id,
    },
    organization,
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const passwordValid = await import('bcryptjs').then(({ compareSync }) => compareSync(password, user.passwordHash));
  if (!passwordValid) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = await import('jsonwebtoken').then(({ sign }) =>
    sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: user.organizationId,
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' },
    ),
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: user.organizationId,
    },
  });
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out.' });
});

app.post('/api/auth/join', async (req, res) => {
  const { name, email, password, inviteCode } = req.body ?? {};

  if (!name || !email || !password || !inviteCode) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const organization = await prisma.organization.findUnique({
    where: { inviteCode },
  });

  if (!organization) {
    return res.status(404).json({ message: 'Invite code not found.' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  const passwordHash = await import('bcryptjs').then(({ hashSync }) => hashSync(password, 10));

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'member',
      organizationId: organization.id,
    },
  });

  const token = await import('jsonwebtoken').then(({ sign }) =>
    sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationId: organization.id,
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' },
    ),
  );

  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      organizationId: organization.id,
    },
    organization,
  });
});

const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  server.close();
  process.exit(0);
});
