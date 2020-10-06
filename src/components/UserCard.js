import React from "react";
import { Card, CardBody } from "reactstrap";

const UserCard = ({ user }) => {
  return (
    <Card className="mt-2 mb-4">
      <img src={user.avatar_url} alt="" className="img-thumbnail" />
      <CardBody>
        <div className="text-primary">UserName: {user.name}</div>
        <div className="text-primary">Location: {user.location}</div>
        <div className="text-info">Followers: {user.followers}</div>
        <div className="text-primary">Bio: {user.bio}.</div>
        <div className="text-info">
          Available for hire: {user.hirable ? "Yes" : "No"}
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
