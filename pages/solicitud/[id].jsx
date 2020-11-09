import { useRouter } from 'next/router'
import Add_Request from "../../components/Request"
import {useDispatch, useSelector} from 'react-redux';
import { connect } from 'react-redux';
import { detailBook} from '../../store/actions/bookAction';
import { useEffect } from 'react';
import Skeleton from '../../components/customsPreloader/skeleton';

const Solicitud = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {loading, msgSuccess, msgError} = useSelector(state =>state.ui);
  const {book} = useSelector(state =>state.book);
  const {id} = router.query;

  useEffect(() => {
    dispatch(detailBook(id));
  },[]);
  return (
    <>
      {
        (loading) ? (
          <div className="h-screen flex items-center justify-center">
            <div className="lg:w-2/3">
              <Skeleton />
            </div>
          </div>
        ) : (
          <Add_Request infoBook={book}/>
        )
      }
    </>
  )
}
export default (Solicitud);