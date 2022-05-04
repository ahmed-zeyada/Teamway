import { Box, Typography } from "@mui/material";

const AdminTrait = ({ trait }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", marginLeft: "20px" }}>
        <Typography>from </Typography>
        <Typography sx={{ marginLeft: "20px", fontWeight: "bold" }}>
          {trait.from}
        </Typography>
        <Typography sx={{ marginLeft: "20px" }}>to </Typography>
        <Typography sx={{ marginLeft: "20px", fontWeight: "bold" }}>
          {trait.to}
        </Typography>
        <Typography sx={{ marginLeft: "20px" }}>======&#62; </Typography>
        <Typography sx={{ marginLeft: "20px", fontStyle: "italic" }}>
          {trait.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminTrait;
