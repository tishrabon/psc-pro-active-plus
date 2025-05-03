import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGlobe } from "react-icons/fa6";

const Doc = () => {
  const docContent = `px-2 py-2 text-left text-[16px] verticalLeft gap-2 mb-5`;
  const docHeading = `p-2 border-none bg-gray-200 rounded-md w-full`;
  const pBlock = `my-1 border-b border-second pb-3`;
  const pBlockClose = `my-1 pb-1`;

  return (
    <div className="otherpage-container verticalS gap-3 mt-5">
      <div className="max-w-[700px] verticalS gap-3 px-5 w-full">
          <div className="p-2 rounded-[5px] w-[200px] border border-second mb-5">Project Document</div>
          
          {/* about myself */}
          <h6 className={docHeading}>Developer's Word</h6>
          <div className={docContent}>            
            <div className={pBlock}>
              Hi, I’m Towhidul Islam Shrabon, but feel free to call me Shrabon. You can find me by googling <span className="text-blue-700">tishrabon</span>. I’m currently working on my skills as a front-end developer, with the ultimate goal of becoming a full-stack developer.
            </div>

            <div className={pBlockClose}>
              If you're interested in exploring my skills, work, and what I bring to the table, feel free to visit my portfolio: <a className="text-blue-700" href="https://tishrabon.github.io" target="_blank" rel="noopener noreferrer">tishrabon.github.io</a>. 
              My contact details and social links are provided below.
            </div>


            {/* SOCIAL MEDIA LINKS */}
            <div className="verticalC w-full">
              <ul className="m-[10px] box-shadow rounded-[10px] p-5 my-1 w-[300px] verticalLeft gap-2">       
                <li title="My Website: https://tishrabon.github.io/" className="grid grid-cols-[20px_1fr] items-center">
                  <FaGlobe /> <a target="_blank" rel="noopener noreferrer" href="https://tishrabon.github.io/">tishrabon.github.io</a>
                </li>                    

                <li title="linkedIn profile link: https://www.linkedin.com/in/tishrabon/" className="grid grid-cols-[20px_1fr] items-center">
                  <FaLinkedin /> <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tishrabon/">in/tishrabon</a>
                </li>                  

                <li title="Github profile link: https://github.com/tishrabon/" className="grid grid-cols-[20px_1fr] items-center">
                  <FaGithubSquare /> <a target="_blank" rel="noopener noreferrer"  href="https://github.com/tishrabon/">/tishrabon</a> 
                </li>

                <li title="X profile link: https://x.com/tishrabon" className="grid grid-cols-[20px_1fr] items-center">
                  <FaSquareXTwitter /> <a target="_blank" rel="noopener noreferrer"  href="https://x.com/tishrabon">@tishrabon</a>
                </li>

                <li title="Developer's gmail address" className="grid grid-cols-[20px_1fr] items-center">
                  <MdEmail /> <span>tishrabon.official@gmail.com</span>
                </li>
              </ul>                
            </div>
                                      
          </div>

          {/* about the project */}
          <h6 className={docHeading}>So What Is This Project?</h6>
          <div className={docContent}>
            <div className={pBlockClose}>
              This is a 3-in-1 tool combining a Pomodoro timer, a Metronome, and natural ambient sounds to create a focused and customizable workspace. You can tweak your Pomodoro cycles, rename session labels, set your preferred BPM for the metronome, enjoy calming background sounds, or even run both together for the perfect flow. It’s all about giving you intuitive control over your rhythm and environment, wrapped in a thoughtfully designed interface that utilizes minimalist principles for psychological ease and mindful comfort. 
            </div> 
          </div>  

          <h6 className={docHeading}>How To Use It?</h6>
          <div className={docContent}>
            <div className={pBlock}>
              Start by customizing your Pomodoro cycle, adjust durations, rename session labels, etc. For the metronome, you can set your desired BPM and choose your preferred tick sound. You can also pick natural ambient sounds to set the background atmosphere.
            </div>

            <div className={pBlockClose}>
              First, initiate the Pomodoro clock. You can check/uncheck the metronome or serenity elements. These will only play while the Pomodoro clock is running. You can easily toggle them on or off, and they will automatically continue playing based on the clock's status. Nothing complicated. There are three control buttons for resetting, pausing/play, and renewing the current session.
            </div>            
          </div>  

          <h6 className={docHeading}>Limitations to Note..</h6>  
          <div className={docContent}>
            <div className={pBlockClose}>
              As this project is hosted for free, there are a few limitations. I couldn’t include longer audio files due to size constraints, and since I’m using the freesound.org API, there are request limits. If the limit is exceeded, the serenity elements may not play until the next available API request. Thanks for understanding!
            </div>           
          </div>   

          <h6 className={docHeading}>Closing Word</h6>  
          <div className={docContent}>
            <div className={pBlockClose}>
              This is just the initial version of the product. I have plans to expand its features, particularly for members, including progress tracking, goal setting, and other ideas I’m keeping under wraps for now. If this project caught your attention, feel free to explore my website and connect with me through my social media links shared above. If you're interested in collaborating, hiring, or sharing any feedback (positive or constructive), I’d be more than happy to hear from you.
            </div>                             
          </div> 

          <h6 className={docHeading}>Behind the Code</h6>  
          <div className={docContent}>   
            <div className={pBlock}>
              This app is built with React, TypeScript, Vite, Redux Toolkit, redux-persist, TailwindCSS, and Firebase (currently integrating authentication with login and registration; more features to come). 
            </div>  
            <div className={pBlockClose}>
              Additionally, you can find the source code for this project in my portfolio for anyone interested in taking a closer look.
            </div>             
          </div>    

          <h6 className={docHeading}>Credits and Appreciation</h6>  
          <div className={docContent}>   
            <div className={pBlock}>
              Special thanks to <span className="font-bold italic">freesound.org</span> and <span className="font-bold italic">zapsplat.com</span> for providing the natural sound assets, tick sounds, and alert tones used in this project. Without their valuable resources, many of the app’s audio features wouldn’t have been possible. 
            </div>  
            <div className={pBlock}>
              <span className="font-bold italic">deepkickclean.wav by johnnypanic</span> -- 
              <a href="https://freesound.org/s/21176/" className="font-bold italic" target="_blank" rel="noopener noreferrer">https://freesound.org/s/21176/</a> - License: Attribution 4.0
            </div> 
            <div className={pBlock}>
              <span className="font-bold italic">metronom_klack.wav by m1rk0</span> -- 
              <a href="https://freesound.org/s/50070/" className="font-bold italic" target="_blank" rel="noopener noreferrer">https://freesound.org/s/50070/</a> - License: Attribution 3.0
            </div>
                       
          </div>                                                               
      </div>

    </div>
  )
}

export default Doc;