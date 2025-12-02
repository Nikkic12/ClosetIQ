import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { useTheme } from '@mui/material/styles';
import { Container, Fade, Grow } from '@mui/material';


const cardData = [
  {
    img: 'https://res.cloudinary.com/dwuugri6p/image/upload/v1764702553/Screenshot_2025-12-02_133454_z9szrg.png',
    tag: 'Virtual Closet',
    title: 'Revolutionizing fashion in the digital age',
    description:
      "Upload your own clothes or explore our stylish collection to build a digital wardrobe that’s all yours. Keep everything organized and at your fingertips anytime, anywhere!",
  },
  {
    img: 'https://res.cloudinary.com/dwuugri6p/image/upload/v1764702202/Screenshot_2025-12-02_140312_oygqmh.png',
    tag: 'Outfit Creator',
    title: 'Innovative outfit creation features that saves you time',
    description:
      "Unleash your inner stylist! Swipe, mix, and match your pieces to create outfits you love—and save them so you’ll never run out of style inspiration.",
  },
  {
    img: 'https://res.cloudinary.com/dwuugri6p/image/upload/v1764702051/Screenshot_2025-12-02_140043_eqknvq.png',
    tag: 'Outfit Searching',
    title: 'Easy outfit filters',
    description:
      "Need a little fashion help? Our smart tagging system filters perfect outfit combos for any occassion.",
  },
  {
    img: 'https://res.cloudinary.com/dwuugri6p/image/upload/v1764702857/favicon_oqjboj_yndrky.png',
    tag: 'About Closet IQ',
    title: "Our company's journey: goals and achievements",
    description:
      "Read more about our company and our contributors in our About Page.",
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
  },
  {
    img: 'https://res.cloudinary.com/dwuugri6p/image/upload/v1764701918/Screenshot_2025-12-02_135808_ekytmh.png',
    tag: 'Personalized Account',
    title: 'Secure and convenient access to your style world',
    description:
      'Keep your closet and favorite outfits safe with a personal account. Log in anytime, anywhere.',
  }
];

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(269, 98%, 48%, 0.50)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // trigger animations after mount
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  const theme = useTheme();

  return (

    <Box sx={{
      display: 'flex', flexDirection: 'column', gap: 4,
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}14 55%)`,
      mt: 6,
    }}
    >
      <div>
        <Typography variant="h1" color="#673ab7" gutterBottom
          sx={{
            fontSize: '3.5rem', fontWeight: 700,
            color: '#7851A9',
          }}>
          ClosetIQ
        </Typography>
        <Typography variant="h3" color="#9E7BB5" >What is ClosetIQ?</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[0].img}
              sx={{
                aspectRatio: '16 / 9',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h2" color="#9E7BB5" component="div">
                {cardData[0].tag}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {cardData[0].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#B6B5D8" gutterBottom>
                {cardData[0].description}
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[1].img}
              aspect-ratio="16 / 9"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h2" color="#9E7BB5" component="div">
                {cardData[1].tag}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {cardData[1].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#B6B5D8" gutterBottom>
                {cardData[1].description}
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >

            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[2].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />

            <StyledCardContent>
              <Typography gutterBottom variant="h2" color="#9E7BB5" component="div">
                {cardData[2].tag}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {cardData[2].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#B6B5D8" gutterBottom>
                {cardData[2].description}
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(3)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[3].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h2" color="#9E7BB5" component="div">
                {cardData[3].tag}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {cardData[3].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#B6B5D8" gutterBottom>
                {cardData[3].description}
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
            sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h2" color="#9E7BB5" component="div">
                {cardData[5].tag}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {cardData[5].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#B6B5D8" gutterBottom>
                {cardData[5].description}
              </StyledTypography>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Container maxWidth="lg" sx={{ px: 4, mb: 8 }}>
          <Fade in={mounted} timeout={1200}>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                How does it work?
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 2, }}>
            {[
              { title: "Upload Clothes", text: "Upload photos of your clothes to get started with your virtual closet." },
              { title: "Create Outfits", text: "Create stylish outfits by swiping through your uploaded clothes." },
              { title: "Save & Share", text: "Save your favorite outfits to your own virtual closet." },
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
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="#7851A9" fontWeight={500}>
                      {value.text}
                    </Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
}
