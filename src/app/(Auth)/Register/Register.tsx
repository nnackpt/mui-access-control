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
import Link from "next/link"
import { useState } from "react"

export default function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true);


        try {
            const res = await fetch("/api/Register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registration failed");
            } else {
                setSuccess("Registration successful. You can now login.");
                setForm({ firstName: '', lastName: '', email: '', password: '' });
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    };

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

    return (
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
                    onSubmit={handleSubmit}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <Avatar sx={{ m: 1, bgcolor: "black", width: 56, height: 56 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography component="h1" variant="h4" sx={{ color: "black", fontWeight: "bold", mt: 2, mb: 1 }}>
                            Create Account
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography component="p" variant="body1" sx={{ color: "grey.600", mb: 4 }}>
                            Register to get started
                        </Typography>
                    </motion.div>

                    <Stack spacing={2} sx={{ width: "100%", mt: 1 }}>
                        {error && (
                            <motion.div variants={itemVariants}>
                                <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div variants={itemVariants}>
                                <Alert severity="success" sx={{ width: '100%' }}>{success}</Alert>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <TextField required fullWidth name="firstName" label="First Name" value={form.firstName} onChange={handleChange} disabled={isSubmitting}
                                variant="outlined" sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <TextField required fullWidth name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} disabled={isSubmitting}
                                variant="outlined" sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <TextField required fullWidth name="email" label="Email Address" value={form.email} onChange={handleChange} disabled={isSubmitting}
                                variant="outlined" autoComplete="email" sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <TextField required fullWidth name="password" label="Password" type="password" value={form.password} onChange={handleChange} disabled={isSubmitting}
                                variant="outlined" autoComplete="new-password" sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'black' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitting}
                                component={motion.button}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
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
                                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: 'grey.500',
                                        color: 'white',
                                    },
                                }}
                            >
                                {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <Link href="/Login" style={{ textDecoration: "none" }}>
                                        <Typography variant="body2" sx={{ color: "black", "&:hover": { textDecoration: "underline" } }}>
                                            Already have an account? Sign In
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </motion.div>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
}
