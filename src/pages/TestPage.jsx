import Loader from "../components/Loader";

export default function Test() {
  return (
    <>
      <div className="container text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-auto position-fixed top-50 start-50 translate-middle">
            <Loader />
          </div>
        </div>
      </div>
    </>
  );
}


// CENTRAR AL CENTRO :  position-fixed top-50 start-50 translate-middle