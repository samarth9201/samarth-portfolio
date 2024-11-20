"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../../public/profile_pic.jpg";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function Home() {
  const { colors } = useTheme();

  return (
    <div
      className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 overflow-auto"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <header className="w-full max-w-4xl text-center mx-auto mt-12">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl mb-4"
          style={{ color: colors.text }}
        >
          <span className="font-bold">Samarth</span> Bhadane
        </h1>
        <p
          className="text-base sm:text-xl"
          style={{ color: colors.linkHoverBackground }}
        >
          <Link
            href="https://www.ucsd.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            UC San Diego
          </Link>
        </p>
      </header>

      <section className="w-full max-w-4xl mx-auto mt-4">
        <div className="clearfix">
          <Image
            src={ProfilePic}
            alt="Profile Picture"
            className="float-right w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-lg shadow-lg ml-4 mb-4"
            priority
          />
          <p className="text-lg sm:text-base mb-4">
            I am a second-year Master&apos;s student in the Computer Science
            department at the University of California - San Diego. My
            experience spans across various fields within computer science. At
            present, I am primarily focused on Systems and Security. I have
            expertise in languages like Go, Java, C/C++, JavaScript, and Python.
            I have also worked on projects involving web development,
            distributed systems, robotics, and IoT. Check out my work{" "}
            <Link
              href="/projects"
              className="hover:underline"
              style={{ color: colors.linkHoverBackground }}
            >
              here
            </Link>
            .
          </p>
          <p className="text-lg sm:text-base mb-4">
            Beyond academics, I genuinely enjoy the process of learning, whether
            it’s picking up a new programming language, studying an academic
            topic, or even learning to play new games. I find joy in expanding
            my knowledge and continuously challenging myself to grasp new
            concepts and skills. In my free time, I love playing Chess or
            Badminton.
          </p>
          <p className="text-lg sm:text-base">
            I thrive on connecting with new people, exchanging ideas, and
            collaborating. Please feel free to reach out to me on{" "}
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: colors.linkHoverBackground }}
            >
              LinkedIn
            </Link>{" "}
            or via{" "}
            <Link
              href="mailto:sbhadane@ucsd.edu"
              className="hover:underline"
              style={{ color: colors.linkHoverBackground }}
            >
              Email
            </Link>{" "}
            - I’m always eager to build my network. I’m currently seeking
            full-time software engineering roles and would love to learn about
            opportunities that align with my experience. If you come across an
            opening that fits my profile, I would appreciate you passing it
            along. I’m passionate about developing my skills and am excited to
            join a team where I can contribute meaningfully while continuing to
            grow.
          </p>
        </div>
      </section>
      <div className="w-full max-w-4xl mx-auto mt-16 text-center text-xl">
        <div className="flex justify-center space-x-4">
          <Link
            href="https://www.linkedin.com/in/samarthbhadane"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin
              size={30}
              style={{ color: colors.linkHoverBackground }}
            />
          </Link>
          <Link
            href="https://github.com/samarth9201"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} style={{ color: colors.linkHoverBackground }} />
          </Link>
          <Link href="mailto:sbhadane@ucsd.edu">
            <FaEnvelope
              size={30}
              style={{ color: colors.linkHoverBackground }}
            />
          </Link>
          <Link
            href="https://x.com/samarth9201"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              size={30}
              style={{ color: colors.linkHoverBackground }}
            />
          </Link>
          <Link
            href="https://www.instagram.com/samarthbhadane/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              size={30}
              style={{ color: colors.linkHoverBackground }}
            />
          </Link>
        </div>
        <span className="text-xs text-gray-400">LinkedIn and Email are the best way to reach me!😊</span>
      </div>
    </div>
  );
}
