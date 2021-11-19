const request = require('supertest');
const express = require('express');
const Admins = require('../../api/admin/adminModel');
const adminRouter = require('../../api/admin/adminRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/admin/adminModel');
jest.mock('../../api/middleware/authRequired.js', () =>
  jest.fn((req, res, next) => next())
);

describe('admin router endpoints', () => {
  beforeAll(() => {
    server.use(['/admin', '/admins'], adminRouter);
    jest.clearAllMocks();
  });
});

describe('GET /admins', () => {
  it('should return 200', async () => {
    Admins.getAdmins.mockResolvedValue([]);
    const res = await request(server).get('/admins');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
    expect(Admins.getAdmins.mock.calls.length).toBe(1);
  });
});

describe('GET /admins/:id', () => {
  it('should return 200 when admin found', async () => {
    Admins.findByAdminId.mockResolvedValue({
      // name: 'Silly Sally',
      // email: 'helloworld@email.com',
      user_id: '1',
    });
    const res = await request(server).get('/admins/1');
    expect(res.status).toBe(200);
    // expect(res.body.name).toBe('Silly Sally');
    expect(Admins.findByAdminId.mock.calls.length).toBe(1);
  });

  it('should return 404 when no user found', async () => {
    Admins.findByAdminId.mockResolvedValue();
    const res = await request(server).get('/admin/6');
    expect(res.status).toBe(404);
  });
});

describe('POST /admins', () => {
  it('should return 200 when admin is created', async () => {
    const admin = {
      name: 'Ted',
      email: 'lolwut@helloworld.com',
    };
    Admins.findByAdminId.mockResolvedValue(undefined);
    Admins.addAdmin.mockResolvedValue([Object.assign({ id: '2 ' }, admin)]);
    const res = await request(server).post('/admin').send(admin);
    expect(res.status).toBe(200);
    expect(res.body.admin.id).toBe('2');
    expect(Admins.addAdmin.mock.calls.length).toBe(1);
  });
});

describe('PUT /admins', () => {
  it('should return 200 when admin is created', async () => {
    const admin = {
      id: '2',
      name: 'Louie Smith',
      email: 'louie@example.com',
    };
    Admins.findByAdminId.mockResolvedValue(admin);
    Admins.updateAdmin.mockResolvedValue([admin]);

    const res = await request(server).put('/admin/').send(admin);
    expect(res.status).toBe(200);
    expect(res.body.admin.name).toBe('Louie Smith');
    expect(Admins.updateAdmin.mock.calls.length).toBe(1);
  });
});
