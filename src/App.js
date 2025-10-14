import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import './index.css';

function App() {
  return (
    <div className='h-screen w-full'>
  <div className='flex items-center justify-center h-20'> <Header/></div>
  <div className='pb-20'><Main/></div>
<div className='fixed bottom-0 w-full h-20 '>  <Footer/></div>
    </div>
  );
}

export default App;
