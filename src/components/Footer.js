import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Your Name. Built with Next.js 16.
        </p>
        <div className="flex gap-6 text-xl text-slate-400">
          <a href="#" className="hover:text-white transition-colors"><FaGithub /></a>
          <a href="#" className="hover:text-white transition-colors"><FaLinkedin /></a>
          <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}