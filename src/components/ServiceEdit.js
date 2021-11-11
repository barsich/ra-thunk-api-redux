import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeServiceField, fetchEditableService, saveService } from '../actions/actionCreators';
import { objectsCompare } from '../utils';
import Error from './Error';
import Loading from './Loading';

export default function ServiceEdit() {
  // service from server
  const {
    service,
    loading: serviceLoading,
    error: serviceError,
  } = useSelector((state) => state.serviceEdit);
  // service from form
  const {
    service: editableService,
    loading: saveLoading,
    error: saveError,
  } = useSelector((state) => state.serviceSave);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function blabla() {
      await fetchEditableService(dispatch, id);
      console.log(service)
    }
    blabla()
    // for (const key in service) {
    //   if (Object.hasOwnProperty.call(service, key)) {
    //     const value = service[key];
    //     dispatch(changeServiceField(key, value));
    //   }
    // }
  }, []);

  if (serviceLoading) {
    return <Loading />;
  }

  if (serviceError) {
    return <Error />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeServiceField(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(service);
    // console.log(editableService);
    // console.log(objectsCompare(service, editableService));
    if (objectsCompare(service, editableService)) {
      console.log('test');
      return;
    }
    // saveService(dispatch, editableService);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            defaultValue={editableService.name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Стоимость:
          <input
            type="text"
            defaultValue={editableService.price}
            name="price"
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Описание:
          <input
            type="text"
            defaultValue={editableService.content}
            name="content"
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Сохранить</button>
        <button type="reset">Отмена</button>
      </form>
      {saveLoading && <Loading />}
      {saveError && <Error />}
    </>
  );
}
