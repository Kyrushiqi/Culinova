import './Home.css';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="formatting-3-containers">
        <Filter />

        <div className="main-content-container">
          <div className="main-bg">
            <div id="main-header-text">
              <h1>Culinova</h1>
              <h5>
                Don’t know what to make with your ingredients? Let us help you! :D
              </h5>
            </div>

            <div id="with-without-container">
              <div id="with-without-btns">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="with-btn"
                    autoComplete="off"
                    defaultChecked
                  />
                  <label className="btn btn-outline-primary" htmlFor="with-btn">With</label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="without-btn"
                    autoComplete="off"
                  />
                  <label className="btn btn-outline-primary" htmlFor="without-btn">Without</label>
                </div>
              </div>

              <div id="list-ingredients-box">
                <textarea
                  className="form-control"
                  aria-label="With"
                  placeholder="List your ingredients here (comma-separated)..."
                  id="textarea-ingredients"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div id="your-cookbook-btn">
            <button type="button" className="btn btn-primary">
              <h5>Your Cookbook</h5>
            </button>
          </div>

          <div id="favorites-container">
            <h2>Favorites</h2>
          </div>
        </div>
      </div>
    </>
  );
}
