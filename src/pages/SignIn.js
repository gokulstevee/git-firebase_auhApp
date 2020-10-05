import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";

import firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../components/UserContext";

const SignIn = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid });
      })
      .catch((err) => {
        console.log(err);
        toast(err.message, {
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.peventDefault();
    handleSignIn();
  };

  if (context.user?.email) {
    return <Redirect to="/" />;
  }
  return (
    <Container className="text-center">
      <Row>
        <Col lg={6} style={{ margin: "auto" }} className="mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">SignIn here</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col sm={9} style={{ margin: "auto" }}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={9} style={{ margin: "auto" }}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type="submit" block color="primary">
                  Signin
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
