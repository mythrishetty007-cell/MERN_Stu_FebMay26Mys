// src/pages/admin/Dashboard.jsx


/*
=========================================================
SPRINT 1 – ADMIN DASHBOARD


TOPICS COVERED:


✓ Functional Components
✓ Rendering Lists
✓ map()
✓ Dashboard Layout
✓ Reusable UI Patterns


WHY THIS COMPONENT?


Administrators need a quick overview
of the system.


Examples:


Total Movies
Total Shows
Total Bookings


Sprint 1:


Static Dashboard Shell


Sprint 7:


Analytics APIs
↓
Real-Time Statistics
↓
Charts & Insights


=========================================================
*/


const dashboardStats = [
  {
    id: 1,
    title: "Movies",
    value: 12,
    description: "Movies currently available",
  },


  {
    id: 2,
    title: "Shows",
    value: 48,
    description: "Active show schedules",
  },


  {
    id: 3,
    title: "Bookings",
    value: 356,
    description: "Total bookings made",
  },
];


export default function Dashboard() {
  return (
    <section>
      <header>
        <h1>Admin Dashboard</h1>


        <p>Welcome back. Here's a quick overview of the platform.</p>
      </header>


      {/* Dashboard Statistics */}


      <section style={styles.grid}>
        {dashboardStats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </section>


      {/* Future Analytics Area */}


      <section style={styles.analytics}>
        <h2>Upcoming Analytics</h2>


        <p>Sprint 7 will introduce:</p>


        <ul>
          <li>Most booked movies</li>


          <li>Booking trends</li>


          <li>Occupancy insights</li>


          <li>Revenue reports</li>
        </ul>
      </section>
    </section>
  );
}


function StatCard({ stat }) {
  return (
    <article style={styles.card}>
      <h3>{stat.title}</h3>


      <h2>{stat.value}</h2>


      <p>{stat.description}</p>
    </article>
  );
}


const styles = {
  grid: {
    marginTop: "30px",


    display: "grid",


    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",


    gap: "20px",
  },


  card: {
    background: "#fff",


    border: "1px solid #ddd",


    borderRadius: "8px",


    padding: "25px",
  },


  analytics: {
    marginTop: "40px",


    background: "#fff",


    border: "1px solid #ddd",


    borderRadius: "8px",


    padding: "25px",
  },
};


/*
=========================================================
FLOW


Admin Login
↓
Dashboard
↓
Overview Statistics
↓
Future Analytics


=========================================================


KEY TAKEAWAYS


1. Dashboards summarize important data.


2. map() is useful beyond lists.


3. Static dashboards evolve naturally
   into analytics-driven dashboards.


4. Sprint 7 enhances this page
   rather than replacing it.


=========================================================


VERIFICATION


✓ Dashboard loads successfully


✓ Statistics render correctly


✓ Responsive layout works


✓ No console errors


✓ Sprint 7 ready


=========================================================
*/
