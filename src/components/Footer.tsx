import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdOutlineContentCopy } from "react-icons/md";

const Footer = () => {

  return (
    <div className="w-full bg-material px-5 py-2 horizontalC">
      <div className="w-full max-w-[1200px] verticalS gap-5 my-10">

        <div className="verticalC gap-x-1 text-sm text-center">
          <span className="border-b border-white pb-2 mb-2">Originally Coded By</span>
          <span>Towhidul Islam Shrabon</span>          
        </div>  

        <div className="verticalC gap-1">
          <a 
            className="w-[100px] my-5"
            title="Visit My Website!"
            target="_blank" rel="noopener noreferrer" href="https://tishrabon.github.io/"
          >
            <img src="/tishrabon-logo.svg" alt="" />
          </a>  

          <div className="flex items-center gap-2">
            <FaGlobe />
            <p className="mb-[2px]">tishrabon.github.io</p>

            <MdOutlineContentCopy 
              title="copy link"
              className="cursor-pointer"
              onClick={() => {navigator.clipboard.writeText("tishrabon.github.io")}}
            />

          </div>          

          <div className="flex items-center gap-2">
            <MdEmail />
            <p className="mb-[2px]">tishrabon.official@gmail.com</p>

            <MdOutlineContentCopy 
              title="copy gmail"
              className="cursor-pointer"
              onClick={() => {navigator.clipboard.writeText("tishrabon.official@gmail.com")}}
            />
                        
          </div> 
        </div>

      {/* social links */}
        <div className="horizontalC gap-5 text-[30px]">

          <div 
            title="linkedIn profile link: https://www.linkedin.com/in/tishrabon/" 
            className="hover:text-yellow-600 active:text-yellow-600"
          >
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tishrabon/"><FaLinkedin /></a>
          </div>      

          <div 
            title="Github profile link: https://github.com/tishrabon/" 
            className="hover:text-yellow-600 active:text-yellow-600"
          >
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/tishrabon/"><FaGithubSquare /></a>
          </div>

          <div 
            title="X profile link: https://x.com/tishrabon" 
            className="hover:text-yellow-600 active:text-yellow-600"
          >
            <a target="_blank" rel="noopener noreferrer"  href="https://x.com/tishrabon"><FaSquareXTwitter /></a>
          </div>

        </div>

        <div className="text-[13px] verticalC mt-10">
          {/* <p>Project Published: 2025 (version: 3.1)</p> */}
          <p> © {new Date().getFullYear()} Towhidul Islam Shrabon (tishrabon). All rights reserved.</p>
        </div>

      </div>
    </div>
  )
};

export default Footer;


