import { useTranslation } from "react-i18next";
import "./logo.css";

export const Logo = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "logo" });

  return (
    <div className="c-logo">
      <img className="c-logo-img" src="/assets/logo.png" alt="Logo" />
      <h3 className="c-logo-title">STK Vojvodina</h3>
      <p className="c-logo-description">{t("desc")}</p>
    </div>
  );
};
