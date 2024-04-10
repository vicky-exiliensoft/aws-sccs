"use client"; // Indicates that this code runs on the client-side
import React from "react"; // Importing React library
import { FaHome, FaLink, FaCog, FaExchangeAlt, FaRobot } from "react-icons/fa"; // Importing icons from React Icons library
import Nav from "react-bootstrap/Nav"; // Importing Nav component from React Bootstrap
import Image from "next/image";
import { Navbar, Offcanvas } from "react-bootstrap";

function Sidebar() {
  // Sidebar component
  return (
    <>
      {/* <Navbar.Collapse id="basic-navbar-nav"> */}
      <div className="sidebar">
        <div className="sidebar-inner">
          {/* {{-- SideBar Logo section Start --}} */}
          <div className="logo-part px-2 d-flex align-items-center sticky-top">
            <a href="/" className="m-auto">
              <Image src={"../logo.svg"} alt="logo" width={150} height={150} className="Image-fluid m-auto transition-x d-block" />
              <Image
                src={"../logo-square.svg"}
                alt="logo"
                width={500}
                height={500}
                className="Image-fluid Image-fluid partial-logo transition-x w-0 d-block"
              />
            </a>
            {/* {{-- Mobile Sidebar Hamburg-button Start --}} */}
            {/* <button className="btn btn-md shadow-none border-0 float-end sidebar-arrow d-md-none">
                <div className="hamburg-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button> */}
          </div>
          {/* {{-- SideBar Logo section End --}} */}
          {/* {{-- SideBar Menu Start --}} */}
          <Nav defaultActiveKey="/home" className="flex-column ">
            {/* <Nav.Item> */}
            {/* Sidebar link */}
            {/* <Nav.Link href="#home" className="text-white text-justify text-center" style={{ backgroundColor: "rgba(0,0,0,0)" }}> */}
            {/* <Image src={"../logo.svg"} alt="logo" width={500} height={500} className="Image-fluid m-auto transition-x d-block" /> */}
            {/* <Image src={"../logo-square.svg"} alt="logo" width={500} height={500} className="Image-fluid Image-fluid partial-logo transition-x w-0 d-block" /> */}
            {/* </Nav.Link> */}
            {/* </Nav.Item> */}
            <Nav.Item>
              {/* Sidebar link */}
              <Nav.Link href="/rules" className="text-white text-justify" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                <FaHome size={20} className="text-danger" />
                <span className="ms-2">Rules</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {/* Sidebar link */}
              <Nav.Link href="#link" className="text-white text-justify" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                <FaLink size={20} className="text-warning" />
                <span className="ms-2">Marketplace</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {/* Sidebar link */}
              <Nav.Link href="#link" className="text-white text-justify" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                <FaExchangeAlt size={20} className="text-info" />
                <span className="ms-2">Exchange</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {/* Sidebar link */}
              <Nav.Link href="/settings" className="text-white text-justify" style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                <FaCog size={20} className="text-success" />
                <span className="ms-2">Setting</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <ul className="sidebar-menus transition-x navbar-nav">
            {/* {{-- Dashboard Menu Start --}} */}
            <li className="sidebar-menus-list-item d-flex align-items-start transition-x nav-item {{ isLinkActive('*/dashboard') }}">
              <span className="sidebar-menus-list-item-Image">
                <Image src="{{ Vite::asset('resources/images/dashboard.svg') }}" alt="Dashboard" className="Image-fluid" />
              </span>
              <div className="menu-with-icon transition-x">
                <a
                  className="sidebar-menus-list-item-link nav-link transition-x py-0"
                  aria-current="page"
                  href="{{ route('admin.dashboard.index') }}"
                  title="Dashboard">
                  Dashboard
                </a>
              </div>
            </li>
            {/* {{-- Dashboard Menu End --}} */}
            {/* {{-- Booking Menu Start --}} */}
            <li className="sidebar-menus-list-item d-flex align-items-start  transition-x nav-item">
              <span className="sidebar-menus-list-item-Image">
                <Image src="{{ Vite::asset('resources/images/booking.svg') }}" alt="Agent" className="Image-fluid" />
              </span>
              <div className="menu-with-icon transition-x">
                <a
                  href="#Booking"
                  className="sidebar-menus-list-item-link nav-link dropdown-toggle transition-x py-0"
                  title="Booking"
                  aria-current="page"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="Booking"
                  role="button">
                  Bookings
                </a>
                {/* {{-- Booking Dropdown Start --}} */}
                <ul className="collapse sidebar-menus-dropdown-list list-group list-unstyled" id="Booking">
                  {/* @can('role-list') */}
                  <li className="mx-2 mt-3 mb-2 sidebar-menus-dropdown-list-item">
                    <a
                      className="dropdown-item sidebar-menus-dropdown-list-item-link d-flex align-items-center gap-3"
                      href="{{route('admin.role.index')}}">
                      Roles
                    </a>
                  </li>
                  {/* @endcan */}
                  {/* @can('permission-list') */}
                  <li className="mx-2 mt-3 mb-2 sidebar-menus-dropdown-list-item">
                    <a
                      className="dropdown-item sidebar-menus-dropdown-list-item-link d-flex align-items-center gap-3"
                      href="{{route('admin.permission.index')}}">
                      Permission
                    </a>
                  </li>
                  {/* @endcan */}
                  {/* @can('user-list') */}
                  <li className="mx-2 mt-3 mb-2 sidebar-menus-dropdown-list-item">
                    <a
                      className="dropdown-item sidebar-menus-dropdown-list-item-link d-flex align-items-center gap-3"
                      href="{{route('admin.users.index')}}">
                      Admin User
                    </a>
                  </li>
                  {/* @endcan */}
                </ul>
                {/* {{-- Booking Dropdown End --}} */}
              </div>
            </li>
            {/* {{-- Booking Menu End --}} */}
            {/* {{-- Booking Start --}} */}
            <li className="sidebar-menus-list-item d-flex align-items-start transition-x nav-item {{ isLinkActive('*/booking') }}">
              <span className="sidebar-menus-list-item-Image">
                <Image src="{{ Vite::asset('resources/images/booking.svg') }}" alt="Agent" className="Image-fluid" />
              </span>
              <div className="menu-with-icon transition-x">
                <a
                  className="sidebar-menus-list-item-link nav-link transition-x py-0"
                  aria-current="page"
                  href="{{route('admin.booking.index')}}"
                  title="Bookings"
                  aria-expanded="false"
                  aria-controls="Booking"
                  role="button">
                  Bookings
                </a>
              </div>
            </li>
            {/* {{-- Booking End --}} */}
            {/* {{-- Customers Menu Start --}} */}
            <li className="sidebar-menus-list-item d-flex align-items-start transition-x nav-item {{ isLinkActive('*/customers') }}">
              <span className="sidebar-menus-list-item-Image">
                <Image src="{{ Vite::asset('resources/images/customers.svg') }}" alt="Customer" className="Image-fluid" />
              </span>
              <div className="menu-with-icon transition-x">
                <a
                  href="{{route('admin.customers.index')}}"
                  className="sidebar-menus-list-item-link nav-link transition-x py-0"
                  title="Customers"
                  aria-current="page">
                  Customers
                </a>
              </div>
            </li>
            {/* {{-- Customers Menu End --}} */}
          </ul>
          <div className="text-center mb-3">
            <button className="btn btn-primary btn-block">Full Access</button>
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-secondary btn-block">Help Center</button>
          </div>
          {/* {{-- SideBar Menu End --}} */}
          {/* {{-- Logout Menu Start --}} */}
          <ul className="sidebar-menus transition-x navbar-nav position-absolute bottom-0 m-0 w-100 mh-0 p-0">
            <li className="sidebar-menus-list-item d-flex align-items-start transition-x nav-item border-0 p-2 px-3 bg-dark mb-0">
              <span className="sidebar-menus-list-item-Image">
                <Image src="{{ Vite::asset('resources/images/logout.svg') }}" alt="users" className="Image-fluid" />
              </span>
              <div className="menu-with-icon transition-x">
                <a
                  className="sidebar-menus-list-item-link nav-link transition-x py-0"
                  aria-current="page"
                  href="{{ route('admin.logout') }}"
                  title="Logout">
                  Logout
                </a>
              </div>
            </li>
          </ul>
          {/* {{-- Logout Menu End --}} */}
        </div>
      </div>
      {/* </Navbar.Collapse> */}
    </>
  );
}

export default Sidebar;
