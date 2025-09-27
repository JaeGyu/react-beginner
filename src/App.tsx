import {AppFooter, AppHeader} from "@/components/common";
import {ThemeProvider} from "@/components/theme-provider.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="page">
                <AppHeader></AppHeader>
                <div className="container"></div>
                <AppFooter></AppFooter>
            </div>
        </ThemeProvider>
    )
}

export default App;