import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrganisationsPage from "./pages/OrganisationsPage";
import CreateOrganisationPage from "./pages/CreateOrganisationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styles from "./App.css";

function App() {
  return (
    <Router>
      <div className={styles.appContainer}>
        <Header />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/organisations" element={<OrganisationsPage />} />
            <Route
              path="/organisations/create"
              element={<CreateOrganisationPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
