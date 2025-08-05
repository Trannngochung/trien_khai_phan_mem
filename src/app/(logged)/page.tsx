"use client";
import Slider from "@/components/layout/Slider";
import { motion } from "framer-motion";

// change text to vietnamese
export default function ClinicBanner() {
  return (
    <section>
      <Slider />

      <section className="schedule">
        <div className="container">
          <div className="schedule-inner">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12 ">
                <div className="single-schedule first">
                  <div className="inner">
                    <div className="icon">
                      <i className="fa fa-ambulance"></i>
                    </div>
                    <div className="single-content">
                      <span>Lorem Amet</span>
                      <h4>Trường hợp khẩn cấp</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit.
                        Vivamus et erat in lacus convallis sodales.
                      </p>
                      <a href="#">
                        Tìm hiểu thêm<i className="fa fa-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="single-schedule middle">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-prescription"></i>
                    </div>
                    <div className="single-content">
                      <span>Fusce Porttitor</span>
                      <h4>Lịch trình bác sĩ</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit.
                        Vivamus et erat in lacus convallis sodales.
                      </p>
                      <a href="#">
                        Tìm hiểu thêm<i className="fa fa-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-12">
                <div className="single-schedule last">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-ui-clock"></i>
                    </div>
                    <div className="single-content">
                      <span>Donec luctus</span>
                      <h4>Giờ làm việc</h4>
                      <ul className="time-sidual">
                        <li className="day">
                          Thứ Hai - Thứ Năm <span>8.00-20.00</span>
                        </li>
                        <li className="day">
                          Thứ Sáu <span>9.00-18.30</span>
                        </li>
                        <li className="day">
                          Chủ nhật <span>9.00-15.00</span>
                        </li>
                      </ul>
                      <a href="#">
                        Tìm hiểu thêm<i className="fa fa-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="Feautes section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Chúng tôi luôn sẵn sàng giúp bạn và gia đình bạn</h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="single-features">
                <div className="signle-icon">
                  <i className="icofont icofont-ambulance-cross"></i>
                </div>
                <h3>Trợ giúp khẩn cấp</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="single-features">
                <div className="signle-icon">
                  <i className="icofont icofont-medical-sign-alt"></i>
                </div>
                <h3>Phòng thuốc đầy đủ</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="single-features last">
                <div className="signle-icon">
                  <i className="icofont icofont-stethoscope"></i>
                </div>
                <h3>Chăm sóc y tế</h3>
                <p>
                  Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam
                  vulputate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="fun-facts" className="fun-facts section overlay">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i className="icofont icofont-home"></i>
                <div className="content">
                  <span className="counter">3468</span>
                  <p>Phòng khám</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i className="icofont icofont-user-alt-3"></i>
                <div className="content">
                  <span className="counter">557</span>
                  <p>Bác sĩ chuyên khoa</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i className="icofont-simple-smile"></i>
                <div className="content">
                  <span className="counter">4379</span>
                  <p>Bệnh nhân hài lòng</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-fun">
                <i className="icofont icofont-table"></i>
                <div className="content">
                  <span className="counter">32</span>
                  <p>Năm kinh nghiệm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="why-choose section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>
                  Chúng tôi cung cấp các dịch vụ khác nhau để cải thiện sức khỏe
                  của bạn
                </h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="choose-left">
                <h3>Chúng tôi là ai</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas pharetra antege vel est lobortis, a commodo magna
                  rhoncus. In quis nisi non emet quam pharetra commodo.{" "}
                </p>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.{" "}
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right"></i>Maecenas vitae
                        luctus nibh.{" "}
                      </li>
                      <li>
                        <i className="fa fa-caret-right"></i>Duis massa massa.
                      </li>
                      <li>
                        <i className="fa fa-caret-right"></i>Aliquam feugiat
                        interdum.
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right"></i>Maecenas vitae
                        luctus nibh.{" "}
                      </li>
                      <li>
                        <i className="fa fa-caret-right"></i>Duis massa massa.
                      </li>
                      <li>
                        <i className="fa fa-caret-right"></i>Aliquam feugiat
                        interdum.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="choose-right">
                <div className="video-image">
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1"></div>
                      <div className="waves wave-2"></div>
                      <div className="waves wave-3"></div>
                    </div>
                  </div>

                  <a
                    href="https://www.youtube.com/watch?v=RFVXy6CRVR4"
                    className="video video-popup mfp-iframe"
                  >
                    <i className="fa fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="call-action overlay"
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="content">
                <h2>Bạn cần trợ giúp y tế khẩn cấp? Gọi @ 1234 56789</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque porttitor dictum turpis nec gravida.
                </p>
                <div className="button">
                  <a href="#" className="btn">
                    Liên hệ ngay
                  </a>
                  <a href="#" className="btn second">
                    Tìm hiểu thêm<i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Chúng tôi duy trì các quy tắc vệ sinh trong bệnh viện</h2>
                <img src="/img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="owl-carousel portfolio-slider">
                <div className="single-pf">
                  <img src="/img/pf1.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf2.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf3.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf4.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf1.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf2.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf3.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
                <div className="single-pf">
                  <img src="img/pf4.jpg" alt="#" />
                  <a href="portfolio-details.html" className="btn">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>
                  Chúng tôi cung cấp các dịch vụ khác nhau để cải thiện sức khỏe
                  của bạn
                </h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-prescription"></i>
                <h4>
                  <a href="service-details.html">Chăm sóc tổng quát</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-tooth"></i>
                <h4>
                  <a href="service-details.html">Chăm sóc răng miệng</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-heart-alt"></i>
                <h4>
                  <a href="service-details.html">Chăm sóc tim mạch</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-listening"></i>
                <h4>
                  <a href="service-details.html">Chăm sóc tai mũi họng</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-eye-alt"></i>
                <h4>
                  <a href="service-details.html">Chăm sóc mắt</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-service">
                <i className="icofont icofont-blood"></i>
                <h4>
                  <a href="service-details.html">Chuyển máu</a>
                </h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  luctus dictum eros ut imperdiet.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-table section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>
                  Chúng tôi cung cấp cho bạn phương pháp điều trị tốt nhất với
                  giá cả hợp lý
                </h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i className="icofont icofont-ui-cut"></i>
                  </div>
                  <h4 className="title">Chăm sóc ngoại khoa</h4>
                  <div className="price">
                    <p className="amount">
                      $199<span>/ Per Visit</span>
                    </p>
                  </div>
                </div>

                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum
                    dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur
                    sollicitudin fentum
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Nullam interdum
                    enim
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Donec ultricies
                    metus
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Pellentesque
                    eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i className="icofont icofont-tooth"></i>
                  </div>
                  <h4 className="title">Chăm sóc răng miệng</h4>
                  <div className="price">
                    <p className="amount">
                      $299<span>/ Per Visit</span>
                    </p>
                  </div>
                </div>

                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum
                    dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur
                    sollicitudin fentum
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Nullam interdum
                    enim
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Donec ultricies
                    metus
                  </li>
                  <li className="cross">
                    <i className="icofont icofont-ui-close"></i>Pellentesque
                    eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-12">
              <div className="single-table">
                <div className="table-head">
                  <div className="icon">
                    <i className="icofont-heart-beat"></i>
                  </div>
                  <h4 className="title">Chăm sóc tim mạch</h4>
                  <div className="price">
                    <p className="amount">
                      $399<span>/ Per Visit</span>
                    </p>
                  </div>
                </div>

                <ul className="table-list">
                  <li>
                    <i className="icofont icofont-ui-check"></i>Lorem ipsum
                    dolor sit
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Cubitur
                    sollicitudin fentum
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Nullam interdum
                    enim
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Donec ultricies
                    metus
                  </li>
                  <li>
                    <i className="icofont icofont-ui-check"></i>Pellentesque
                    eget nibh
                  </li>
                </ul>
                <div className="table-bottom">
                  <a className="btn" href="#">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog section" id="blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Cập nhật những tin tức y tế mới nhất.</h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="news-head">
                  <img src="img/blog1.jpg" alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">22 Aug, 2020</div>
                    <h2>
                      <a href="blog-single.html">
                        Chúng tôi đã giới thiệu sản phẩm mới.
                      </a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt sed do incididunt
                      sed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="news-head">
                  <img src="img/blog2.jpg" alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">15 Jul, 2020</div>
                    <h2>
                      <a href="blog-single.html">
                        Top five cách giải quyết vấn đề răng.
                      </a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt sed do incididunt
                      sed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-news">
                <div className="news-head">
                  <img src="img/blog3.jpg" alt="#" />
                </div>
                <div className="news-body">
                  <div className="news-content">
                    <div className="date">05 Jan, 2020</div>
                    <h2>
                      <a href="blog-single.html">
                        Chúng tôi cung cấp giải pháp kinh doanh cao cấp.
                      </a>
                    </h2>
                    <p className="text">
                      Lorem ipsum dolor a sit ameti, consectetur adipisicing
                      elit, sed do eiusmod tempor incididunt sed do incididunt
                      sed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="clients overlay">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="owl-carousel clients-slider">
                <div className="single-clients">
                  <img src="img/client1.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client2.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client3.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client4.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client5.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client1.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client2.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client3.png" alt="#" />
                </div>
                <div className="single-clients">
                  <img src="img/client4.png" alt="#" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="appointment">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Chúng tôi luôn sẵn sàng giúp bạn. Đặt lịch hẹn</h2>
                <img src="img/section-img.png" alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <form className="form" action="#">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <input name="name" type="text" placeholder="Họ và tên" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <input name="email" type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <input
                        name="phone"
                        type="text"
                        placeholder="Số điện thoại"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <div
                        className="nice-select form-control wide"
                        tabIndex={0}
                      >
                        <span className="current">Khoa</span>
                        <ul className="list">
                          <li data-value="1" className="option selected ">
                            Khoa
                          </li>
                          <li data-value="2" className="option">
                            Khoa tim mạch
                          </li>
                          <li data-value="3" className="option">
                            Khoa não
                          </li>
                          <li data-value="4" className="option">
                            Khoa ngoại
                          </li>
                          <li data-value="5" className="option">
                            Khoa nội
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <div
                        className="nice-select form-control wide"
                        tabIndex={0}
                      >
                        <span className="current">Bác sĩ</span>
                        <ul className="list">
                          <li data-value="1" className="option selected ">
                            Bác sĩ
                          </li>
                          <li data-value="2" className="option">
                            Bác sĩ A
                          </li>
                          <li data-value="3" className="option">
                            Bác sĩ B
                          </li>
                          <li data-value="4" className="option">
                            Bác sĩ C
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group">
                      <input type="text" placeholder="Ngày" id="datepicker" />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        placeholder="Nội dung"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-md-4 col-12">
                    <div className="form-group">
                      <div className="button">
                        <button type="submit" className="btn">
                          Đặt lịch hẹn
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-8 col-12">
                    <p>( Chúng tôi sẽ xác nhận bằng tin nhắn văn bản )</p>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-md-12 ">
              <div className="appointment-image">
                <img src="img/contact-img.png" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter section">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6  col-12">
              <div className="subscribe-text ">
                <h6>Đăng kí nhận bản tin</h6>
                <p className="">
                  Cu qui soleat partiendo urbanitas. Eum aperiri indoctum eu,
                  <br /> homero alterum.
                </p>
              </div>
            </div>
            <div className="col-lg-6  col-12">
              <div className="subscribe-form ">
                <form
                  action="mail/mail.php"
                  method="get"
                  target="_blank"
                  className="newsletter-inner"
                >
                  <input
                    name="EMAIL"
                    placeholder="Địa chỉ email của bạn"
                    className="common-input"
                    required={true}
                    type="email"
                  />
                  <button className="btn">Đăng kí</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
