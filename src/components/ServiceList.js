import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServices, deleteService } from '../actions/actionCreators';

export default function ServiceList() {
  const { services, loading: servicesLoading, error: servicesError} = useSelector(
    (state) => state.serviceList
  );
  const { loading: deleteLoading, error: deleteError } = useSelector(
    (state) => state.serviceDelete
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('test ServiceList')
    fetchServices(dispatch);
  }, [dispatch]);

  const handleRemove = (id) => {
    deleteService(dispatch, id);
  };

  if (servicesLoading || deleteLoading) {
    return (
      <img
        style={{ width: '24px' }}
        src="https://img.icons8.com/material-rounded/24/000000/dots-loading--v3.gif"
        alt="loading"
      />
    );
  }

  if (servicesError || deleteError) {
    return <p>Something went wrong try again</p>;
  }

  return (
    <ul>
      {services.map((service) => (
        <li key={service.id}>
          {service.name} {service.price}
          <Link to={`/ra-thunk-api-redux/services/${service.id}`}>
            <button>{`\u270E`}</button>
          </Link>
          <button onClick={() => handleRemove(service.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
