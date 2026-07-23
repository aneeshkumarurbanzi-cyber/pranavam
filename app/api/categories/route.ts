import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {

    try{

        const [rows] = await db.query(
            'SELECT * FROM categories ORDER BY id DESC'
        )

        return NextResponse.json(rows)

    }catch(error){

        console.log(error)

        return NextResponse.json(
            {message:'Database Error'},
            {status:500}
        )

    }

}

export async function POST(request:Request){

    try{

        const body = await request.json()

        const {
            name,
            description,
            image,
            status
        } = body

        await db.query(

            `INSERT INTO categories
            (name,description,image,status)
            VALUES(?,?,?,?)`,

            [
                name,
                description,
                image,
                status
            ]

        )

        return NextResponse.json({
            success:true,
            message:'Category Added'
        })

    }catch(error){

        console.log(error)

        return NextResponse.json(
            {success:false},
            {status:500}
        )

    }

}