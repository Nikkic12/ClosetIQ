import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Stack,
  Divider,
  Grow,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = { disableCustomTheme?: boolean };

export default function About(props: Props) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger animations after mount
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const teamMembers = [
    {
      name: "Nikki Chen",
      role: "Product Owner",
      image: "https://res.cloudinary.com/dwuugri6p/image/upload/v1763605527/team1_y33s4y.jpg",
      bio: "Passionate about revolutionizing how we interact with our wardrobes through technology.",
    },
    {
      name: "Jaxon Kundrat",
      role: "Scrum Master",
      image: "https://res.cloudinary.com/dwuugri6p/image/upload/v1763605528/team2_xt9hi0.jpg",
      bio: "Building intelligent systems that make fashion accessible and sustainable for everyone.",
    },
    {
      name: "Tyler Tsarnas",
      role: "Developer",
      image: "https://res.cloudinary.com/dwuugri6p/image/upload/v1763605528/team3_pfnehn.jpg",
      bio: "Creating beautiful, intuitive experiences that make getting dressed a joy, not a chore.",
    },
    {
      name: "Alexus Ear",
      role: "Developer",
      image: "https://res.cloudinary.com/dwuugri6p/image/upload/v1763605529/team4_mbrtk8.jpg",
      bio: "Obsessed with user experience and making technology that truly serves people's needs.",
    },
  ];

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Navbar />

      {/* Page background */}
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}14 55%)`,
          pb: 8,
          mt: 6,
        }}
      >
        {/* HERO */}
        <Container maxWidth="lg" sx={{ pt: 10, pb: 6}}>
          <Fade in={mounted} timeout={600}>
            <Box textAlign="center">
              <Typography
                variant={isSm ? "h3" : "h2"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                ClosetIQ
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mt: 1, maxWidth: 720, mx: "auto", color: "#524F81" }}
              >
                ClosetIQ is your all-purpose digital closet for styling and outfit recommendations
              </Typography>
            </Box>
          </Fade>
        </Container>

        {/* MISSION */}
        <Container maxWidth="md" sx={{ mb: 8 }}>
          <Grow in={mounted} timeout={700}>
            <Card
              elevation={6}
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 3,
                bgcolor: "background.paper",
                boxShadow: (t) => t.shadows[8], 
              }}
            >
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 900, mt: -2, mb: 2 }}>
                Our Mission
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, mt: 1, color: "#7851A9", fontWeight: 510, fontSize: "1.00rem" }}>
              ClosetIQ transforms your closet into a smart, digital space. By uploading photos of your clothes, you can virtually try them on through character customization to build outfits and get personalized recommendations.  
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, color: "#7851A9", fontWeight: 510, fontSize: "1.00rem"}}>
              It’s more than organization; it’s an interactive way to discover new looks, save time, and get the most out of every piece you own. 
              </Typography>

            </Card>
          </Grow>
        </Container>

        {/* TEAM */}
        <Container maxWidth="lg" sx={{ px: 4, mb:15 }}>
  <Fade in={mounted} timeout={800}>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Meet the Team
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mt: 1, maxWidth: 760, mx: "auto", color: "#7851A9", fontWeight: 510, }}
      >
        We're a diverse group of technologists, designers, and fashion enthusiasts united by one goal:
        making your wardrobe work smarter for you.
      </Typography>
    </Box>
  </Fade>

  <Grid container spacing={4} justifyContent="center">
    {teamMembers.map((member, index) => (
      <Grid key={member.name}>
        <Grow in={mounted} timeout={900 + index * 120}>
          <Card
            elevation={4}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 250ms, box-shadow 250ms",
              "&:hover": { transform: "translateY(-6px)", boxShadow: 10 },
              display: "flex",
              flexDirection: "column",
              height: "100%",
              p:0,
              maxWidth: 380,
            }}
          >
            <Box sx={{aspectRatio: "1", overflow: "hidden", maxHeight: 450,}}>
           {/* <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}> */}
              <CardMedia
                component="img"
                // height="220"
                image={member.image}
                alt={member.name}
                sx={{ width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 300ms",
                "&:hover": { transform: "scale(1.05)" }, }}
              /> 
              </Box>
              <CardContent sx={{p:2, ml:0.5, mt: -2, mb: 1.5,}}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, background: "linear-gradient(90deg, #603FEF, #7A4989)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent" }}>
                      {member.role}
                    </Typography>
                <Typography variant="body2" color="text.secondary"sx={{ flexGrow: 1, fontWeight: 400, }}>
                {member.bio} 
                </Typography>
              </CardContent>
          </Card>
        </Grow>
      </Grid>
    ))}
  </Grid>
</Container>

{/* ======================= WHAT WE BELIEVE ======================= */}
<Container maxWidth="lg" sx={{ px: 4, mb: 8 }}>
  <Fade in={mounted} timeout={1200}>
    <Box sx={{ textAlign: "center", mb: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        What We Believe
      </Typography>
    </Box>
  </Fade>

  <Grid container spacing={4} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2, }}>
    {[
      { icon: StarIcon, title: "Simplicity", text: "Technology should make life easier, not more complicated. We keep things simple and intuitive." },
      { icon: AutorenewIcon, title: "Sustainability", text: "By helping you rediscover and maximize your existing wardrobe, we promote conscious consumption." },
      { icon: FavoriteIcon, title: "Empowerment", text: "Everyone deserves to feel confident in what they wear. We're here to empower your style journey." },
    ].map((value, index) => (
      <Grid key={value.title}>
        <Grow in={mounted} timeout={1300 + index * 100}>
          <Card
            elevation={4}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              height: "100%",
              transition: "transform 250ms, box-shadow 250ms",
              "&:hover": { transform: "translateY(-6px)", boxShadow: 10 },
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: "white",
              }}
            >
              <value.icon fontSize="large" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {value.title}
            </Typography>
            <Typography variant="body2" color= "#7851A9" fontWeight={500}>
              {value.text}
            </Typography>
          </Card>
        </Grow>
      </Grid>
      ))}
    </Grid>
  </Container>
      </Box>

      <Footer />
    </AppTheme>
  );
}
