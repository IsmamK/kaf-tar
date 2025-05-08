import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, Users, Shield, Trophy } from "lucide-react";
import { Spin } from 'antd';

const COLORS = {
  primary: "#2E7D32", // Vibrant green
  secondary: "#FFD600", // Bright yellow
  accent: "#F15A24", // Orange for highlights
  white: "#FFFFFF",
  black: "#212121",
  darkGray: "#424242",
  lightBg: "#F5F7FA"
};

const iconMap = {
  Globe,
  Award,
  Users,
  Shield,
  Trophy
};

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [heading, setHeading] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/statistics/`);
        if (!response.ok) throw new Error('Failed to fetch statistics');
        const data = await response.json();
        
        setHeading(data.heading || 'Our Global Impact');
        setSubtitle(data.subtitle || 'Quantifying our commitment to excellence and service worldwide');
        setStats(data.stats || [
          {
            icon: "Globe",
            number: "50+",
            label: "Countries Served"
          },
          {
            icon: "Users",
            number: "10,000+",
            label: "Happy Clients"
          },
          {
            icon: "Award",
            number: "25+",
            label: "Industry Awards"
          },
          {
            icon: "Trophy",
            number: "#1",
            label: "Ranked Provider"
          }
        ]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        // Use default values if API fails
        setHeading('Our Global Impact');
        setSubtitle('Quantifying our commitment to excellence and service worldwide');
        setStats([
          {
            icon: "Globe",
            number: "50+",
            label: "Countries Served"
          },
          {
            icon: "Users",
            number: "10,000+",
            label: "Happy Clients"
          },
          {
            icon: "Award",
            number: "25+",
            label: "Industry Awards"
          },
          {
            icon: "Trophy",
            number: "#1",
            label: "Ranked Provider"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="py-20 px-4" style={{ backgroundColor: COLORS.lightBg }}>
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <section 
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: COLORS.lightBg }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full" 
          style={{ backgroundColor: COLORS.primary }}></div>
        <div className="absolute bottom-10 -right-10 w-48 h-48 rounded-full" 
          style={{ backgroundColor: COLORS.secondary }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header with animated underline */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: COLORS.black }}
          >
            {heading}
            <motion.span
              className="block mx-auto mt-4 h-1 w-24"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ backgroundColor: COLORS.primary }}
            />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: COLORS.darkGray }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Stats Grid with floating animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {stats.map((stat, index) => {
            const StatIcon = iconMap[stat.icon] || Globe;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: `0 15px 30px -10px ${COLORS.primary}40`
                }}
                className="bg-white rounded-xl p-8 text-center transition-all duration-300"
                style={{
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                  borderBottom: `4px solid ${COLORS.primary}`
                }}
              >
                <div className="flex justify-center mb-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ 
                      backgroundColor: `${COLORS.primary}15`,
                      border: `2px solid ${COLORS.primary}20`
                    }}
                  >
                    <StatIcon 
                      className="w-8 h-8" 
                      style={{ color: COLORS.primary }} 
                    />
                  </div>
                </div>
                
                <motion.h3 
                  className="text-4xl font-bold mb-3"
                  style={{ color: COLORS.primary }}
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.number}
                </motion.h3>
                
                <p 
                  className="font-semibold uppercase text-sm tracking-wider"
                  style={{ color: COLORS.black }}
                >
                  {stat.label}
                </p>
                
                {/* Decorative dot */}
                <div className="mt-6 flex justify-center">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.secondary }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="mb-6 text-lg" style={{ color: COLORS.darkGray }}>
            Ready to be part of our success story?
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.white
              }}
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg font-semibold"
              style={{
                backgroundColor: COLORS.secondary,
                color: COLORS.black
              }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;