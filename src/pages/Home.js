import React, { useContext, useState } from "react";
import Axios from "axios";

import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import UserCard from "../components/UserCard";
import Repos from "../components/Repos";

const Home = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const context = useContext(UserContext);
  const fetchDetails = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setUser(data);
    } catch (err) {
      toast("Not able to Fetch", {
        type: "error",
      });
    }
  };

  if (!context.user?.uid) {
    return <Redirect to="/signin" />;
  }
  return (
    <Container>
      <Row className="mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              placeholder="Enter User"
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button
                style={{ backgroundColor: "#0A79DF" }}
                onClick={fetchDetails}
              >
                Fetch User
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md="7">{user ? <Repos repoUrl={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
