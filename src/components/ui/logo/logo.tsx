import "./logo.css";

export const Logo = () => {
  return (
    <div className="c-logo">
      <img className="c-logo-img" src="src/assets/logo.png" alt="Logo" />
      <h3 className="c-logo-title">STK Vojvodina</h3>
      <p className="c-logo-description">
        Osnovan 1945. Oficijalni website stonoteniskog kluba
      </p>
    </div>
  );
};
