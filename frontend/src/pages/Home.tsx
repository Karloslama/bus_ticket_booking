import React from "react";
import { useEffect, useState } from "react";
import { Button, Card, Modal, Row, Col, Tag, Divider, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import { Bus, Clock, MapPin, Calendar, DollarSign, Users } from "lucide-react";
// import { fetchBuses } from '../redux/busSlice';
// import type { AppDispatch, RootState } from '../redux/store';

interface BusDetails {
  id: string;
  number: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  fare: number;
  capacity: number;
  seatsBooked: string[];
}

const Home: React.FC = () => {
  return <div>Home</div>;
};

export default Home;
