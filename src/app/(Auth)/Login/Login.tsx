"use client"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import Grid from "@mui/material/Grid"

import { motion, Variants } from "framer-motion"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    const formVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            const res = await fetch("/api/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (res.ok) {
                router.push("/")
            } else {
                const data = await res.json()
                setError(data.message || "Login failed. Please check your credentials.")
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.")
            console.error(err) 
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <AnimatedBackground />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: { xs: 3, sm: 5 },
                            borderRadius: 3,
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                            width: "100%"
                        }}
                        component={motion.form}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
                    >
                        <motion.div variants={itemVariants}>
                            <Avatar
                                sx={{
                                    m: 1,
                                    bgcolor: "black",
                                    width: 56,
                                    height: 56
                                }}
                            >
                                <LockOutlinedIcon />
                            </Avatar>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    color: "black",
                                    fontWeight: "bold",
                                    mt: 2,
                                    mb: 1
                                }}
                            >
                                Welcome Back
                            </Typography>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Typography
                                component="p"
                                variant="body1"
                                sx={{
                                    color: "grey.600",
                                    mb: 4
                                }}
                            >
                                Sign in to continue
                            </Typography>
                        </motion.div>

                        {error && (
                            <motion.div variants={itemVariants} style={{ width: "100%", marginBottom: "1rem" }}>
                                <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
                            </motion.div>
                        )}

                        <Stack spacing={3} sx={{ width: "100%" }}>
                            <motion.div variants={itemVariants}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isSubmitting}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isSubmitting}
                                    component={motion.button}
                                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                    transition={{ duration: 0.2 }}
                                    sx={{
                                        py: 1.5,
                                        mt: 2,
                                        bgcolor: "black",
                                        color: "white",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                                        "&:hover": {
                                            bgcolor: "#333",
                                            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)"
                                        },
                                        '&.Mui-disabled': {
                                            backgroundColor: 'grey.500',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                                </Button>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Grid container justifyContent="center">
                                    <Grid>
                                        <Link href="/Register" style={{ textDecoration: "none" }}>
                                            <Typography variant="body2" sx={{ textAlign: "center" ,color: "black", "&:hover": { textDecoration: "underline" } }}>
                                                {"Don't have an account? Sign Up"}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </>
    )
}