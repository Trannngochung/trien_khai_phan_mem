"use client";
import useAuthStore from "@/store/store";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const Header = () => {
  const { role, userName, clearCookieStore } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const renderTopRight = () => {
    return (
      <ul className="top-contact">
        <li>
          <i className="fa fa-phone"></i> +880 1234 56789
        </li>
        <li>
          <i className="fa fa-envelope"></i>
          <a href="mailto:support@yourmail.com">support@yourmail.com</a>
        </li>
        {role && userName ? (
          <>
            <li
              className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer"
              onClick={() => {
                clearCookieStore();
                router.push("/");
              }}
            >
              Đăng xuất
            </li>
            <li>
              <span className="font-bold">User: {userName}</span>
            </li>
          </>
        ) : (
          <li className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer">
            <Link href="/login">Đăng nhập</Link>
          </li>
        )}
      </ul>
    );
  };

  const renderMenuItem = (href: string, label: string) => (
    <li className={pathname === href ? "active" : ""}>
      <Link href={href}>{label}</Link>
    </li>
  );

  const notLoginMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            {renderMenuItem("/", "Trang chủ")}
            {renderMenuItem("/list_doctor", "Bác sĩ")}
            {renderMenuItem("/services", "Dịch vụ")}
            {renderMenuItem("/contact", "Liên hệ")}
          </ul>
        </nav>
      </div>
    </div>
  );

  const patientMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            {renderMenuItem("/", "Trang chủ")}
            {renderMenuItem("/user", "Dịch vụ")}
            {renderMenuItem("/list_doctor", "Danh sách bác sĩ")}
            {renderMenuItem("/contact", "Liên hệ")}
          </ul>
        </nav>
      </div>
    </div>
  );

  const adminMenu = () => (
    <div className="col-lg-9 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            {renderMenuItem("/admin", "QL Doanh thu")}
            {renderMenuItem("/admin/doctor", "QL Bác sĩ")}
            {renderMenuItem("/admin/staff", "QL Nhân viên")}
            {renderMenuItem("/admin/patient", "QL Bệnh nhân")}
            {renderMenuItem("/admin/bill", "QL Hóa đơn")}
            {renderMenuItem("/admin/medicine", "QL Thuốc")}
            {renderMenuItem("/admin/account", "QL Tài khoản")}
          </ul>
        </nav>
      </div>
    </div>
  );

  const staffMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            {renderMenuItem("/staff", "QL lịch khám")}
            {renderMenuItem("/staff/bill", "QL Hóa đơn")}
          </ul>
        </nav>
      </div>
    </div>
  );

  const doctorMenu = () => (
    <div className="col-lg-7 col-md-9 col-12">
      <div className="main-menu">
        <nav className="navigation">
          <ul className="nav menu">
            {renderMenuItem("/doctor", "QL lịch khám")}
            {renderMenuItem("/doctor/medical-record", "QL sổ khám bệnh")}
          </ul>
        </nav>
      </div>
    </div>
  );

  const renderMenuByRole = () => {
    if (!role) return notLoginMenu();
    switch (role) {
      case "PATIENT":
        return patientMenu();
      case "ADMIN":
        return adminMenu();
      case "STAFF":
        return staffMenu();
      case "DOCTOR":
        return doctorMenu();
      default:
        return null;
    }
  };

  return (
    <header className="header">
      {/* Topbar */}
      <div className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12"></div>
            <div className="col-lg-8 col-md-6 col-12">{renderTopRight()}</div>
          </div>
        </div>
      </div>

      {/* Header inner */}
      <div className="header-inner">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="logo">
                  <Link href="/">
                    <Image
                      className="w-20"
                      src="/img/new-logo.jpg"
                      alt="Logo"
                      width={1200}
                      height={800}
                    />
                  </Link>
                </div>
                <div className="mobile-nav" />
              </div>

              {/* Menu theo role */}
              {renderMenuByRole()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
