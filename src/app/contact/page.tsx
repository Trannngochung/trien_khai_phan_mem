import React from "react";
import Image from "next/image";
const Page = () => {
  return (
    <section className="contact-us section">
      <div className="container">
        <div className="inner">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-us-left">
                <Image
                  className="size-full"
                  src="/img/mission-img.jpg"
                  alt="contact"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-us-form">
                <h2>Liên hệ với chúng tôi</h2>
                <p>
                  Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.
                </p>
                {/* Form */}
                <form className="form" method="post" action="mail/mail.php">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group login-btn">
                        <button className="btn" type="submit">
                          Gửi
                        </button>
                      </div>
                      <div className="checkbox">
                        <label className="checkbox-inline" htmlFor="2">
                          <input name="news" id="2" type="checkbox" />
                          Bạn có muốn đăng kí nhận bản tin của chúng tôi không?
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-info">
          <div className="row">
            {/* single-info */}
            <div className="col-lg-4 col-12">
              <div className="single-info">
                <i className="icofont icofont-ui-call"></i>
                <div className="content">
                  <h3>+(000) 1234 56789</h3>
                  <p>info@company.com</p>
                </div>
              </div>
            </div>
            {/* End single-info */}
            {/* single-info */}
            <div className="col-lg-4 col-12">
              <div className="single-info">
                <i className="icofont-google-map"></i>
                <div className="content">
                  <h3>Trường Đại học Y Hà Nội</h3>
                  <p>Hà Nội, Việt Nam</p>
                </div>
              </div>
            </div>
            {/* End single-info */}
            {/* single-info */}
            <div className="col-lg-4 col-12">
              <div className="single-info">
                <i className="icofont icofont-wall-clock"></i>
                <div className="content">
                  <h3>Thứ Hai - Thứ Bảy: 8h - 17h</h3>
                  <p>Chủ nhật: Đóng cửa</p>
                </div>
              </div>
            </div>
            {/* End single-info */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
