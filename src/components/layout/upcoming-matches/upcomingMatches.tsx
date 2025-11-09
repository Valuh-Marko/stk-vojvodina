import "./upcomingMatches.css";

const UpcomingMatches = () => {
  return (
    <section className="l-upcoming-matches">
      <h2 className="c-upcoming-matches__title">Upcoming Matches</h2>
      <div className="c-upcoming-matches">
        <div className="c-match-card">
          <h3>Team A vs Team B</h3>
          <p>Date: 2024-07-15</p>
          <p>Location: Stadium XYZ</p>
        </div>
        <div className="c-match-card">
          <h3>Team C vs Team D</h3>
          <p>Date: 2024-07-22</p>
          <p>Location: Stadium ABC</p>
        </div>
        <div className="c-match-card">
          <h3>Team C vs Team D</h3>
          <p>Date: 2024-07-22</p>
          <p>Location: Stadium ABC</p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
