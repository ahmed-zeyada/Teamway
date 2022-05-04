import { Typography, Box } from "@mui/material";

const TestResult = ({ testSession }) => {
  const fullName = testSession.fullName?.trim();
  const result = testSession.result;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Congrats {fullName}!</Typography>
      <Typography variant="h6">
        You have completed the test, Here is your personality traits
      </Typography>
      <Typography variant="h3">{result}</Typography>
    </Box>
  );
};

export default TestResult;
