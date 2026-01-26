'use server'

import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function login(username: string, password: string): Promise<boolean> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });
    return true;
  }
  return false;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin-auth');
  return authCookie?.value === 'authenticated';
}

