import React from 'react';

import { Box, Typography, Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function About() {
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          bgcolor: 'background.paper',
          padding: '5px',
          borderRadius: '8px',
          textAlign: 'center',
          overflow: 'scroll',
        }}
      >
        <Typography id="modal-modal-title" variant="h4" component="h2">
          About Us
        </Typography>
        <div className="about-lane">
          <Typography
            id="modal-modal-description"
            variant="h6"
            sx={{ mt: '1px' }}
          >
            Lane Hamilton
          </Typography>
          <Typography id="modal-modal-description">
            I'm a Frontend Software Engineer with a strong passion for crafting
            exceptional user experiences. I specialize in developing frontend
            JavaScript applications using React, and I like to add a dash of
            Sass for that extra flair. 🌈​​ {<br></br>} I'm proud to have shared
            my knowledge and experience by presenting on UX Design Best
            Practices as part of Codesmith, Jeeny, and Bractlet's Tech Talk
            Series. 💪🏻​ {<br></br>} I'm always eager to connect and discuss
            exciting projects or ideas. Feel free to reach out I'm ready to
            chat! ✉️​ If you're curious about my ongoing projects, you can check
            them out on my GitHub profile ✨​
          </Typography>
          <Link
            href="https://www.linkedin.com/in/aleyna-hamilton/"
            style={{ display: 'block' }}
          >
            LinkedIn
          </Link>
          <Link href="https://github.com/LaneEcho" style={{ display: 'block' }}>
            GitHub
          </Link>
        </div>
        <div className="about-tegan">
          <Typography
            id="modal-modal-description"
            variant="h6"
            sx={{ mt: '1px' }}
          >
            Tegan Barron
          </Typography>
          <Typography id="modal-modal-description">
            I'm Tegan, affectionately known as "tea-gun,“ and host "Koala-Tea
            Chats," inspired by the concept of LWT speed networking chats. These
            are one-on-one networking sessions designed for quality 30-minute
            conversations, offering a deeper connection with interesting people.
            Expect more puns and enjoyable jokes in our Koala-Tea chats. Sign up
            today for a Koala-Tea chat by using the link above.🐨🍵✨{<br></br>}{' '}
            A little bit more about me I'm your dedicated inclusive change
            management expert. Inclusive change management involves the
            transformation of organizations through the pillars of accessibility
            and inclusion. As a certified Chemistry teacher, my approach is
            unique, emphasizing concepts like scaffolding, the establishment of
            critical metrics such as P&Ls, OKRs and KPIs, and a focus on
            progressive improvements – mirroring how people learn.
            Organizations, fundamentally, are groups of individuals working
            together for a common goal. {<br></br>}
            Businesses often seek change to adapt and evolve, but change isn't
            always straightforward, well-understood, or properly documented,
            leading to a lack of user buy-in. That's where I come in as your
            change evangelist. I specialize in integrating c-suite initiatives
            with user feedback, resulting in transformative projects marked by
            strong business logic, engaged users, and improved accessibility.
            Prepare to outshine your competitors and leave them asking, "Why
            didn't I think of that?“​ {<br></br>} Let's connect, collaborate,
            and make great things happen!
          </Typography>
          <Link
            href="https://www.linkedin.com/in/tegan-barron/"
            style={{ display: 'block' }}
          >
            LinkedIn
          </Link>
          <Link href="https://linktr.ee/teganba" style={{ display: 'block' }}>
            Book a Koala-Tea Chat
          </Link>
        </div>
      </Box>
    </>
  );
}

export default About;
