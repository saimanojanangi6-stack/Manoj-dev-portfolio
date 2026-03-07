import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-900/50 bg-slate-950/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright Section */}
        <p className="text-slate-500 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} <span className="text-slate-300">MANOJ DEV.</span> Built with Next.js 16
        </p>

        {/* Social Links Section */}
        <div className="flex gap-8 text-xl text-slate-500">
          <a 
            href="https://github.com/" // Add your GitHub link here
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-300 hover:scale-110"
          >
            <FaGithub />
          </a>
          <a 
            href="https://www.linkedin.com/in/sai-manoj-anangi-4158972a9?utm_source=share_via&utm_content=profile&utm_medium=member_android" // Updated LinkedIn Link
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-all duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/" // Add your Twitter/X link here
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-all duration-300 hover:scale-110"
          >
            <FaTwitter />
          </a>
        </div>
        
      </div>
    </footer>
  );
}