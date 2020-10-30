import {useEffect, useState} from 'react'
import {useDispatch, useSelector}from 'react-redux';
import { getBook, deleteBook} from '../../store/actions/bookAction';
import Skeleton from '../customsPreloader/skeleton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import Edit_Book from './edit_book'

const All_Book = ({books, getBook}) => {
  const dispatch = useDispatch();
  const {loading, msgSuccess, msgError} = useSelector(state =>state.ui);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const removeData = (id) => {
    setOpen(false);
    dispatch(deleteBook(id));
  }
  useEffect(() => {
      getBook();
  },[]);
  return (
    <div className="lg:h-screen bg-gray-300 overflow-hidden">
      <div className="container mx-auto flex justify-center items-center h-full">
        <div className="lg:5/6 w-full">
          <h2 className="text-lg lg:text-3xl text-blue-500 font-bold text-center animated slideInRight">Lista de libros</h2>
          {
            (books.length > 0) ? (
              <div className="overflow-hidden w-full">
                <div className="bg-white shadow-lg rounded-lg animated slideInLeft">
                {
                  (loading) ? (<Skeleton/>) : (
                    <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Nombre de Libro
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Categoria
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Autor
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Editorial
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          {
                            books.map( (book, index) => (
                              <tbody 
                              key={index}
                              className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {book.title_book}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                { (book.category) ? book.category.name_category : 'Sin Categoria' }
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {book.autor}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {book.editorial}
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap">
                                <span className={book.status ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" :"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" }>
                                  {book.status ? 'Disponible' : 'Ocuapdo'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium flex justify-between ">
                                <Popup trigger={<button type="button" className="focus:outline-none text-indigo-600 hover:text-indigo-900">Editar </button>} modal>
                                {(close) => (
                                  <div className="modal animated slideInLeft">
                                    <button type="button" className="close" onClick={close}>
                                      &times;
                                    </button>
                                    <Edit_Book bookInfo={book}/>
                                  </div>
                                )}
                              </Popup>
                                <Button variant="outlined" color="primary"  className="text-red-500 hover:text-red-700 focus:outline-none border border-red-500" onClick={handleClickOpen}>
                                  Eliminar
                                </Button>
                                <Dialog
                                  fullScreen={fullScreen}
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="responsive-dialog-title"
                                >
                                  <DialogTitle id="responsive-dialog-title">{"¿Desea Eliminar este registro?"}</DialogTitle>
                                  <DialogActions>
                                    <Button autoFocus onClick={handleClose} color="primary" className="focus:outline-none">
                                      Cancelar
                                    </Button>
                                    <Button onClick={() => removeData(book._id)} color="primary" className="focus:outline-none" autoFocus>
                                      Confirmar
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </td>
                            </tr>
                          </tbody>
                            ))
                          }
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                  )
                }
            </div>
          </div>
        
            ) : (
              <h2 className="text-lg italic text-blue-500 text-center animated slideInLeft">No se ha encontrado ningún registro</h2>
            ) 
          }
        </div>
        {
          (msgError || msgSuccess) && (
            <div
              id="alertMsg"
              className="overflow-hidden">
              <div className={
                msgError ? 'flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 absolute right-0 animated bounceInUp z-20' : 'flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 absolute right-0 animated bounceInUp z-20'
              }
              style={{'top': '90%'}}
              role="alert">
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
              <p>{msgError || msgSuccess}</p>
            </div>
          </div>
                )
              }
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  books: state.book.books,
});

const mapDispatchToProps = (dispatch) => ({
  getBook: () => dispatch(getBook())
});
export default connect(mapStateToProps, mapDispatchToProps)(All_Book);