import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; 
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email!");
      return;
    }
    alert("Message Sent Successfully!");
  };

  return (
    <Container maxWidth="md" className="mt-5">
      {/* 🔹 Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          color: "#fff",
          p: 4,
          mb: 4,
          borderRadius: 2,
          backgroundImage: "url('/cricket-stadium.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          bgcolor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Get in Touch with Us!
        </Typography>
        <Typography variant="subtitle1">
          Have a question or need help? We're here to assist you.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}>
          <Typography variant="body1" display="flex" alignItems="center" gap={1}>
            <EmailIcon /> support@crickprediction.com
          </Typography>
          <Typography variant="body1" display="flex" alignItems="center" gap={1}>
            <PhoneIcon /> +123 456 7890
          </Typography>
        </Box>
      </Box>

      {/* 🔹 Contact Form */}
      <Paper sx={{ p: 4, borderRadius: 2 }} style={{ margin: "auto" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Contact Form
        </Typography>
        <form onSubmit={handleSubmit} className="form-container" >
          {/* <Grid container spacing={2} > */}
          <Grid md={12} sx={
            {
              display: "flex",
              // justifyContent:"space-around"
              justifyContent: "stretch ",
              gap: 2
            }
          }>
            <Grid item xs={12} sm={10}>
              <TextField

                label="Full Name"
                name="fullName"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} sx={{ mt: 2 }}>
            <Grid xs={12} sm={6} >
              <TextField
                label="Phone Number (Optional)"
                name="phone"
                type="number"
                fullWidth
                className=""
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} sm={6} sx={{ mt: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Inquiry Type</InputLabel>
                <Select name="inquiryType" onChange={handleChange}>
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Technical Support">Technical Support</MenuItem>
                  <MenuItem value="Payment Issues">Payment Issues</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid></Grid>


          {/* </Grid> */}



          <Grid item xs={12} md={12} sx={{ mt: 2 }}>
            {/* <Grid xs={12} > */}
            <TextField
              label="Your Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              onChange={handleChange}
            />
            {/* </Grid> */}
          </Grid>
          <Grid xs={12} textAlign="center" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Send Message
            </Button>
          </Grid>
        </form>
      </Paper>




    </Container>
  );
};

export default Contact;
