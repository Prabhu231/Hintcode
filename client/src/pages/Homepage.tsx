import { useEffect, useState, useRef } from "react";
import {
    Box,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CircularProgress,
    Container,
    Paper,
    Button,
    TextField,
    InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

export default function Home() {
    const [problems, setProblems] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const problemsRef = useRef<HTMLDivElement>(null)
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

    const filteredProblems = Object.entries(problems).filter(([name]) => {
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const scrollToProblems = () => {
        problemsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    mb: 6,
                    background: "linear-gradient(135deg, #0a2540 0%, #1565c0 100%)",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        p: { xs: 4, md: 8 },
                        color: "white",
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: 4
                    }}
                >
                    <Box sx={{ flex: 7 }}>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            Master Algorithms with HintCode
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                            Your intelligent assistant for mastering Data Structures and Algorithms
                            with AI-powered hints and real-time code testing
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "#00b8a3",
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: "#009d8a"
                                }
                            }}
                            startIcon={<CodeIcon />}
                            onClick={scrollToProblems}
                        >
                            Start Coding
                        </Button>


                    </Box>

                    <Box sx={{
                        flex: 5,
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        minHeight: 300
                    }}>
                        <Box
                            component="img"
                            src="/hintcode.svg"
                            alt="HintCode Logo"
                            sx={{
                                maxWidth: "100%",
                                height: "auto",
                                filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.3))",
                                animation: "float 6s ease-in-out infinite",
                                '@keyframes float': {
                                    '0%': { transform: 'translateY(0px)' },
                                    '50%': { transform: 'translateY(-20px)' },
                                    '100%': { transform: 'translateY(0px)' }
                                }
                            }}
                        />
                    </Box>
                </Box>

                {/* Background pattern */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                        opacity: 0.3
                    }}
                />
            </Paper>

            {/* Problem Search */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search problems..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, bgcolor: "white" }
                    }}
                />
            </Box>

            {/* Problems List */}
            <Box sx={{ mb: 6 }} ref={problemsRef}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                        Practice Problems ({Object.keys(problems).length})
                    </Typography>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" mt={6}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: { xs: "center", sm: "flex-start" }
                    }}>
                        {filteredProblems.map(([name, id]) => (
                            <Card

                                sx={{
                                    borderRadius: 2,
                                    transition: "transform 0.15s, box-shadow 0.15s",
                                    '&:hover': {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 12px 20px -10px rgba(0,0,0,0.1)",
                                        bgcolor: "#f5f9ff"
                                    },
                                    width: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.33% - 16px)", lg: "calc(25% - 18px)" },
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "visible",
                                    border: "1px solid #e0e0e0"
                                }}
                                variant="outlined"
                            >
                                <CardActionArea
                                    onClick={() => navigate(`/problem/${id}`)}
                                    sx={{
                                        p: 0,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "stretch"
                                    }}
                                >
                                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight={600}
                                        >
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                )}

                {!loading && filteredProblems.length === 0 && (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" color="text.secondary">
                            No problems found matching your search
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Try adjusting your search term
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Features Section */}
            <Paper sx={{ borderRadius: 4, p: 4, mb: 6, bgcolor: "#f5f9ff" }}>
                <Typography variant="h5" fontWeight={600} textAlign="center" mb={4}>
                    Why Choose HintCode?
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4
                }}>
                    <Box sx={{
                        flex: 1,
                        textAlign: "center",
                        p: 2
                    }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                bgcolor: "#e3f2fd",
                                borderRadius: "50%",
                                p: 2,
                                mb: 2
                            }}
                        >
                            <CodeIcon sx={{ fontSize: 40, color: "#1565c0" }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            AI-Powered Hints
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Get intelligent hints that guide you toward the solution without giving everything away
                        </Typography>
                    </Box>

                    <Box sx={{
                        flex: 1,
                        textAlign: "center",
                        p: 2
                    }}>
                        <Box
                            sx={{
                                display: "inline-flex",
                                bgcolor: "#e8f5e9",
                                borderRadius: "50%",
                                p: 2,
                                mb: 2
                            }}
                        >
                            <CodeIcon sx={{ fontSize: 40, color: "#00b8a3" }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600} mb={1}>
                            Real-time Code Testing
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Test your code directly in the browser with multiple test cases and performance metrics
                        </Typography>
                    </Box>

                    <Box sx={{
                        flex: 1,
                        textAlign: "center",
                        p: 2
                    }}>
                        <Box 
              sx={{ 
                display: "inline-flex",
                bgcolor: "#fff8e1",
                borderRadius: "50%",
                p: 2,
                mb: 2
              }}
            >
              <SchoolIcon sx={{ fontSize: 40, color: "#ffc01e" }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Variety of Problems
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Problems cover a wide range of topics such as Graphs, Linked Lists, Arrays and more!!!!!
            </Typography>


                    </Box>
                </Box>
            </Paper>

            {/* Footer */}
            <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 4, pb: 2 }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: 2
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2025 HintCode - Your Algorithm Practice Assistant
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        gap: 3,
                        justifyContent: { xs: "flex-start", md: "flex-end" }
                    }}>
                        
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}