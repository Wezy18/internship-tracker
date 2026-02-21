export default function InternshipCard({ company, title, status, deadline }) {
    return (
      <div className="internshipCard">
        <div className="internshipCardTop">
          <h3>{company}</h3>
          <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>
        </div>
  
        <p className="muted">{title}</p>
  
        {deadline && (
          <p className="muted">
            <strong>Deadline:</strong> {deadline}
          </p>
        )}
      </div>
    );
  }
  