import Head from 'next/head';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../store/actions';
import AllBook from '../../components/Book/AllBook';

const All_Book = ({auth}) => {

  return (
    <>
      <Head>
        <title>Libros - SCI</title>
      </Head>
      {
        auth.token ? (<AllBook/>  ) : (
          <div className="h-screen flex justify-center items-center">
            <p>Porfavor! authentificarse</p>
          </div>
        )
      }
    </>
  )
}

All_Book.getInitialProps = async(ctx) => {
  await initialize(ctx);
}

export default connect(state => state, actions)(All_Book);