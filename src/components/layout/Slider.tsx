import Link from "next/link";
import React from "react";

// change text to vietnamese
const Slider = () => {
  return (
    <section className="slider">
      <div className="hero-slider">
        {/* Start Single Slider */}
        <div
          className="single-slider"
          style={{ backgroundImage: "url('img/slider2.jpg')" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="text">
                  <h1>
                    Chúng tôi cung cấp <span>Dịch vụ</span> Y tế mà bạn có thể{" "}
                    <span>tin tưởng!</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sed nisl pellentesque, faucibus libero eu, gravida
                    quam.{" "}
                  </p>
                  <div className="button">
                    <Link href="/login" className="btn">
                      Đặt lịch hẹn
                    </Link>
                    <a href="#" className="btn primary">
                      Tìm hiểu thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Single Slider */}
        {/* Start Single Slider */}
        {/* <div
          className="single-slider"
          style={{ backgroundImage: "url('img/slider.jpg')" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="text">
                  <h1>
                    We Provide <span>Medical</span> Services That You Can{" "}
                    <span>Trust!</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sed nisl pellentesque, faucibus libero eu, gravida
                    quam.{" "}
                  </p>
                  <div className="button">
                    <a href="#" className="btn">
                      Get Appointment
                    </a>
                    <a href="#" className="btn primary">
                      About Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End Single Slider */}
        {/* Start Single Slider */}
        {/* <div
          className="single-slider"
          style={{ backgroundImage: "url('img/slider3.jpg')" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="text">
                  <h1>
                    We Provide <span>Medical</span> Services That You Can{" "}
                    <span>Trust!</span>
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris sed nisl pellentesque, faucibus libero eu, gravida
                    quam.{" "}
                  </p>
                  <div className="button">
                    <a href="#" className="btn">
                      Get Appointment
                    </a>
                    <a href="#" className="btn primary">
                      Contact Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* End Single Slider */}
      </div>
    </section>
  );
};

export default Slider;
