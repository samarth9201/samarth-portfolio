"use client";

import React, { useEffect, useState } from "react";
import { ProjectsData } from "@/constants/dataSource";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { FiGithub, FiFileText } from "react-icons/fi"; // Import GitHub and Docs icons
import Modal from "@/components/Modal"; // Assume you have a reusable Modal component
import { FaYoutube } from "react-icons/fa";

interface ProjectItem {
  title: string;
  description: string;
  domain: string;
  technologies: string[];
  github_repo?: string;
  doc_link?: string;
  video_link ?: string,
  image: string;
  start: string; // Updated to use start and end dates
  end: string;
  moreDetails: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const { colors } = useTheme();
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ProjectsData);
      const data = await res.json();
      setProjects(data);

      data.forEach((_: ProjectItem, index: number) => {
        setTimeout(() => {
          setVisibleIndexes((prev) => [...prev, index]);
        }, index * 200);
      });
    };
    document.title = "Projects | Samarth Bhadane";
    fetchData();
  }, []);

  const filteredProjects = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
      const dateA = new Date(a.start).getTime();
      const dateB = new Date(b.start).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen py-8">
      <h1 className={`text-4xl font-bold text-center text-${colors.text} mb-8`}>
        My Projects
      </h1>
      {/* Search Bar and Filters */}
      <div className="flex justify-between items-center mb-8 px-4 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) =>
            (e.target.style.boxShadow = `0 1px 0 0 ${colors.linkHoverBackground}`)
          } // Apply shadow on focus
          onBlur={(e) => (e.target.style.boxShadow = "none")} // Remove shadow on blur
          style={{
            color: colors.text,
            borderColor: colors.linkHoverBackground,
            backgroundColor: colors.background,
          }}
          className="p-2 w-full max-w-md focus:outline-none"
        />
        <select
          onFocus={(e) =>
            (e.target.style.boxShadow = `0 1px 0 0 ${colors.linkHoverBackground}`)
          } // Apply shadow on focus
          onBlur={(e) => (e.target.style.boxShadow = "none")} // Remove shadow on blur
          style={{
            color: colors.text,
            borderColor: colors.linkHoverBackground,
            backgroundColor: colors.background,
          }}
          className="ml-4 p-2 focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc" style={{ color: colors.text }}>
            Sort by Start Date (Asc)
          </option>
          <option value="desc" style={{ color: colors.text }}>
            Sort by Start Date (Desc)
          </option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`relative transition-opacity duration-500 ease-in-out transform ${
              visibleIndexes.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } bg-${
              colors.nav_background
            } shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg`}
          >
            {/* Image Section */}
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority={index < 3}
              />
            </div>
            {/* Content Section */}
            <div className="p-6 pb-20">
              {/* Title */}
              <h2
                className={`text-lg font-bold text-${colors.text} mb-2 truncate`}
              >
                {project.title}
              </h2>
              {/* Description */}
              <p className={`text-sm text-${colors.text} mb-4 line-clamp-3`}>
                {project.description}
              </p>
              {/* Domain */}
              <p className={`text-sm text-${colors.text} mb-4`}>
                <strong>Domain:</strong> {project.domain}
              </p>
              {/* Duration */}
              <p className={`text-sm text-${colors.text} mb-4`}>
                <strong>Duration:</strong> {project.start} - {project.end}
              </p>
              {/* Technologies as Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 text-sm rounded`}
                    style={{
                      backgroundColor: colors.linkHoverBackground,
                      color: colors.linkHoverText,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Buttons Section */}
            <div className="absolute bottom-4 left-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal opening on button click
                  setModalProject(project);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                More Details
              </button>
            </div>
            <div className="absolute bottom-4 right-4 flex space-x-4">
              {project.github_repo && (
                <a
                  href={project.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-2xl hover:text-blue-600 transition"
                >
                  <FiGithub />
                </a>
              )}
              {project.doc_link && (
                <a
                  href={project.doc_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-2xl hover:text-green-600 transition"
                >
                  <FiFileText />
                </a>
              )}
              {project.video_link && (
                <a
                  href={project.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 text-2xl hover:text-red-600 transition"
                >
                  <FaYoutube />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProject && (
        <Modal onClose={() => setModalProject(null)}>
          <div>
            {/* Title Section */}
            <h2 className="text-3xl font-bold mb-6">{modalProject.title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Image */}
              <div className="col-span-1">
                <div className="relative w-full h-64 lg:h-full">
                  <Image
                    src={modalProject.image}
                    alt={`${modalProject.title} image`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="col-span-2 flex flex-col justify-between">
                {/* Description */}
                <div>
                  <p className="text-lg mb-6" style={{ color: colors.text }}>
                    {modalProject.description}
                  </p>

                  {/* General Information Section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      General Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm">
                          <strong>Domain:</strong> {modalProject.domain}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">
                          <strong>Duration:</strong> {modalProject.start} - {modalProject.end}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies Section */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {modalProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-200 text-sm rounded-lg text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* More Details Section */}
                  {modalProject.moreDetails && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">
                        More Details
                      </h3>
                      <p className="text-sm" style={{ color: colors.text }}>
                        {modalProject.moreDetails}
                      </p>
                    </div>
                  )}
                </div>

                {/* Links Section */}
                <div className="mt-6 flex justify-end items-center gap-4">
                  {modalProject.github_repo && (
                    <a
                      href={modalProject.github_repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-2xl hover:underline"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {modalProject.doc_link && (
                    <a
                      href={modalProject.doc_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 text-2xl hover:underline"
                    >
                      <FiFileText />
                    </a>
                  )}
                  {modalProject.video_link && (
                    <a
                      href={modalProject.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 text-2xl hover:underline"
                    >
                      <FaYoutube />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Projects;
