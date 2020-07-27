import React from 'react';
import { Link } from "react-router-dom";

const Protected = () => <p>
    If you see this page, it means you're are logged in :)<br />
    <br />
    <Link to='/'>/home</Link>
  </p>;

export default Protected;
