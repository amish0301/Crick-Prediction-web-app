import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube, ArrowUpward } from "@mui/icons-material";
import Home from "../pages/Home";


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        background:" #115293", // Dark gradient
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Links
            </Typography>
            {["Home", "Live Matches", "Upcoming Matches", "Completed Matches", "Leaderboard", "Terms & Conditions", "Privacy Policy"].map((link, index) => (
              <Typography key={index} variant="body2">
                <Link
                  href="/"
                  color="inherit"
                  underline="none"
                  sx={{
                    display: "block",
                    py: 0.5,
                    transition: "0.3s",
                    "&:hover": { color: "#fddb3a" },
                  }}
                >
                  {link}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ py: 0.5 }}>📧 Email: support@crickprediction.com</Typography>
            <Typography variant="body2" sx={{ py: 0.5 }}>📞 Phone: +123 456 7890</Typography>
            <Typography variant="body2" sx={{ py: 0.5 }}>📍 Address: Ahmedabad</Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Follow Us
            </Typography>
            <Box>
              {[
                { icon: <Facebook />, link: "#" },
                { icon: <Twitter />, link: "#" },
                { icon: <Instagram />, link: "#" },
                { icon: <YouTube />, link: "#" },
              ].map((item, index) => (
                <IconButton
                  key={index}
                  href={item.link}
                  color="inherit"
                  sx={{
                    mx: 0.5,
                    transition: "0.3s",
                    "&:hover": { color: "#fddb3a", transform: "scale(1.1)" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* About the App */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              About the App
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: "250px", opacity: 0.8 }}>
              "Your go-to platform for cricket predictions! Predict match outcomes, earn rewards, and stay updated on all tournaments."
            </Typography>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, borderColor: "gray" }} />

        {/* Legal & Copyright */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2025 Crick Prediction. All rights reserved.
            </Typography>
          </Grid>

          <Grid item>
            <Button
              onClick={scrollToTop}
              startIcon={<ArrowUpward />}
              sx={{
                color: "white",
                textTransform: "none",
                border: "1px solid #fddb3a",
                borderRadius: "20px",
                px: 3,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#fddb3a",
                  color: "#1a1a2e",
                },
              }}
            >
              Back to Top
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
