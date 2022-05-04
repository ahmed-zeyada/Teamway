import { Typography, Slider } from "@mui/material";

const EditAdminQuestionScore = ({ score, onChange }) => {
  return (
    <>
      <Typography
        sx={{
          marginRight: "15px",
          color: score < 0 ? "green" : "gray",
        }}
        variant={score < 0 ? "h6" : "body2"}
      >
        introvert {score < 0 ? `(${score})` : `(0)`}
      </Typography>
      <Slider
        min={-5}
        max={5}
        step={1}
        value={score}
        onChange={(e) => onChange(e.target.value)}
        sx={{ width: "50%" }}
      ></Slider>
      <Typography
        sx={{
          marginLeft: "15px",
          color: score > 0 ? "green" : "gray",
        }}
        variant={score > 0 ? "h6" : "body2"}
      >
        extrovert {score > 0 ? `(${score})` : `(0)`}
      </Typography>
    </>
  );
};

export default EditAdminQuestionScore;
