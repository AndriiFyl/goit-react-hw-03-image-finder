import React from "react";
import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';



const Loader = () => (
<div className={css.loader}>   
<Circles
  height="80"
  width="80"
  color="#583eefcc"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
        />
</div> 
)

export default Loader;