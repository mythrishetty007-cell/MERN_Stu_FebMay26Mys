import { NavLink, Outlet } from "react-router-dom";
export default function DashboardSection() {
    return(
        <section style={styles.container}>
            <aside style={styles.sidebar}>
                <h3>Dashboard</h3>
                <nav style={styles.sidebarLinks}>
                    <NavLink 
                    to="/dashboard"
                    end
                    style={getLinkStyle}>
                        Overview
                    </NavLink>
                    <NavLink 
                    to="/dashboard/movies"
                    style={getLinkStyle}>
                        Movies
                    </NavLink>
                    <NavLink 
                    to="/dashboard/shows"
                    style={getLinkStyle}>
                        Shows
                    </NavLink>
                </nav>
            </aside>
            <main style={styles.content}>
                {/* Outlet acts as a placeholder */}
                <Outlet />
            </main>
        </section>
    );
}

function getLinkStyle({isActive}) {
    return{
        textDecoration: "none",
        color: isActive? "#d32f2f" : "#333",
        fontWeight: isActive ? "bold" : "normal",
        // borderBottom: isActive ? "2px solid #d32f2f" : "none",
        // paddingBottom: "4px"
    };    
}
const styles = {
    container: {
        display:"flex",
        gap: "20px",
        marginTop: "20px"
    },
    sidebar: {
        minWidth:"180px",
        borderRight: "2px solid #ddd",
        paddingRight: "20px"
    },
    sidebarLinks: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    content: {
        flex:1
    }
};