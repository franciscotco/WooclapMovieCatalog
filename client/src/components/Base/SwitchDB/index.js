import React from 'react';
import { withRouter } from 'react-router-dom';

// Components
import Button from '../Button';

// Constants
import { ID_DB } from '../../../constants';

// Style
import './SwitchDB.css';

const SwitchDB = (props) => {
   const { history, match, match: {params: {[ID_DB]: id} }} = props;

   const handleOnClick = () => {
      const { params: { [ID_DB]: id_db }, url } = match;
      const array = url.split('/');
      if (array.length < 2) return;
      console.log("size", array.length)
      array[array.length - 1] = (id_db === 'local') ? 'tmdb' : 'local';
      console.table(array);
      console.log("match :", match);
      let path = "";
      array.forEach(element => {
         // if (path !== "")
         //    path += '/';
         if (element !== "")
            path += '/' + element;
      });
      console.log("url :", path);
      history.push(path);
      window.location.reload();
   }

   // if (match.url === '/') return null;

   return (
      <div className="container-switch-button">
         <Button onClick={handleOnClick} text={id.toUpperCase()} />
      </div>
   );
};

export default withRouter(SwitchDB);