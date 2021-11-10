import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEditableService } from '../actions/actionCreators';

export default function ServiceEdit() {
  const {service, loading, error} = useSelector((state) => state.serviceEdit);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    console.log('useEffect')
    fetchEditableService(dispatch, id);
  }, [dispatch, id]);

  console.log('service', service)
  console.log('loading', loading)
  console.log('error', error)

  if (loading) {
    return (
      <img
        style={{ width: '24px' }}
        src="https://img.icons8.com/material-rounded/24/000000/dots-loading--v3.gif"
        alt="loading"
      />
    );
  }

  if (error) {
    return <p>Something went wrong try again</p>;
  }
  
  console.log(service)

  return <div>service.name: {service.name}</div>;

  return <div>id: {id}</div>;

  // return (
  //   <form>
  //     <label>
  //       Название:
  //       <input type="text" defaultValue={service.name} />
  //     </label>
  //     <br />
  //     <label>
  //       Стоимость:
  //       <input type="text" defaultValue={service.price} />
  //     </label>
  //     <br />
  //     <label>
  //       Описание:
  //       <input type="text" defaultValue={service.content} />
  //     </label>
  //     <br />
  //     <button type="submit">Сохранить</button>
  //     <button type="reset">Отмена</button>
  //   </form>
  // );
}
