import {AppFooter, AppHeader} from "@/components/common";
import {Outlet} from "react-router";

export default function RootLayout() {
    return <div className="page">
        <AppHeader></AppHeader>
        <div className="container">
            <Outlet></Outlet>
        </div>
        <AppFooter></AppFooter>
    </div>;
};