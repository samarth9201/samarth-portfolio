"use client";

import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { NewsData } from "@/constants/dataSource";

interface NewsItem {
  date: string; // Date in string format
  description: string;
}

const News = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(NewsData);
      const data = await res.json();
      const sortedData = data.sort(
        (a: NewsItem, b: NewsItem) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setNewsData(sortedData);

      // Reveal items one by one with delay
      sortedData.forEach((_: NewsItem, index: number) => {
        setTimeout(() => {
          setVisibleIndexes((prev) => [...prev, index]);
        }, index * 200); // Staggered delay for each item
      });
    };
    document.title = "News | Samarth Bhadane";
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          textAlign: "center",
          color: colors.text,
          marginBottom: "30px",
          fontSize: "28px",
        }}
      >
        News
      </h2>
      <div
        style={{
          position: "relative",
          margin: "0 auto",
          maxWidth: "600px",
          padding: "20px",
        }}
      >
        {newsData.map((news, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              marginBottom: "0px",
              padding: "5px",
              opacity: visibleIndexes.includes(index) ? 1 : 0,
              transform: visibleIndexes.includes(index)
                ? "translateY(0)"
                : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* Timeline Line */}
            <div
              style={{
                position: "absolute",
                left: "15px",
                top: index === 0 ? "50%" : "0%",
                bottom: index === newsData.length - 1 ? "50%" : "0%",
                width: "2px",
                backgroundColor: colors.linkHoverBackground,
              }}
            ></div>

            {/* Timeline Dot */}
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: colors.linkHoverBackground,
                borderRadius: "50%",
                position: "absolute",
                left: "7px",
                top: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                }}
              ></span>
            </div>

            {/* Card */}
            <div
              style={{
                marginLeft: "50px",
                backgroundColor: colors.nav_background,
                padding: "15px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: colors.text,
                  marginBottom: "5px",
                }}
              >
                {news.date}
              </div>
              <div style={{ color: colors.text, lineHeight: "1.5" }}>
                {news.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
