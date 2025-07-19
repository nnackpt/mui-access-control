import { DB } from "@/lib/Database"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
        } 

        const user = DB.prepare("SELECT * FROM users WHERE email = ?").get(email) as { id: number; email: string; password?: string; firstName: string; } | undefined

        if (!user || !user.password) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)

        if (!passwordsMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
        }

        const token = jwt.sign({ id: user.id, email: user.email, firstName: user.firstName }, process.env.JWT_SECRET!, { expiresIn: "1h" })

        ;(await cookies()).set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 60 * 60, path: '/' })

        return NextResponse.json({ message: "Login successful" }, { status: 200 })
    } catch (err) {
        console.error('[LOGIN_POST_ERROR]', err)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}