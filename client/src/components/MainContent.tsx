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


const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Virtual Closet',
    title: 'Revolutionizing fashion in the digital age',
    description:
      "Upload your own clothes or explore our stylish collection to build a digital wardrobe that’s all yours. Keep everything organized and at your fingertips anytime, anywhere!",
    authors: [
      { name: 'ClosetIQ Team', avatar: '/static/images/avatar/1.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Outfit Creator',
    title: 'Innovative outfit creation features that saves you time',
    description:
      "Unleash your inner stylist! Swipe, mix, and match your pieces to create outfits you love—and save them so you’ll never run out of style inspiration.",
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/6.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Outfit Recommendations',
    title: 'Easy outfit recommendations for any occasion',
    description:
      "Need a little fashion help? Our smart tagging system suggests perfect outfit combos for any occasion.",
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'About Closet IQ',
    title: "Our company's journey: goals and achievements",
    description:
      "Read more about our company and our contributors in our About Page.",
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/3.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: 'ClosetIQ Team', avatar: '/static/images/avatar/4.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Personalized Account',
    title: 'Secure and convenient access to your style world',
    description:
      'Keep your closet and favorite outfits safe with a personal account. Log in anytime, anywhere.',
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/2.jpg' }],
  },
  {
    img: 'src/assets/step1.png',
    tag: 'Upload Clothes',
    title: 'Upload photos of your clothes to get started with your virtual closet.',
    description:
      '',
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/2.jpg' }],
  },
  {
    img: 'src/assets/step2.png',
    tag: 'Create Outfits ',
    title: 'Create stylish outfits by swiping through your uploaded clothes.',
    description:
      '',
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/2.jpg' }],
  },
  {
    img: 'src/assets/step3.png',
    tag: 'Save Outfits',
    title: 'Save your favorite outfits to your own virtual closet.',
    description:
      '',
    authors: [{ name: 'ClosetIQ Team', avatar: '/static/images/avatar/2.jpg' }],
  },
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

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <CheckroomIcon fontSize="small" color="primary" />
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
}

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

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4,
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}14 55%)`,
          pb: 8,
          mt: 6,
        }} 
        >
      <div>
        <Typography variant="h1" color = "#673ab7" gutterBottom
          sx={{ fontSize: '3.5rem', fontWeight: 700,
            color: '#7851A9', }}>
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          {/* <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Virtual Closet"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Outfit Recommendations"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Outfit Creator"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Pesonalized Account"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          /> */}
        </Box>

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
            <Author authors={cardData[0].authors} />
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
            <Author authors={cardData[1].authors} />
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
            <Author authors={cardData[2].authors} />
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
            <Author authors={cardData[3].authors} />
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
            <Author authors={cardData[5].authors} />
          </StyledCard>
        </Grid>

        <Grid size = {{ xs: 16, md: 12 }}> <Typography  variant="h3" align="center" backgroundcolor = "#ede7f6" color="#9E7BB5">How Does It Work?</Typography></Grid>    
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
              image={cardData[6].img}
              sx={{
                width: { xs: '60%', sm: '65%', md: '70%' },  
                height: 'auto',                               
                objectFit: 'contain',                        
                display: 'block',                            
                mx: 'auto',                                  
                mt: 2,  
              }}
            />
           
            <StyledCardContent>
              <Typography gutterBottom variant="h2" align="center" color="#9E7BB5" component="div">
                {cardData[6].tag}
              </Typography>
              <Typography gutterBottom variant="h3" align ="center" component="div">
                {cardData[6].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#9E7BB5" gutterBottom>
                {cardData[6].description}
              </StyledTypography>
            </StyledCardContent>
            <Author authors={cardData[2].authors} />
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
              image={cardData[7].img}
              sx={{
                width: { xs: '60%', sm: '65%', md: '70%' },  
                height: 'auto',                               
                objectFit: 'contain',                        
                display: 'block',                            
                mx: 'auto',                                  
                mt: 2,   
              }}
            />
            <StyledCardContent>
               <Typography gutterBottom variant="h2" align="center" color="#9E7BB5" component="div">
                {cardData[7].tag}
              </Typography>
              <Typography gutterBottom variant="h3" align ="center" component="div">
                {cardData[7].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#9E7BB5" gutterBottom>
                {cardData[7].description}
              </StyledTypography>
            </StyledCardContent>
            <Author authors={cardData[3].authors} />
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
              image={cardData[8].img}
              sx={{
                width: { xs: '60%', sm: '65%', md: '70%' },  
                height: 'auto',                               
                objectFit: 'contain',                        
                display: 'block',                            
                mx: 'auto',                                  
                mt: 2,   
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h2" align="center" color="#9E7BB5" component="div">
                {cardData[8].tag}
              </Typography>
              <Typography gutterBottom variant="h3" align ="center" component="div">
                {cardData[8].title}
              </Typography>
              <StyledTypography variant="body1" fontSize={14} color="#9E7BB5" gutterBottom>
                {cardData[8].description}
              </StyledTypography>
            </StyledCardContent>
            <Author authors={cardData[5].authors} />
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
