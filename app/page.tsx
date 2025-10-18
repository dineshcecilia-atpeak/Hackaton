"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const medalData = [
    { dept: "CSE", branch: "FE", gold: 5, silver: 3, bronze: 2 },
    { dept: "CSE", branch: "SE", gold: 4, silver: 3, bronze: 2 },
    { dept: "CSE", branch: "TE", gold: 3, silver: 2, bronze: 3 },
    { dept: "CSE", branch: "BE", gold: 3, silver: 2, bronze: 1 },
    { dept: "IT", branch: "FE", gold: 3, silver: 2, bronze: 2 },
    { dept: "IT", branch: "SE", gold: 4, silver: 2, bronze: 1 },
    { dept: "IT", branch: "TE", gold: 3, silver: 3, bronze: 2 },
    { dept: "IT", branch: "BE", gold: 2, silver: 0, bronze: 1 },
    { dept: "EXTC", branch: "FE", gold: 2, silver: 3, bronze: 2 },
    { dept: "EXTC", branch: "SE", gold: 3, silver: 2, bronze: 1 },
    { dept: "EXTC", branch: "TE", gold: 3, silver: 2, bronze: 3 },
    { dept: "EXTC", branch: "BE", gold: 2, silver: 1, bronze: 3 },
    { dept: "MECH", branch: "FE", gold: 2, silver: 1, bronze: 2 },
    { dept: "MECH", branch: "SE", gold: 2, silver: 1, bronze: 1 },
    { dept: "MECH", branch: "TE", gold: 2, silver: 1, bronze: 2 },
    { dept: "MECH", branch: "BE", gold: 2, silver: 2, bronze: 2 },
  ];

  const upcomingEvents = [
    { name: "Tech Talk", date: "2025-11-01" },
    { name: "Hackathon", date: "2025-11-05" },
    { name: "Workshop AI", date: "2025-11-10" },
    { name: "Robotics Competition", date: "2025-11-15" },
    { name: "Coding Contest", date: "2025-11-20" },
  ];

  const pastEvents = [
    { name: "Orientation Day", date: "2025-09-01" },
    { name: "Sports Meet", date: "2025-09-10" },
    { name: "Cultural Fest", date: "2025-09-20" },
    { name: "Seminar on Cloud", date: "2025-09-25" },
    { name: "AI Workshop", date: "2025-09-30" },
  ];

  const latestWinners = [
    { name: "Alice", event: "Hackathon" },
    { name: "Bob", event: "Robotics Competition" },
    { name: "Charlie", event: "Tech Talk" },
    { name: "David", event: "Coding Contest" },
    { name: "Eve", event: "AI Workshop" },
  ];

  const classPerformance = medalData.map((d) => ({
    name: `${d.dept}-${d.branch}`,
    value: d.gold + d.silver + d.bronze,
  }));

  const PALETTE = ["#008B8B", "#2aa88a", "#5A1A66", "#7B0F52", "#E49B2E"];

  // Filters
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [topFilter, setTopFilter] = useState<"None" | "Top3" | "Top5">("None");
  const [pastEventFilter, setPastEventFilter] = useState<"All" | "Last3" | "Last5">("Last5");

  const departments = ["All", "CSE", "IT", "EXTC", "MECH"];
  const branches = ["All", "FE", "SE", "TE", "BE"];

  // Filter logic
  const filteredMedalData = useMemo(() => {
    let filtered = [...medalData];
    if (selectedDept !== "All") filtered = filtered.filter((d) => d.dept === selectedDept);
    if (selectedBranch !== "All") filtered = filtered.filter((d) => d.branch === selectedBranch);
    return filtered;
  }, [medalData, selectedDept, selectedBranch]);

  const filteredClassPerformance = useMemo(() => {
    let filtered = [...classPerformance];
    if (selectedDept !== "All") filtered = filtered.filter((d) => d.name.startsWith(selectedDept));
    if (selectedBranch !== "All") filtered = filtered.filter((d) => d.name.includes(selectedBranch));

    filtered = filtered.sort((a, b) => b.value - a.value);
    if (topFilter === "Top3") filtered = filtered.slice(0, 3);
    if (topFilter === "Top5") filtered = filtered.slice(0, 5);
    return filtered;
  }, [classPerformance, selectedDept, selectedBranch, topFilter]);

  const filteredPastEvents = useMemo(() => {
    let filtered = [...pastEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (pastEventFilter === "Last3") filtered = filtered.slice(0, 3);
    if (pastEventFilter === "Last5") filtered = filtered.slice(0, 5);
    return filtered;
  }, [pastEvents, pastEventFilter]);

  return (
    <main className="relative min-h-screen bg-[#040914] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 left-1/3 w-[450px] h-[450px] bg-gradient-to-r from-purple-600 via-pink-700 to-transparent opacity-20 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent opacity-15 blur-[150px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[80%] bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="XIE Logo" className="w-10 h-10 rounded-full border border-white/30" />
          <h1 className="text-xl font-semibold tracking-wide">Admin Dashboard</h1>
        </div>
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li className="hover:text-white transition cursor-pointer">Dashboard</li>
          <li className="hover:text-white transition cursor-pointer">Event Management</li>
          <li className="hover:text-white transition cursor-pointer">Winners</li>
          <li className="hover:text-white transition cursor-pointer">Gallery</li>
          <li className="hover:text-white transition cursor-pointer">Notices</li>
        </ul>
        <button className="bg-red-500/70 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all">
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="relative z-10 pt-32 px-6 md:px-16 pb-20 space-y-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">Welcome, Admin!</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white"
          >
            {branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bar Chart */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Department Medal Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredMedalData}>
                <XAxis dataKey={(d) => `${d.dept}-${d.branch}`} stroke="#ccc" tick={{ fontSize: 12 }} />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderRadius: "10px", border: "none", color: "#fff" }}
                  cursor={{ fill: "transparent" }}
                />
                <Bar dataKey="gold" fill={PALETTE[0]} barSize={20} />
                <Bar dataKey="silver" fill={PALETTE[1]} barSize={20} />
                <Bar dataKey="bronze" fill={PALETTE[4]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Top Performing Classes</h3>
              <div className="flex space-x-3">
                {["Top3", "Top5", "None"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTopFilter(filter as any)}
                    className={`px-3 py-1 rounded-lg border border-white/20 transition-all ${
                      topFilter === filter ? "bg-[#E49B2E] text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {filter === "None" ? "All" : filter.replace("Top", "Top ")}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredClassPerformance}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label={false}
                  labelLine={false}
                >
                  {filteredClassPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderRadius: "10px", border: "none", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event & Winner Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Upcoming Events (Top 5)</h3>
            <ul className="space-y-2">
              {upcomingEvents.map((event, idx) => (
                <li key={idx} className="flex justify-between text-gray-200">
                  <span>{event.name}</span>
                  <span className="text-gray-400">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Past Events */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Past Events</h3>
              <div className="flex space-x-2">
                {["Last3", "Last5", "All"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setPastEventFilter(filter as any)}
                    className={`px-2 py-1 rounded-lg border border-white/20 text-sm transition ${
                      pastEventFilter === filter ? "bg-[#E49B2E] text-black" : "bg-white/10 text-white"
                    }`}
                  >
                    {filter === "All" ? "All" : filter.replace("Last", "Last ")}
                  </button>
                ))}
              </div>
            </div>
            <ul className="space-y-2">
              {filteredPastEvents.map((event, idx) => (
                <li key={idx} className="flex justify-between text-gray-200">
                  <span>{event.name}</span>
                  <span className="text-gray-400">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Winners */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Latest Winners (Top 5)</h3>
            <ul className="space-y-2">
              {latestWinners.map((winner, idx) => (
                <li key={idx} className="flex justify-between text-gray-200">
                  <span>{winner.name}</span>
                  <span className="text-gray-400">{winner.event}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#020818] border-t border-white/10 text-gray-400 py-8 px-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-500 transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} XIE Student Council. All Rights Reserved. <br />
          Developed by <span className="text-white font-medium">Cecilia, Anas, Ishan, Ethan</span>.
        </div>
      </footer>
    </main>
  );
}
