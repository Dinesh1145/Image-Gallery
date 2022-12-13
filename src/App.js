import './App.css';
import ImageList from './Components/ImageList';
import Header from './Components/Header';
import { useDispatch } from 'react-redux';
import { setImageList } from './Redux/actions/action';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <ImageList />
    </div>
  );
}

export default App;
