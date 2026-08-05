// Pagina principal de los administradores

import AdminSidebar from "../../components/admin/AdminSidebar";
import DashboardLinks from "../../components/admin/dashboard/DashboardLink";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles.css";
import DashboardLink from "../../components/admin/dashboard/DashboardLink";

export default function AdminDashboard() {
    return (
        <>
            <Header />
            <main className="admin-dashboard profile-page">
                <div className="dashboard-links">
                    <DashboardLink img={"tickets.png"} path={"/admin/movies"} header={"Movies"}/>
                    <DashboardLink img={"pop_corn.png"} path={"/admin/foods"} header={"Foods"}/>
                    <DashboardLink img={"chair.png"} path={"/admin/rooms"} header={"Rooms"}/>
                    <DashboardLink img={"accounts.png"} path={"/admin/accounts"} header={"Accounts"}/>
                </div>
            </main>
            <Footer />
        </>
    )
}