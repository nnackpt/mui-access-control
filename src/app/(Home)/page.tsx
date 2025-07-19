import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import { Box, Container, Typography } from "@mui/material"

interface UserPayload {
  id: number
  email: string
  firstName: string
}

const getUser = async (): Promise<UserPayload | null> => {
  const token = (await cookies()).get('token')?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
    return decoded
  } catch (err) {
    console.error(err)
    return null
  }
}

export default async function Home() {
  const user = await getUser()

  if (!user) {
    redirect("/Login")
  }

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>Welcome, {user.firstName}!</Typography>
        <Typography variant="h5" color="text.secondary">You are successfully logged in.</Typography>
      </Box>
    </Container>
  )
}