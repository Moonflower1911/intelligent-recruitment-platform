import React from "react";
import {
  faTwitter,
  faFacebookF,
  faYoutube,
  faLinkedinIn,
  faGithub,
  } from "@fortawesome/free-brands-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
  <footer className="bg-gray-100">
    <div className="max-w-screen-lg py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
    {/* Menu Section */}
    <div className="p-5 sm:w-2/12 border-r">
      <div className="text-sm uppercase text-[#175d69] font-bold">Menu</div>
      <ul>
      {["Home", "Services", "Products", "Pricing"].map((item, i) => (
        <li className="my-2" key={i}>
        <a className="hover:text-[#175d69]" href="#">
          {item}
        </a>
        </li>
      ))}
      </ul>
    </div>

    {/* Center Section */}
    <div className="p-5 sm:w-7/12 border-r text-center">
      <h3 className="font-bold text-xl text-[#175d69] mb-4">JobConnect</h3>
      <p className="text-gray-500 text-sm mb-10">
      JobConnect connects talent with the best opportunities. Whether you're hiring or job-seeking, our platform supports you every step of the way.
      </p>
    </div>

    {/* Contact Section */}
    <div className="p-5 sm:w-3/12">
      <div className="text-sm uppercase text-[#175d69] font-bold">Contact Us</div>
      <ul>
      <li className="my-2">
        <a className="hover:text-[#175d69]" href="#">
        Rabat, Morocco
        </a>
      </li>
      <li className="my-2">
        <a className="hover:text-[#175d69]" href="#">
        contact@jobconnect.com
        </a>
      </li>
      </ul>
    </div>
    </div>

    {/* Social + Copyright */}
    <div className="flex flex-col items-center py-5 m-auto text-gray-800 text-sm border-t max-w-screen-xl">
    <div className="flex mt-2 space-x-4">
      <a href="#" className="text-gray-500 hover:text-[#175d69]">
      <FontAwesomeIcon icon={faTwitter} size="lg" />
      </a>
      <a href="#" className="text-gray-500 hover:text-[#175d69]">
      <FontAwesomeIcon icon={faFacebookF} size="lg" />
      </a>
      <a href="#" className="text-gray-500 hover:text-[#175d69]">
      <FontAwesomeIcon icon={faYoutube} size="lg" />
      </a>
      <a href="#" className="text-gray-500 hover:text-[#175d69]">
      <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
      </a>
      <a href="#" className="text-gray-500 hover:text-[#175d69]">
      <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
    </div>
    <div className="my-5">© {new Date().getFullYear()} JobConnect. All rights reserved.</div>
    </div>
  </footer>
  );
}
