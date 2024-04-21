'use server'

import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function login(formdata: any) {}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function decrypt(session: string) {
  return await JSON.parse(session)
}

export async function encrypt(session: string) {
  return await JSON.stringify(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return null

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}
