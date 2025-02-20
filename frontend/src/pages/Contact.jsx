import React from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  Email,
  WhatsApp,
  ExpandMore,
  Twitter,
  Facebook,
  Instagram,
  Phone,
} from '@mui/icons-material';

const Contact = () => {
  const faqs = [
    {
      question: "How accurate are the predictions?",
      answer: "Our predictions are based on comprehensive data analysis and historical patterns, typically achieving high accuracy rates."
    },
    {
      question: "How often are predictions updated?",
      answer: "Predictions are updated daily, considering the latest match data and player statistics."
    },
    {
      question: "Is the service free to use?",
      answer: "We offer both free and premium predictions. Basic predictions are free, while detailed analysis requires a subscription."
    }
  ];

  const testimonials = [
    {
      name: "Rahul Kumar",
      text: "The predictions have been incredibly helpful for my fantasy cricket teams!",
      role: "Cricket Enthusiast"
    },
    {
      name: "Sarah Smith",
      text: "Great analysis and accurate predictions. Highly recommended!",
      role: "Sports Analyst"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Info Section */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              height: '100%',
              background: 'linear-gradient(45deg,rgb(29, 158, 218) 0%,rgb(92, 191, 206) 100%)', // Deep blue gradient
              borderRadius: 3,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
                zIndex: 1
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  mb: 4,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Let's Connect
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      p: 2,
                      borderRadius: '50%',
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Email sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        mb: 0.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      Email Us
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      support@crickpredict.com
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      p: 2,
                      borderRadius: '50%',
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <WhatsApp sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        mb: 0.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      WhatsApp
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      +91 1234567890
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.15)',
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      p: 2,
                      borderRadius: '50%',
                      mr: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Phone sx={{ color: 'white', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        mb: 0.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      Call Us
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      +91 0987654321
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography 
                variant="h5" 
                sx={{ 
                  mt: 5, 
                  mb: 3, 
                  fontWeight: 700,
                  color: 'white'
                }}
              >
                Follow Us
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    p: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Twitter sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    p: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Facebook sx={{ fontSize: 28 }} />
                </IconButton>
                <IconButton 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    p: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <Instagram sx={{ fontSize: 28 }} />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Send us a Message
            </Typography>
            
            <Box component="form" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Subject"
                    variant="outlined"
                    required
                    defaultValue=""
                    SelectProps={{
                      native: false,
                    }}
                  >
                    <MenuItem value="">Select a subject</MenuItem>
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="support">Technical Support</MenuItem>
                    <MenuItem value="feedback">Feedback</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      py: 1.5
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* FAQs Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography fontWeight={500}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {/* Testimonials Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Typography variant="body1" paragraph>
                    "{testimonial.text}"
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;