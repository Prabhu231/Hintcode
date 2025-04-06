import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Container,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProblemMap {
    [problemName: string]: string;
}

export default function Home() {
    const [problems, setProblems] = useState<ProblemMap>({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
                setProblems(res.data.problems);
            } catch (err) {

                console.error("Failed to fetch problems", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* SVG Banner */}
            <Box display="flex" justifyContent="center" mb={4}>
                <img
                    src="/hintcode.svg"
                    alt="HintCode Logo"
                    style={{ maxWidth: "100%", height: "150px" }}
                />
            </Box>

            {/* Intro */}
            <Box textAlign="center" mb={6}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    Welcome to HintCode
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto">
                    HintCode is your intelligent assistant for mastering Data Structures and Algorithms.
                    Struggling with a problem? We’ve got you covered with AI-powered hints and
                    real-time code testing.
                </Typography>
            </Box>

            <Typography variant="h5" fontWeight={500} mb={3}>
                Practice Problems ({Object.keys(problems).length})
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={6}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={3}
                    justifyContent="center"
                >
                    {Object.entries(problems).map(([name, id]) => (
                        <Card
                            key={id}
                            sx={{
                                width: 280,
                                height: 120,
                                borderRadius: 3,
                                transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                                '&:hover': {
                                    transform: "scale(1.03)",
                                    boxShadow: 6,
                                    backgroundColor: "#e3f2fd", // Light blue on hover
                                },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f9f9f9",
                                border: "1px solid #e0e0e0"
                            }}
                            variant="outlined"
                        >
                            <CardActionArea
                                disableRipple
                                onClick={() => navigate(`/problem/${id}`)}
                                sx={{
                                    height: "100%",
                                    width: "100%",
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    '&:hover': {
                                        backgroundColor: "transparent" // Remove dark hover overlay
                                    }
                                }}
                            >

                                <CardContent sx={{ p: 0 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={600}
                                        textAlign="center"
                                        sx={{
                                            color: "#333",
                                            fontSize: "1rem",
                                            px: 1
                                        }}
                                    >
                                        {name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
}
