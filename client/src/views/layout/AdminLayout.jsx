import { Outlet } from "react-router-dom";
import Header from "../admin/Header";
import Footer from "../admin/Footer";

function AdminLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default AdminLayout;