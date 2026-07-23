import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT NOW() AS time')

    return NextResponse.json({
      success: true,
      data: rows,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
      },
      { status: 500 }
    )
  }
}