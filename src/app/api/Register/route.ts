import { DB } from "@/lib/Database"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, firstName, lastName, password } = body

        if (!email || !firstName || !lastName || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        const existingUser = DB.prepare("SELECT * FROM Users WHERE email = ?").get(email)

        if (existingUser) {
            return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const stmt = DB.prepare("INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)")
        stmt.run(firstName, lastName, email, hashedPassword)

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
    } catch (err) {
        console.error('[REGISTER_POST_ERROR]', err)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}