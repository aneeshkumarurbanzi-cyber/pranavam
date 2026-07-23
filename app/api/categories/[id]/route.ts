import { NextResponse } from 'next/server'
import db from '@/lib/db'

interface Params {
  params: {
    id: string
  }
}

// DELETE CATEGORY
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {

    await db.query(
      'DELETE FROM categories WHERE id=?',
      [params.id]
    )

    return NextResponse.json({
      success: true,
      message: 'Category Deleted'
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    )

  }
}

// UPDATE CATEGORY
export async function PUT(
  request: Request,
  { params }: Params
) {

  try {

    const body = await request.json()

    const {
      name,
      description,
      image,
      status
    } = body

    await db.query(

      `UPDATE categories
      SET
      name=?,
      description=?,
      image=?,
      status=?
      WHERE id=?`,

      [
        name,
        description,
        image,
        status,
        params.id
      ]

    )

    return NextResponse.json({
      success: true,
      message: 'Category Updated'
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    )

  }

}