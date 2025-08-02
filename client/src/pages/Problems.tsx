import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
    Alert,
    IconButton,
    Snackbar,
} from "@mui/material";
import { Fullscreen, FullscreenExit, Home } from "@mui/icons-material";

const maxPollAttempts = parseInt(process.env.REACT_APP_MAX_POLL_ATTEMPTS as string);

function SubmissionResult({ result }: { result: string }) {
    const getSeverity = () => {
        if (result.startsWith("Success")) return "success";
        if (result.startsWith("Compilation Error")) return "error";
        return "warning";
    };

    return (
        <Alert severity={getSeverity()} sx={{ mt: 2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {result}
        </Alert>
    );
}

export default function Problem() {
    const { id } = useParams<{ id: string }>();
    const [code, setCode] = useState<string>("// Write your C++ code here");
    const [hint, setHint] = useState<string>("");
    const [problemDetails, setProblemDetails] = useState<string>("");
    const [submissionResult, setSubmissionResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hintLoading, setHintLoading] = useState<boolean>(false);
    const [bestCaseComplexity, setBestCaseComplexity] = useState<string>("");
    const [sampleTestcases, setSampleTestcases] = useState<string>("");
    const [editorFullscreen, setEditorFullscreen] = useState<boolean>(false);
    const [demoAlertOpen, setDemoAlertOpen] = useState<boolean>(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/problem/${id}`);

                setProblemDetails(response.data.description);                
                setBestCaseComplexity(response.data.bestCaseComplexity);
                setSampleTestcases(response.data.sampleTestcases);
            } catch (error) {
                setProblemDetails("Error fetching problem details");
            } finally {
                setIsLoading(false);
                setSubmissionResult("")
                setHint("")
            }
        };
        fetchProblemDetails();
    }, [id]);

    const handleSubmit = async () => {
        setLoading(true);
        setSubmissionResult("");
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/problem/submit`, {
                problemId: id,
                code,
            });
            localStorage.setItem("jobId", response.data.jobId);
            pollJobStatus();
        } catch (error) {
            setSubmissionResult("Error occurred. Please try again.");
            setLoading(false);
        }
    };

    const pollJobStatus = () => {
        let pollAttempts = 0;

        const interval = setInterval(async () => {
            if (pollAttempts >= maxPollAttempts) {
                
                setSubmissionResult("Your code has failed the time constraints");
                setLoading(false);
                clearInterval(interval);
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/check-status/?id=${localStorage.getItem("jobId")}`
                );

                if (response.data.completed) {
                    setSubmissionResult(
                        response.data.result.success
                            ? `Success: Passed All Testcases`
                            : response.data.result.syntaxError
                                ? `${response.data.result.syntaxError}`
                                : `Failed Testcase: ${response.data.result.failedTestCase}`
                    );
                    setLoading(false);
                    clearInterval(interval);
                }
            } catch (error) {
                setSubmissionResult("Error fetching job status.");
                setLoading(false);
                clearInterval(interval);
            }

            pollAttempts++;
        }, 3000);
    };

    const EditorComponent = (
        <Box
            position="relative"
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: editorFullscreen ? "100vh" : "auto",
                width: editorFullscreen ? "100vw" : "auto",
                zIndex: editorFullscreen ? 1300 : "auto",
                position: editorFullscreen ? "fixed" : "relative",
                top: 0,
                left: 0,
                backgroundColor: "#fff",
                p: editorFullscreen ? 2 : 3,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Code Editor</Typography>
                <IconButton onClick={() => setEditorFullscreen(!editorFullscreen)}>
                    {editorFullscreen ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
            </Box>

            <Box flexGrow={1}>
                <Editor
                    height={editorFullscreen ? "calc(100vh - 200px)" : "400px"}
                    defaultLanguage="cpp"
                    value={code}
                    theme="light"
                    onChange={(value) => value && setCode(value)}
                    options={{ fontSize: 14, lineNumbers: "on", minimap: { enabled: false } }}
                />
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, borderRadius: 2, height: 40 }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="inherit">
                            Processing...
                        </Typography>
                    </>
                ) : (
                    "Submit Code"
                )}
            </Button>

            {/* Show submission result below submit button */}
            {submissionResult && (
                <Box mt={2}>
                    <SubmissionResult result={submissionResult} />
                </Box>
            )}
        </Box>
    );

    return (
        <Box sx={{ p: 4, height: "100vh", overflow: "hidden", width: "100vw" }}>
            {/* Demo Alert Snackbar */}
            <Snackbar
                open={demoAlertOpen}
                autoHideDuration={3000}
                onClose={() => setDemoAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="info" 
                    variant="filled" 
                    elevation={6}
                    sx={{ width: '100%' }}
                >
                    Demo code loaded for Problem {id}
                </Alert>
            </Snackbar>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Home />}
                        onClick={() => navigate("/")}
                    >
                        Go Back
                    </Button>
                    <Button
                        variant="outlined"
                        disabled={parseInt(id as string) <= 1}
                        onClick={() => navigate(`/problem/${parseInt(id as string) - 1}`)}
                    >
                        &larr; Previous 
                    </Button>
                </Box>
                <Typography variant="h4" fontWeight={600}>
                    Problem {id}
                </Typography>
                <Button
                    variant="outlined"
                    disabled={parseInt(id as string) >= 51}
                    onClick={() => navigate(`/problem/${parseInt(id || "0") + 1}`)}
                >
                    Next &rarr;
                </Button>
            </Box>

            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={4}
                height="calc(100% - 64px)"
            >
                {/* Problem Section */}
                <Paper
                    elevation={3}
                    sx={{
                        flex: 1,
                        p: 3,
                        minHeight: 0,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Problem Description
                    </Typography>

                    {isLoading ? (
                        <Box display="flex" justifyContent="center" my={4}>
                            <CircularProgress color="primary" />
                        </Box>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            {problemDetails}
                        </Typography>
                    )}

                    <Box mt={3}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            Best Case Complexity:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {bestCaseComplexity}
                        </Typography>
                    </Box>

                    <Box mt={3}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            Sample Testcases:
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                                {sampleTestcases}
                            </Typography>
                        </Paper>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, borderRadius: 2 }}
                        onClick={async () => {
                            setHintLoading(true);
                            setHint("");
                            try {
                                const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/get-ai-hint/`, {
                                    problem: problemDetails,
                                    code,
                                });
                                setHint(res.data.hint);
                            } catch (error) {
                                setHint("Failed to generate AI hint. Please try again.");
                            } finally {
                                setHintLoading(false);
                            }
                        }}
                        disabled={hintLoading}
                    >
                        {hintLoading ? (
                            <>
                                <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                                <Typography variant="body2" color="inherit">
                                    Generating...
                                </Typography>
                            </>
                        ) : (
                            "Want a Hint? Click here"
                        )}
                    </Button>

                    {hint && (
                        <Alert severity="info" sx={{ mt: 3 }}>
                            <Typography variant="body2">💡 {hint}</Typography>
                        </Alert>
                    )}
                </Paper>

                {!editorFullscreen && (
                    <Paper
                        elevation={3}
                        sx={{
                            flex: 1,
                            p: 0,
                            minHeight: 0,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {EditorComponent}
                    </Paper>
                )}
            </Box>

            {/* Fullscreen overlay editor */}
            {editorFullscreen && EditorComponent}
        </Box>
    );
}
