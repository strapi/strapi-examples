import React from 'react';
import { Link } from "react-router-dom";

const Unauthorized = () => <p>
    You are not authorized to see this page.<br />
    <br />
    <Link to='/'>/home</Link>
  </p>;

export default Unauthorized;
