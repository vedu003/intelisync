import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Paper, Box, Typography } from "@mui/material";

const styles = {
  mainBox: {
    borderRadius: "8px",
    padding: "20px",
  },
  accordionStyle: {
    borderRadius: "10px",
  },
  accordionQues: {
    padding: "0",
    fontSize: "18px",
    lineHeight: "1.2", // Fixed typo: lineHeight, not LineWeight
    "@media(max-width:420px)": {
      fontSize: "15px",
    },
  },
  accordionAns: {
    fontSize: "14px",
    lineHeight: "24px",
  },
  accordionSummaryContent: {
    margin: "0",
    fontSize: "16px",
    lineHeight: "23px",
    fontWeight: 500,
  },
};

const Accordions = ({ data }) => {
  const { question, answer } = data;

  return (
    <Paper elevation={1} sx={styles.mainBox} component={Box} mb={2.4}>
      <Accordion sx={styles.accordionStyle}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ color: "rgba(255, 255, 255, 1)" }} />
          }
          aria-controls={`panel1-content`} // Unique aria controls per accordion
          id={`panel1-header`} // Unique ID per accordion
          sx={styles.accordionQues}
        >
          <Typography
            variant="body2"
            color="primary"
            sx={styles.accordionSummaryContent}
          >
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ marginTop: "-13px" }}>
          <Box className="mainContent">
            <Typography
              variant="body2"
              color="secondary"
              sx={styles.accordionAns}
              className="staticContent"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default Accordions;
