import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper, Box, Typography } from "@mui/material";

const styles = {
  mainBox: {
    borderRadius: "10px",
    border: "1px solid #FFFFFF0A",
    padding: "13px",
  },
  accordionStyle: {
    // background: "#FFFFFF0D",

    borderRadius: "10px",
    // boxShadow: "8px 8px 30px rgba(0, 0, 0, 0.05)",
  },
  accordionQues: {
    padding: "0",
    fontSize: "18px",
    LineWeight: "1.2",
    "@media(max-width:420px)": {
      fontSize: "15px",
    },
  },
  accordionAns: {
    fontSize: "14px",

    color: "#919095",
  },
  accordionSummaryContent: {
    margin: "0",
    fontSize: "16px",
    lineHeight: "23px",
    fontWeight: 500,
  },
};
const Accordions = ({ data, index, expanded, handleChange }) => {
  const { question, answer } = data;

  return (
    <Paper elevation={1} sx={styles.mainBox} component={Box} mb={2}>
      <Accordion
        style={styles.accordionStyle}
        expanded={expanded === index} // Control expanded state based on index
        onChange={() => handleChange(index)}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ color: "rgba(255, 255, 255, 1)" }} />
          }
          aria-controls="panel1-content"
          id="panel1-header"
          style={styles.accordionQues}
        >
          <Typography
            variant="h5"
            color="primary"
            style={styles.accordionSummaryContent}
          >
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: "-13px" }}>
          <Typography
            variant="body2"
            color="secondary"
            style={styles.accordionAns}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Accordions;
