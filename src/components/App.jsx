import { useMemo, useState } from "react";
import "./App.css";
import InternshipCard from "./components/InternshipCard";

export default function App() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Akamai", title: "InfoSec Compliance Intern", status: "Interested", deadline: "—" },
    { id: 2, company: "Coding it Forward", title: "Fellowship (Software/Data/Design)", status: "Applying", deadline: "—" },
    { id: 3, company: "PNNL", title: "NSIP Undergraduate Intern - AI & Data Analytics", status: "Applying", deadline: "—" },
  ]);

  const [filter, setFilter] = useState("All");

  const filteredApps = useMemo(() => {
    if (filter === "All") return applications;
    return applications.filter((a) => a.status === filter);
  }, [applications, filter]);

  return (
    <div className="page">
      <header className="header">
        <h1>Internship Tracker</h1>
        <p>Track roles, deadlines, and application status in one place.</p>
      </header>

      <main className="main">
        <section className="card">
          <div className="sectionHeader">
            <h2>My Applications</h2>

            <label className="filter">
              Filter:
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>Interested</option>
                <option>Applying</option>
                <option>Submitted</option>
                <option>Interviewing</option>
                <option>Rejected</option>
              </select>
            </label>
          </div>

          <div className="grid">
            {filteredApps.map((app) => (
              <InternshipCard
                key={app.id}
                company={app.company}
                title={app.title}
                status={app.status}
                deadline={app.deadline}
              />
            ))}
          </div>
        </section>

        <AddApplicationForm
          onAdd={(newApp) =>
            setApplications((prev) => [{ ...newApp, id: Date.now() }, ...prev])
          }
        />

        <section className="card">
          <h2>Next Actions</h2>
          <ul>
            <li>Pick 3 roles to apply to this week</li>
            <li>Update resume for each role</li>
            <li>Submit applications</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <small>Built with React + Vite</small>
      </footer>
    </div>
  );
}

function AddApplicationForm({ onAdd }) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Interested");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;

    onAdd({
      company: company.trim(),
      title: title.trim(),
      status,
      deadline: deadline.trim() || "—",
    });

    setCompany("");
    setTitle("");
    setStatus("Interested");
    setDeadline("");
  }

  return (
    <section className="card">
      <h2>Add Application</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Company
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., IBM" />
        </label>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Frontend Intern" />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Interested</option>
            <option>Applying</option>
            <option>Submitted</option>
            <option>Interviewing</option>
            <option>Rejected</option>
          </select>
        </label>

        <label>
          Deadline (optional)
          <input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="MM/DD or text" />
        </label>

        <button type="submit">Add</button>
      </form>
    </section>
  );
}
