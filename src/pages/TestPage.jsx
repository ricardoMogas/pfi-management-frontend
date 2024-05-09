import Loader from "../components/Loader";

export default function Test() {
  return (
    <>
      <div className="container text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-auto position-fixed top-50 start-50 translate-middle">
            <div className="dropdown-center">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Centered dropdown
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action two
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Action three
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}


// CENTRAR AL CENTRO :  position-fixed top-50 start-50 translate-middle