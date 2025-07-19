import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        (await cookies()).set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/"
        })

        return NextResponse.json({ message: "Logout successful" }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}