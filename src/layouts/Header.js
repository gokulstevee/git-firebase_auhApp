import React, { useContext, useState } from "react";
import {
  Navbar,
  Collapse,
  NavLink,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  NavbarText,
  Nav,
} from "reactstrap";

import { Link } from "react-router-dom";

import { UserContext } from "../components/UserContext";

const Header = () => {
  const context = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="info" light expand="md">
      <NavbarBrand>
        <Link to="/" style={{ textDecoration: "none" }} className="text-white">
          MyAuthApp
        </Link>
      </NavbarBrand>
      {context.user?.email ? (
        <NavbarText className="text-white">
          Welcome {context.user.email}
        </NavbarText>
      ) : (
        ""
      )}
      <NavbarToggler onClick={toggle} />
      <Collapse navbar isOpen={isOpen}>
        <Nav className="ml-auto" navbar>
          {context.user ? (
            <NavItem>
              <NavLink
                onClick={() => {
                  context.setuser(null);
                }}
                className="text-white"
              >
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink tag={Link} to="/signup" className="text-white">
                  Signup
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signin" className="text-white">
                  Signin
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
