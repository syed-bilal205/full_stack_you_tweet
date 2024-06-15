import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold ">You_TweeT</span> All rights
              reserved.
            </p>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/yourgithub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300">
              <AiFillGithub className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
