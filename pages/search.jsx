import {useEffect} from 'react'
import {useSelector}from 'react-redux';
import { connect } from 'react-redux';
import Skeleton from '../components/customsPreloader/skeleton';
import { newsBooks } from '../store/actions/bookAction';
import SearchBook from '../components/Search/SearchBook';
import Link from 'next/link'
import Head from 'next/head';

const Search = ({books, newsBooks}) => {
  const {loading } = useSelector(state =>state.ui);
  useEffect(() => {
    newsBooks();
  },[]);
  return (
    <>
      <Head>
        <title>Búsqueda - SCI</title>
      </Head>
      <div className="px-5 bg_white_gray lg:h-screen h-full">
        <div className="mb-5 pt-12">
          <SearchBook/>
        </div>
        <h2 className="poppins font-bold text-2xl lg:text-3xl text-blue-500 text-center">Busqueda de libros:</h2>
        {
          books.length > 0 ? (
            <div className="flex flex-row">
              {
                (loading) ? (Array.apply(null, Array(4)).map((i, index) => (
                  <div className="w-1/4 mx-2" key={index}>
                    <div className="">
                      <Skeleton />
                    </div>
                  </div>
                ))) : (
                  <div className="flex flex-wrap animated fadeIn">
                    {
                      books.map((book, index) => (
                        <div  key={index} className="lg:w-1/5 w-full">
                          <div 
                          className="border border-gray-200 bg-gray-200 h-48 w-48 rounded-lg p-5 flex item-center mx-auto">
                            <div className="w-full">
                              <h2 className="text-lg font-bold poppins leading-none">{book.title_book}</h2>
                              <img src="/images/book.png" alt="icon-document" className="w-3/4 mx-auto"/>
                              <p className="poppins italic text-center">{book.autor}</p>
                            </div>
                          </div>
                          {
                            (book.status) ? (
                              <Link href="/solicitud/[id]" as={`/solicitud/${book._id}`}>
                                <a className="flex justify-center focus:outline-none poppins text-blue-500 text-xl font-bold items-center mx-auto mb-5">
                                Prestar
                                <svg className="animate-bounce w-8 h-6 ml-3 text-blue-500" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
                                </a>
                              </Link>
                            ): (
                              <button className="flex focus:outline-none poppins text-blue-500 text-xl font-bold items-center mx-auto justify-center">
                                Prestado
                              </button>
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </div>
          ) :
          (
            <h1>No hay Libros</h1>
          )
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  books: state.book.books,
});

const mapDispatchToProps = (dispatch) => ({
  newsBooks: () => dispatch(newsBooks())
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);