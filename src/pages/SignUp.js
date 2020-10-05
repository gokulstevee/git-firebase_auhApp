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
import { UserContext } from "../components/UserContext";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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
    e.preventDefault();
    handleSignUp();
  };

  if (context.user?.uid) {
    return <Redirect to="/" />;
  }
  return (
    <Container className="text-center">
      <Row>
        <Col lg={6} style={{ margin: "auto" }} className="mt-5">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className="">SignUp here</CardHeader>
              <CardBody>
                <FormGroup  row>
                  <Col style={{ margin: "auto" }} sm={9}>
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
                  <Col style={{ margin: "auto" }} sm={9}>
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
                  Signup
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
