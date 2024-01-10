import { Link } from "react-router-dom";

const EDU = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Want to know my education history? <br className="sm:block hidden" />
        Then click here!
      </p>
      <Link to="/education" className="btn py-2 px-4">
        For Education
      </Link>
    </section>
  );
};

export default EDU;
